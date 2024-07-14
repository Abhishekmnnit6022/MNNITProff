const mongoose = require('mongoose');

const connectNotifications = mongoose.createConnection("mongodb+srv://auxin:auxin@cluster0.xrg7sez.mongodb.net/CollegeNotifications");
const connectStudentDetails = mongoose.createConnection("mongodb+srv://auxin:auxin@cluster0.xrg7sez.mongodb.net/StudentDetails");
const connectClassSchedules = mongoose.createConnection("mongodb+srv://auxin:auxin@cluster0.xrg7sez.mongodb.net/ClassSchedules");
const connectAttendanceDetails = mongoose.createConnection("mongodb+srv://auxin:auxin@cluster0.xrg7sez.mongodb.net/AttendanceDetails");
const connectProffdetails = mongoose.createConnection("mongodb+srv://auxin:auxin@cluster0.xrg7sez.mongodb.net/Professordetails");
const waitForConnection = (connection) => {
  return new Promise((resolve, reject) => {
    connection.on('connected', () => resolve(connection));
    connection.on('error', (err) => reject(err));
  });
};

module.exports = { 
  connectNotifications: waitForConnection(connectNotifications),
  connectStudentDetails: waitForConnection(connectStudentDetails),
  connectClassSchedules: waitForConnection(connectClassSchedules),
  connectAttendanceDetails: waitForConnection(connectAttendanceDetails),
  connectProffdetails: waitForConnection(connectProffdetails)
};




