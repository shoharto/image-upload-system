const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const imageRoutes = require('./routes/imageRoutes');
const logger = require('./utils/logger');
const pool = require('./config/db'); 


dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api/images', imageRoutes);

// Catch-all error handler
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
