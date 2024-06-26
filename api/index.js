const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://auxin:auxin@cluster0.xrg7sez.mongodb.net/CollegeNotifications").then(
    () => {
        console.log("Database connected");
    }
).catch(err => {
    console.log(err);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//importing the models
const Attendance = require('./models/attendance'); // Import the Attendance model

const classSchedule = require('./models/classSchedule');
const getNotificationModel = require('./models/notification');



app.get('/classSchedule', async (req, res) => {
    try {
        const classScheduleData = await classSchedule.find();
        res.status(200).json(classScheduleData);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch class schedule"});
    }
});




// New endpoint for submitting attendance
app.post('/submitAttendance', async (req, res) => {
    try {
      const attendanceData = req.body;
      const result = await Attendance.insertMany(attendanceData);
      res.status(200).json({ message: "Attendance submitted successfully", data: result });
    } catch (err) {
      res.status(500).json({ message: "Failed to submit attendance", error: err.message });
    }
  });


//end point for pushing notification

app.post('/pushNotification', async (req, res) => {
    try {
        const { title, message, date, time, department, semester } = req.body;
        
        const NotificationModel = getNotificationModel(department, semester);
        
        const notificationData = { title, message, date, time };
        const result = await NotificationModel.create(notificationData);
        
        res.status(200).json({ message: "Notification pushed successfully", data: result });
    } catch (err) {
        res.status(500).json({ message: "Failed to push notification", error: err.message });
    }
});



//end point for fetching notification

app.get('/notifications/:department/:semester', async (req, res) => {
  try {
      const { department, semester } = req.params;
      const NotificationModel = getNotificationModel(department, semester);
      
      const notifications = await NotificationModel.find().sort({ createdAt: -1 });
      res.status(200).json(notifications);
  } catch (err) {
      res.status(500).json({ message: "Failed to fetch notifications", error: err.message });
  }
});