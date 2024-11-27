const express = require('express');
const { upload, uploadImage } = require('../controllers/imageController');

const router = express.Router();

// POST route for uploading images
router.post('/upload', upload, uploadImage);

module.exports = router;
