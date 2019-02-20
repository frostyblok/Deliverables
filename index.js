import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import houseRouter from './src/routes/house';
import userRouter from './src/routes/user';

dotenv.config;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/house', houseRouter);
app.use('/api/v1/users', userRouter);



const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));