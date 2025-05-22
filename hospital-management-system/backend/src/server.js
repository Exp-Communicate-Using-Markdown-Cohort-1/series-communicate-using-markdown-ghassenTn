const express = require('express');
const dotenv = require('dotenv');
// const mongoose = require('mongoose'); // Will uncomment when DB connection is set up

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hospital Management System Backend API');
});

/*
// Connect to MongoDB (Example - will be configured later)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
*/

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
