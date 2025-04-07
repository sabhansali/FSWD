const express = require('express');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Mock data - a simple array of users
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Routes will go here

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
  });
  
  // GET a single user by ID
  app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  });
  
  // CREATE a new user
  app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    
    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Please provide name and email' });
    }
    
    // Create new user object
    const newUser = {
      id: users.length + 1,
      name,
      email
    };
    
    // Add to users array
    users.push(newUser);
    
    res.status(201).json(newUser);
  });
  
  // UPDATE a user
  app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    
    // Find user index
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user
    const updatedUser = {
      id: users[index].id,
      name: name || users[index].name,
      email: email || users[index].email
    };
    
    users[index] = updatedUser;
    
    res.json(updatedUser);
  });
  
  // DELETE a user
  app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // Filter out the user with the given id
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);
    
    if (users.length === initialLength) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  });


  // Validation middleware
const validateUserInput = (req, res, next) => {
    const { name, email } = req.body;
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (req.method === 'POST' && (!name || !email)) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    next();
  };
  
  // Apply the middleware to POST and PUT routes
  app.post('/api/users', validateUserInput, (req, res) => {
    // The existing POST route handler...
  });
  
  app.put('/api/users/:id', validateUserInput, (req, res) => {
    // The existing PUT route handler...
  });