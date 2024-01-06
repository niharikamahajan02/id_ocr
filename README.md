# OCR_Recognition-Thai-
A full-stack MERN project for Thai ID card OCR identification using the Google Cloud Vision API.


How the App looks
![image](https://github.com/nehai0202/qoala_assignment/assets/139651627/4b2c75c1-fe53-48df-8de3-4faa2ca512c9)

If not correct format file is added
![image](https://github.com/nehai0202/qoala_assignment/assets/139651627/98321c0c-3a9b-486f-8ae7-ceb19adc71a0)

OCR result on adding id card
![image](https://github.com/nehai0202/qoala_assignment/assets/139651627/da3777d6-2212-4860-9c7a-ef7a87641dbc)

![image](https://github.com/nehai0202/qoala_assignment/assets/139651627/3555409a-2e3b-4dff-9eda-6a62ee638c96)

Getting result by identification number
![image](https://github.com/nehai0202/qoala_assignment/assets/139651627/c17e81bc-fcf6-4f29-8f72-151d4dc6a237)

Getting all records
![image](https://github.com/nehai0202/qoala_assignment/assets/139651627/e9850b3b-650b-48c2-a9c5-51c8eee2427a)

Deleting user whose id is given
![image](https://github.com/nehai0202/qoala_assignment/assets/139651627/7a168f0a-7aa0-4a1a-ac2b-c808beb1d869)
![image](https://github.com/nehai0202/qoala_assignment/assets/139651627/5a1dedc9-346f-4f55-ad9a-9b6dfe9a5650)

After no record is present(All id deleted)
![image](https://github.com/nehai0202/qoala_assignment/assets/139651627/92f7160b-1688-4806-a333-bb736d9c990c)

### Installation
1. **Initialization:**

   ```bash
   git init
2. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/qoala_assignment.git
## Backend Setup
    cd Back
    npm i
    npm run dev
## Frontend Setup
    cd ..
    cd Frontend
    npm i
    npm start

### Prerequisites

Ensure you have the following installed:

- Node.js and npm
- MongoDB
- Google Cloud Vision API Key
- Express
- Multer
- Middlwares
- Axios

## Usage
1)So this is a full stack MERN project for thai id card ocr identification . Here you can upload your id card then it will show the details corresponding to it.
2)You can also enter your identification number and get the records. Along with this you can delete that id record also.
3)You can also get details of all records present in database.
4) You can update the information like name , last name, date of birth, date of issue , date of expiry (All CRUD backend API are working correctly)

## ALL BACKEND CRUD API ARE WORKING SUCCESSFULLY AND HAVE BEEN TESTED USING POSTMAN.

## API Endpoints
- POST /api/upload/  ---> Create and upload a new ID card entry.
- PUT /api/:id       --->Update an existing ID card entry.
- DELETE /api/:id    ---->Delete an ID card entry.
- GET /api/         -----> Retrieve all ID card entries.
- GET /api/:id      ------>Retrieve one ID card entry using it id.

## Run the Project

To deploy and run the application:

1. Create a `.env` file in the root directory with two environmental variables:
    - `PORT`: Relevant port number
    - `MONGO_URL`: MongoDB database URL

2. Create an account on Google Cloud Platform.

3. Enable the Google Vision API.

4. Create a service account and get the JSON credential.

5. Rename the credential file as 'credential.json'.

6. In the terminal, run `npm install` to install the required packages.

7. To start the project, run `npm start`.


