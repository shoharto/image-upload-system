const pool = require('../config/db');

const insertImagePath = async (imagePath) => {
  const query = 'INSERT INTO images(image_path) VALUES($1) RETURNING id, image_path';
  const values = [imagePath];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the inserted row
  } catch (error) {
    throw new Error('Database error: ' + error.message);
  }
};

module.exports = { insertImagePath };
