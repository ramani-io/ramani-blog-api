import express from 'express';
import router from './routes/blogPostRoute.js';
import { errorHandler } from './middlwares/errorHandler.js';
const app = express();
const port = process.env.PORT || 4040;
import { connect } from 'mongoose';

// Import the MongoDB connection
import {client as dbClient,connectDB } from "./db.js"
import { PostArticle } from "./controllers/Articles.js"
app.use(express.json())
app.use("/api/blogs", router)
app.use(errorHandler)

connectDB();


app.get('/', async (req, res) => {
  // Access a MongoDB collection and perform operations
  const collection = dbClient.db('blog').collection('posts');
  const result = await collection.find({}).toArray();

  res.json(result);
});

app.post('/article', PostArticle);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
