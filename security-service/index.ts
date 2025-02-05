import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import authRoutes from './routes/auth';
import './config/passport';

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose.connect('mongodb://localhost:27017/auth')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/auth', authRoutes);

const PORT: string | 3000 = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
