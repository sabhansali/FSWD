const express = require('express');
const { connectToDatabase, client } = require('./db');
const createUserRoutes = require('./routes/users');

const app = express();
const port = 3000;

app.use(express.json());

// Connect to the database when the app starts
let db;
connectToDatabase()
  .then(database => {
    db = database;
    console.log("Database connection established");
    
    // Setup routes with database connection
    app.use('/api/users', createUserRoutes(db));
    
    // Start the server only after connecting to the database
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to the database:", err);
  });

// Close database connection when app stops
process.on('SIGINT', async () => {
  await client.close();
  console.log('Database connection closed');
  process.exit(0);
});