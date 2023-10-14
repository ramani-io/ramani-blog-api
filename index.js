require('dotenv/config');
const express = require('express');

const app = express();
const port = process.env.PORT || 4040;

// Import the MongoDB connection
const dbClient = require('./db');
const { PostArticle } = require('./controllers/Articles');

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
