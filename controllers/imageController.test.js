const { uploadImage, getAllImagesController } = require('../controllers/imageController'); 
const { insertImagePath, getAllImages } = require('../models/imageModel');
const logger = require('../utils/logger');

jest.mock('../models/imageModel');
jest.mock('../utils/logger');

describe('uploadImage', () => {
  let req, res;

  beforeEach(() => {
    req = {
      file: {
        path: 'uploads/test-image.png',
        mimetype: 'image/png',
        originalname: 'test-image.png',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should upload image and save path to database successfully', async () => {
    insertImagePath.mockResolvedValue({ id: 1, path: req.file.path });

    await uploadImage(req, res);

    expect(insertImagePath).toHaveBeenCalledWith(req.file.path);
    expect(logger.info).toHaveBeenCalledWith(`Image uploaded successfully: ${req.file.path}`);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Image uploaded successfully!',
      image: { id: 1, path: req.file.path },
    });
  });

  it('should return 400 if no file is uploaded', async () => {
    req.file = null;

    await uploadImage(req, res);

    expect(logger.error).toHaveBeenCalledWith('No file uploaded.');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'No file uploaded.' });
  });

  it('should return 400 if file validation fails', async () => {
    req.file.mimetype = 'application/pdf'; // Invalid mimetype

    await uploadImage(req, res);

    expect(logger.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid file type or missing file.' });
  });

  it('should return 500 if database insertion fails', async () => {
    insertImagePath.mockRejectedValue(new Error('Database error'));

    await uploadImage(req, res);

    expect(logger.error).toHaveBeenCalledWith('Database error: Database error');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});

describe('getAllImagesController', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all images successfully', async () => {
    const images = [{ id: 1, path: 'uploads/test-image1.png' }, { id: 2, path: 'uploads/test-image2.png' }];
    getAllImages.mockResolvedValue(images);

    await getAllImagesController(req, res);

    expect(getAllImages).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Images retrieved successfully',
      images,
    });
  });

  it('should return 404 if no images are found', async () => {
    getAllImages.mockResolvedValue([]);

    await getAllImagesController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'No images found' });
  });

  it('should return 500 if fetching images fails', async () => {
    getAllImages.mockRejectedValue(new Error('Fetch error'));

    await getAllImagesController(req, res);

    expect(logger.error).toHaveBeenCalledWith('Error fetching images: Fetch error');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch images from the database' });
  });
});
