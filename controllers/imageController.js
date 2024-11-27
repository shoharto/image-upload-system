const multer = require('multer');
const path = require('path');
const Joi = require('joi');
const fs = require('fs');
const { insertImagePath , getAllImages} = require('../models/imageModel');
const logger = require('../utils/logger');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1732689172582.png
  },
});

// Set file size limit to 5MB and specify valid file types
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).single('image'); // 'image' corresponds to the key in the form-data

const validateUpload = (file) => {
  const schema = Joi.object({
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(), // Only validate mimetype
  });

  // Pass only the properties needed to validate (mimetype)
  return schema.validate({ mimetype: file.mimetype });  // Just validate mimetype field
};


// Controller for handling the upload logic
const uploadImage = async (req, res) => {
  if (!req.file) {
    logger.error('No file uploaded.');
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Validate file type using Joi
  const { error } = validateUpload(req.file);
  if (error) {
    logger.error('File validation error: ' + error.details[0].message);
    return res.status(400).json({ error: 'Invalid file type or missing file.' });
  }

  // Insert the file path into the database
  try {
    const result = await insertImagePath(req.file.path);
    logger.info(`Image uploaded successfully: ${req.file.path}`);

    res.status(200).json({
      message: 'Image uploaded successfully!',
      image: result, // Return the image data saved in the DB
    });
  } catch (error) {
    logger.error('Database error: ' + error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for getting all image paths

const getAllImagesController = async (req, res) => {
  try {
    const images = await getAllImages();
    if (images.length === 0) {
      return res.status(404).json({ message: 'No images found' });
    }
    res.status(200).json({
      message: 'Images retrieved successfully',
      images,
    });
  } catch (error) {
    logger.error('Error fetching images: ' + error.message);
    res.status(500).json({ error: 'Failed to fetch images from the database' });
  }
};


module.exports = { upload, uploadImage , getAllImagesController };
