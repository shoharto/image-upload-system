const express = require('express');
const { upload, uploadImage, getAllImagesController } = require('../controllers/imageController');

const router = express.Router();

// POST route for uploading images
router.post('/upload', upload, uploadImage);

// GET route for fetching all images
router.get('/', getAllImagesController);

module.exports = router;
