import mongoose from "mongoose";

//Defining Schema
const userSchems = new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true},
    password:{type:String, required:true, trim:true},
    tc:{type:Boolean, required:true},
})

//Model
const UserModel = mongoose.model('06_Task', userSchems);
export default UserModel;