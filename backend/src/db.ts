import { Model, model, Mongoose, Schema } from 'mongoose';
import mongoose from 'mongoose';

const mongo_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://hd123:3ydP0T9DQLpZcfMf@cluster0.gle8e.mongodb.net/'
    );

    console.log('MongoDB connected Successfully');
  } catch (error) {
    console.log('Error while connecting to Database');
    process.exit(1);
  }
};

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  userId: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }],
});

const LinkSchema = new Schema({
  hash: String,
  userId: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
  ],
});

export const UserModel = mongoose.model('users', UserSchema);
export const LinkModel = mongoose.model('link', LinkSchema);
export const ContentModel = mongoose.model('content', ContentSchema);
