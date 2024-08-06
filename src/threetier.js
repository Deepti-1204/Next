const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB configuration
const uri = 'mongodb://localhost:27017'; // Connection string for MongoDB
const dbName = 'ipLab'; // Database name

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

let db; // Global variable to store MongoDB connection

// Function to connect to MongoDB
async function connect() {
  try {
    const client = new MongoClient(uri);
    await client.connect(); // Connect to MongoDB
    console.log('Connected to MongoDB');
    db = client.db(dbName); // Assign the connected database
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connect(); // Call the function to connect to MongoDB

// Endpoint to add a favorite recipe
app.post('/addFav', async (req, res) => {
  const { favs } = req.body; // Ensure the expected data structure

  try {
    const usersCollection = db.collection('Recipe'); // Get the collection
    const existingFav = await usersCollection.findOne({ 'favs.label': favs.label }); // Check if it's already in favorites

    if (existingFav) {
      res.status(201).json({ message: 'Already added' });
    } else {
      await usersCollection.insertOne({ favs }); // Insert into MongoDB
      res.status(201).json({ message: 'Added successfully' });
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});