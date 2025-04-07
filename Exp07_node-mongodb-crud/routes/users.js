const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

function createUserRoutes(db) {
  // CREATE - POST a new user
  router.post('/', async (req, res) => {
    try {
      const { name, email, age } = req.body;
      const collection = db.collection('users');
      const result = await collection.insertOne({ name, email, age });
      res.status(201).json({
        success: true,
        data: { _id: result.insertedId, name, email, age }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // READ ALL - GET all users
  router.get('/', async (req, res) => {
    try {
      const collection = db.collection('users');
      const users = await collection.find({}).toArray();
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // READ ONE - GET a single user by ID
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const collection = db.collection('users');
      const user = await collection.findOne({ _id: new ObjectId(id) });
      
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // UPDATE - PUT to update a user
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const collection = db.collection('users');
      
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      
      if (result.matchedCount === 0) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      
      const updatedUser = await collection.findOne({ _id: new ObjectId(id) });
      res.json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // DELETE - DELETE a user
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const collection = db.collection('users');
      
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  return router;
}

module.exports = createUserRoutes;