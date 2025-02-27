import express from 'express';
import { connectDB, ContentModel, LinkModel, UserModel } from './db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwt_secret } from './config';
import { userMiddleware } from './middleware';
import { randon } from './utils';
import cors from 'cors';

const app = express();

app.use(express.json());
connectDB();
app.use(cors());

app.post('/api/v1/signup', async (req, res) => {
  //ZOD Validation [PENDING]
  const username = req.body.username;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await UserModel.create({
      username: username,
      password: hashedPassword,
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

  console.log('in endpoint');

  await ContentModel.create({
    link,
    title,
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

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
