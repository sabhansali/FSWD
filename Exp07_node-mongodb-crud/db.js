const { MongoClient } = require('mongodb');

// Connection URI (store this in an environment variable in production)
const uri = "mongodb+srv://Sakshi:student123@cluster0.c90wfic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new MongoClient
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    
    // Perform operations with the client
    const db = client.db("your_database_name");
    // Now you can use db.collection() etc.
    
  } catch (error) {
    console.error("Connection error:", error);
  }
}

connectToDatabase();