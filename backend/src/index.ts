import express from "express";
import { connectDB, ContentModel, LinkModel, UserModel } from "./db";
import session from "express-session";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwt_secret } from "./config";
import { userMiddleware } from "./middleware";
import { randon } from "./utils";
import cors from "cors";
import {
  getAIResponse,
  processAndStoreContent,
  searchPinecone,
} from "./embeddings/storeEmbeddings";
import passport from "passport";
import "./passport-auth/passport-config";

const app = express();

app.use(express.json());
connectDB();
// app.use(cors());
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  })
);

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set to true with HTTPS
      sameSite: "lax", // or "none" with HTTPS and secure:true
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/api/v1/signup", async (req, res) => {
  //ZOD Validation [PENDING]
  const username = req.body.username;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await UserModel.create({
      username: username,
      password: hashedPassword,
    });

    res.json({ message: "You are Signed Up" });
  } catch (err) {
    res.status(411).json({ message: "User already Exists" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const ExistingUser = await UserModel.findOne({ username: username });

    if (ExistingUser?.password) {
      const correctPassowrd = await bcrypt.compare(
        password,
        ExistingUser.password
      );

      if (correctPassowrd) {
        const token = jwt.sign({ id: ExistingUser._id }, jwt_secret as string);
        res.json({ token });
      } else {
        res.status(403).json({ message: "Incorrect Credentials" });
      }
    } else {
      res.status(403).json({ message: "User does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error finding the User" });
  }
});

app.get("/status", (req, res) => {  
  console.log(req.user);
  
  if (req.user) {
    //@ts-ignore
    res.send({ name: req.user.name, email: req.user.email, image: req.user.image, id: req.user._id });
  } else {
    res.status(401).send({ user: null });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const title = req.body.title;
  const type = req.body.type;

  console.log("adding content in DB");

  await ContentModel.create({
    link,
    title,
    type,
    //@ts-ignore
    userId: req.user._id,
    tags: [],
  });

  res.json({ message: "Content has been added" });
});

app.get("/api/v1/content", async (req, res) => {
  //@ts-ignore
  const userId = req.user._id;
  const content = await ContentModel.find({ userId: userId }).populate(
    "userId",
  );

  console.log(content);

  const filteredContent = content.map((c) => ({
    id: c._id.toString(),
    title: c.title,
    link: c.link,
    type: c.type,
    //@ts-ignore
    userId: c.userId?._id?.toString(),
  }));

  res.json({ content: filteredContent });
});

app.delete("/api/v1/content", async (req, res) => {
  const contentId = req.body.contentId;

  //@ts-ignore
  await ContentModel.deleteMany({ contentId, userId: req.user._id });
  res.json({ message: "Content deleted successfully" });
});

//Share Brain On/Off Functionality
app.post("/api/v1/brain/share", async (req, res) => {
  const share = req.body.share;
  const user = req.user;

  if (share) {
    const existingLink = await LinkModel.findOne({
      //@ts-ignore
      userId: user._id,
    });

    if (!existingLink) {
      const hash = randon(10);
      const link = await LinkModel.create({
        //@ts-ignore
        userId: req.user._id,
        hash: hash,
      });

      res.json({ hash: hash });
    } else {
      res.json({ hash: existingLink.hash });
    }
  } else {
    //@ts-ignore
    await LinkModel.deleteOne({ userId: req.user._id });

    res.json({ message: "Removed link" });
  }
});

//View Other User's brain from hash
app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({ message: "Sorry Incorrect input" });
    return;
  }

  const content = await ContentModel.findOne({ userId: link.userId });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.json({ message: "User not found" });
  }

  res.json({
    username: user?.name,
    email: user?.email,
    content: content,
  });
});

app.get("/api/v1/loadembedding", async (req, res) => {
  try {
    // Store embeddings for all content in Pinecone
    await processAndStoreContent();

    res.json({
      message: "Embeddings stored successfully in Pinecone",
    });
  } catch (error) {
    console.error("Error storing embeddings:", error);
    res.status(500).json({
      message: "Error storing embeddings in Pinecone",
    });
  }
});

// API Endpoint
app.post("/api/v1/loadembedding", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) res.status(400).json({ message: "Query is required" });

    // Search Pinecone for relevant content
    const searchResults = await searchPinecone(query);

    // @ts-ignore
    if (searchResults.length === 0) {
      res.json({ message: "No relevant data found." });
    }

    // Combine context from top search results
    // @ts-ignore
    const context = searchResults
      .map((item) => `${item?.title} (${item?.link})`)
      .join("\n");

    // Get AI-generated response
    try {
      const aiResponse = await getAIResponse(context, query);
      res.json({ response: aiResponse, sources: searchResults });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Error fetching response from AI model",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while getting response from AI model" });
  }
});

app.get("/", (req, res) => {
  res.send('<a href="/google">Authenticate with Google</a>');
});

//Google Login
app.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
    // successRedirect: "/api/auth/protected",
    // failureRedirect: "/auth/google/failure",
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    failureMessage: true,
  }),
  (req, res) => {
    res.send("You are successfully authenticated with Google!");
  }
);

//SignOut
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.send("Goodbye!");
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
