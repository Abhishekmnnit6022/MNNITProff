// const { connectStudentDetails } = require('../dbConfig');
// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//     regNo:{
//         type: Number,
//         unique: true,
//         required: true
//     },
//     Group:{
//         type: String,
//         required: true
//     },
//     Semester:{
//         type: Number,
//         required: true
//     },
//     }
// );

// const Student = connectStudentDetails.model('Student', studentSchema);

// module.exports = Student;

const mongoose = require('mongoose');
const { connectStudentDetails } = require('../dbConfig');

const studentSchema = new mongoose.Schema({

  regNo: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  group: { type: String, required: true },
  semester: { type: Number, required: true }
});

let Student;

connectStudentDetails.then(connection => {
  Student = connection.model('Student', studentSchema);
});

module.exports = {
  getModel: () => Student
};