const { MongoClient } = require('mongodb');

const uri = process.env.DB_URL;
console.log("uri", uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}

connectDB();

module.exports = client;
