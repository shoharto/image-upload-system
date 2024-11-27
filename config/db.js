const { Pool } = require('pg');
require('dotenv').config();
const logger = require('../utils/logger');

// Set up PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the database connection
pool.connect()
  .then(() => {
    logger.info('Database connected successfully');
  })
  .catch((err) => {
    logger.error('Database connection error: ' + err.message);
  });

module.exports = pool;
