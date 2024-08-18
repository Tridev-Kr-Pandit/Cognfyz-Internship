const asyncHandler = require('express-async-handler')
const connect = require('../models/studentModel');
const bcrypt = require('bcrypt')

const allStudentsData = asyncHandler(async (req, res) => {
    const data = await connect.find();
    // console.log(data);
    res.status(200).render('studentAllData', { data });
})

const showStudentData = asyncHandler(async (req, res) => {
    const data = await connect.findById(req.params.id);
    res.status(200).render('show', { data });
})

const registrationPage = (req,res)=>{
    res.render('addStudent');
}

const addNewStudent = asyncHandler(async(req,res)=>{
    const { name, email, age, phone, password, c_password } = req.body;
    // console.log();
    if (!name || !email || !age || !phone || !password || !c_password) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const salt = await bcrypt.genSalt(10);
    const newhashPassword = await bcrypt.hash(password,salt);
    // console.log(newhashPassword);
    const student = await connect.create({
        name,
        email,
        age,
        phone,
        password: newhashPassword
        // c_password
      })
      res.status(201).render('success');
})

const deleteStudent = asyncHandler(async(req,res)=>{
    const data = await connect.findById(req.params.id);
    if(!data){
        res.status(404);
        throw new Error("Data not found")
      }
      await connect.deleteOne(data);
      res.render('homepage');
})


const updatePage = asyncHandler(async(req,res)=>{
    const data = await connect.findById(req.params.id);
    if(!data){
      res.status(404);
      throw new Error("data not found");
    }
    res.render('update', {data});
})

const updateStudent = asyncHandler(async(req,res)=>{
    const data = await connect.findById(req.params.id);
      if(!data){
          res.status(404);
          throw new Error("Contact not found");
      }
      const updatedContact = await connect.findByIdAndUpdate(
          req.params.id,
          req.body,
          {new: true}
      );
      res.status(200).render('homepage');
})





module.exports = {allStudentsData,showStudentData,registrationPage, addNewStudent , deleteStudent, updatePage, updateStudent};