# Image Upload Portfolio

This is a full-stack web application built with React (frontend) and Node.js (backend) that allows users to upload images, which are then stored on the server and their paths are saved in a PostgreSQL database.

## Features:
- Image upload using Multer
- Data validation using Joi
- Logging with Winston
- PostgreSQL database integration for storing image paths

## Technologies Used:
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **File Upload**: Multer
- **Validation**: Joi
- **Logging**: Winston

## Installation and Running Locally:

### Frontend
1. Navigate to the `client/` folder:
    ```bash
    cd client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

### Backend
1. Navigate to the `server/` folder:
    ```bash
    cd server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables in `.env`.

4. Start the Node.js server:
    ```bash
    node app.js
    ```

## Testing the API (Using Postman):

1. Open Postman and set the request method to `POST`.
2. URL: `http://localhost:5000/api/images/upload`.
3. In the body, choose `form-data`, and upload a file under the key `image`.
4. Click `Send` to upload the image.
