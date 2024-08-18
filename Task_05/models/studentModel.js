const mongoose = require('mongoose')
const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "plese add the student name"],
    },
    email:{
        type:String,
        required: [true, "plese add the student email"],
    },
    age: {
        type: Number,
        required: [true, "plese add the Student Age"],
    },
    phone:{
        type:Number,
        required: [true, 'plese add the student phone number'],
    },
    password:{
        type: String,
        required: [true],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('test_student', studentSchema);