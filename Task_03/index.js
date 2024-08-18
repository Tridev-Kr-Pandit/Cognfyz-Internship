const express = require('express');
const bodyParser = require('body-parser');
const {check, validationResult} = require("express-validator");
const serverSideValidate = require('./middleware/serverSideValidation');
const loginServerSideValidation = require('./middleware/loginvalidation');
const createError = require('http-errors');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.json());



app.get('/', (req, res)=>{
    res.render('home');
})
app.get('/sign_up', (req, res)=>{
    res.render('formPage');
})
app.get('/login', (req, res)=>{
    res.render('login');
})

app.post('/register', serverSideValidate,(req, res)=>{
    const {name, email,age, password} = req.body;
    console.log(`${name}, ${email}, ${age}, ${password}`);
    res.render('success', {name});
})
app.post('/login',loginServerSideValidation,(req, res)=>{
    const {email,password} = req.body;
    console.log(` ${email},${password}`);
    res.send('Login Successfull');
})


app.listen(port, ()=>{
    console.log(`Application is running on port ${port}`);
})