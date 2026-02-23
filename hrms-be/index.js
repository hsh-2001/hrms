import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './src/router/index.js';
import cors from 'cors';


dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'https://hrms-lyart-theta.vercel.app'],
    credentials: true,
}));
app.get('/', (req, res) => {  
    res.send('Hello HRMS!');
});
    
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});