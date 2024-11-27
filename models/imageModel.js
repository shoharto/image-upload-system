const pool = require('../config/db');

// Function to insert image path into the database
const insertImagePath = async (imagePath) => {
  const query = 'INSERT INTO images(image_path) VALUES($1) RETURNING id, image_path';
  const values = [imagePath];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Database error: ' + error.message);
  }
};

// Function to get all image paths from the database
const getAllImages = async () => {
  const query = 'SELECT * FROM images';
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error('Database error: ' + error.message);
  }
};

module.exports = { insertImagePath, getAllImages };
