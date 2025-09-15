const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const noteRoutes = require('./routes/Notes');

const app = express();
const PORT = process.env.PORT || 5001;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json()); 

app.use('/api/v1/notes', noteRoutes);

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

const startServer = async () => {
  await connectDB(); 
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

startServer(); 