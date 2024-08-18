const asyncHandler = require("express-async-handler");
const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const connectDb = require('./config/dbconnection');
const errorHandler = require('./middleware/errorHandler');
connectDb();
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('homepage');
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use('/api/students', require('./routes/studentRoutes.js'));

app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})