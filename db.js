import { MongoClient } from 'mongodb';


const uri = process.env.DB_URL;
console.log("uri", uri)
export const client = new MongoClient(uri,
{ useNewUrlParser: true, useUnifiedTopology: true }
);


export async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}


