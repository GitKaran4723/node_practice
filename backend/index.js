const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const newsRoutes = require('./routes/newsRoutes');
const examRoutes = require('./routes/examRoutes');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/news', newsRoutes);
app.use('/api/exams', examRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
