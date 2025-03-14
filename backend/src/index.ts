import express from 'express';
import { connectDB, ContentModel, LinkModel, UserModel } from './db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwt_secret } from './config';
import { userMiddleware } from './middleware';
import { randon } from './utils';
import cors from 'cors';
import {
  getAIResponse,
  processAndStoreContent,
  searchPinecone,
} from './embeddings/storeEmbeddings';

const app = express();

app.use(express.json());
connectDB();
app.use(cors());

app.post('/api/v1/signup', async (req, res) => {
  //ZOD Validation [PENDING]
  const username = req.body.username;
  const password = req.body.password;

  // const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await UserModel.create({
      username: username,
      password: password,
    });

    res.json({ message: 'You are Signed Up' });
  } catch (err) {
    res.status(411).json({ message: 'User already Exists' });
  }
});

app.post('/api/v1/signin', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const ExistingUser = await UserModel.findOne({ username: username });

    if (ExistingUser) {
      const correctPassowrd = await bcrypt.compare(
        password,
        ExistingUser.password
      );

      if (correctPassowrd) {
        const token = jwt.sign({ id: ExistingUser._id }, jwt_secret as string);
        res.json({ token });
      } else {
        res.status(403).json({ message: 'Incorrect Credentials' });
      }
    } else {
      res.status(403).json({ message: 'User does not exist' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error finding the User' });
  }
});

app.post('/api/v1/content', userMiddleware, async (req, res) => {
  const link = req.body.link;
  const title = req.body.title;
  const type = req.body.type;

  console.log('in endpoint');

  await ContentModel.create({
    link,
    title,
    type,
    //@ts-ignore
    userId: req.userId,
    tags: [],
  });

  res.json({ message: 'Content has been added' });
});

app.get('/api/v1/content', async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({ userId: userId }).populate(
    'userId',
    'username'
  );

  res.json({ content });
});

app.delete('/api/v1/content', async (req, res) => {
  const contentId = req.body.contentId;

  //@ts-ignore
  await ContentModel.deleteMany({ contentId, userId: req.userId });
  res.json({ message: 'Content deleted successfully' });
});

app.post('/api/v1/brain/share', async (req, res) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await LinkModel.findOne({
      //@ts-ignore
      userId: req.userId,
    });

    if (!existingLink) {
      const hash = randon(10);
      const link = await LinkModel.create({
        //@ts-ignore
        userId: req.userId,
        hash: hash,
      });

      res.json({ hash: hash });
    } else {
      res.json({ hash: existingLink.hash });
    }
  } else {
    //@ts-ignore
    await LinkModel.deleteOne({ userId: req.userId });

    res.json({ message: 'Removed link' });
  }
});

app.get('/api/v1/brain/:shareLink', async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({ message: 'Sorry Incorrect input' });
    return;
  }

  const content = await ContentModel.findOne({ userId: link.userId });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.json({ message: 'User not found, erro should not ideally happen' });
  }

  res.json({
    username: user?.username,
    content: content,
  });
});

// API Endpoint
app.all('/api/v1/loadembedding', async (req, res) => {
  try {
    if (req.method === 'GET') {
      // Store embeddings for all content in Pinecone
      await processAndStoreContent();
      return res.json({
        message: 'Embeddings stored successfully in Pinecone',
      });
    } else if (req.method === 'POST') {
      const { query } = req.body;
      if (!query) return res.status(400).json({ message: 'Query is required' });

      // Search Pinecone for relevant content
      const searchResults = await searchPinecone(query);
      if (searchResults.length === 0)
        return res.json({ message: 'No relevant data found.' });

      // Combine context from top search results
      const context = searchResults
        .map((item) => `${item.title} (${item.link})`)
        .join('\n');

      // Get AI-generated response
      const aiResponse = await getAIResponse(context, query);

      return res.json({ response: aiResponse, sources: searchResults });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
