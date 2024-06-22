const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    studentRegNoL:{
        type: String,
        unique: true,
        required: true
    },
    studentName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;