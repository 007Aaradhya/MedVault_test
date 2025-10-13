require('dotenv').config();  // <-- Add this line at the top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const medsRoutes = require('./routes/meds');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/meds', medsRoutes);
app.use("/api/users", require("./routes/users"));
app.use("/api/alerts", require("./routes/alerts"));

const PORT = process.env.PORT || 5500;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
