const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.json());



app.get('/', (req, res)=>{
    res.render('formPage');
})


app.post('/register', (req, res)=>{
    const {name, email, password} = req.body;
    console.log(`${name}, ${email}, ${password}`);
    res.render('success', {name});
})
app.listen(port, ()=>{
    console.log(`Application is running on port ${port}`);
})