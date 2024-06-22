const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://auxin:auxin@cluster0.xrg7sez.mongodb.net").then(
    () => {
        console.log("Database connected");
    }
).catch(err => {
    console.log(err);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



//end point for fetching  classSchedule
const Attendance = require('./models/attendance'); // Import the Attendance model

const classSchedule = require('./models/classSchedule');
const Notification = require('./models/notification');


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
      const notificationData = req.body;
      const result = await Notification.insertMany(notificationData);
      res.status(200).json({ message: "Notification pushed successfully", data: result });
    } catch (err) {
      res.status(500).json({ message: "Failed to push notification", error: err.message });
    }


});

  