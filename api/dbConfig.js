const mongoose = require('mongoose');
const connectStudentDetails = mongoose.createConnection("mongodb+srv://auxin:auxin@cluster0.xrg7sez.mongodb.net/StudentDetails");
const waitForConnection = (connection) => {
    return new Promise((resolve, reject) => {
      connection.on('connected', () => resolve(connection));
      connection.on('error', (err) => reject(err));
    });
  };
  module.exports = { 
    connectStudentDetails: waitForConnection(connectStudentDetails),
  };