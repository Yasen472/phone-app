import express from 'express';
import mongoose from 'mongoose';
import contactsRoute from './routes/contactsRoute.js';
import cors from 'cors';
import dotenv from 'dotenv'; // Use import for dotenv

dotenv.config(); // Call config method here

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/contacts', contactsRoute);

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
