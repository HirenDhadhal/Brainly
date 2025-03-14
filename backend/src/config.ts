export const jwt_secret = 'my_secret_toeken';

require('dotenv').config();
exports = {
  APP_ID: process.env.APP_ID,
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
  jwt_secret: process.env.JWT_SECRET,
};
