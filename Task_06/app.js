import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js';
import userRoutes from './routes/userRoutes.js'


const app = express()
const port = process.env.PORT 
const DATABASE_URL = process.env.DATABASE_URL;
// cors policy
app.use(cors())

//Database Connection
connectDB(DATABASE_URL);
// JSON
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Welcome to Authuntication Process");
})
// Load Routes
app.use('/api/user', userRoutes);

app.listen(port, ()=>{
    console.log('Application is running on port ', port)
})