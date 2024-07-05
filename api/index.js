const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { connectStudentDetails,connectClassSchedules,connectNotifications ,connectAttendanceDetails} = require("./dbConfig");

Promise.all([
  connectNotifications,
  connectStudentDetails,
  connectClassSchedules,
  connectAttendanceDetails
]).then(() => {
  console.log("All database connections established")});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//importing the models
const getAttendanceModel = require("./models/attendance"); // Import the Attendance model
const getclassSchedule = require("./models/classSchedule");
const getNotificationModel = require("./models/notification");
const getStudentModel = require("./models/student");




// Endpoint for fetching class schedule
app.get('/classSchedules/:group/:semester/:day', async (req, res) => {
  console.log("Request received in classSchedule API");
  try {
    const { group, semester, day } = req.params;
      console.log("group: ", group);
      console.log("semester: ", semester);
    const ClassScheduleModel = await getclassSchedule(group, semester);
    const classSchedule = await ClassScheduleModel.find({ day }).sort({ createdAt: -1 });
    console.log("classSchedule: ", classSchedule);
    res.status(200).json(classSchedule);
  } catch (err) {
    console.error("Error fetching class schedule:", err);
    res.status(500).json({ message: "Failed to fetch class schedule", error: err.message });
  }
});




// New endpoint for submitting attendance
app.post("/submitAttendance", async (req, res) => {
  try {
    const attendanceData = req.body;
    console.log("attendanceData: from submit index", attendanceData);

    if (attendanceData.length === 0) {
      return res.status(400).json({ message: "No attendance data provided" });
    }

    const { group, semester } = attendanceData[0];
    const AttendanceModel = await getAttendanceModel(group, semester);
    
    const result = await AttendanceModel.insertMany(attendanceData);
    
    res.status(200).json({ message: "Attendance submitted successfully", data: result });
  } catch (err) {
    console.error("Error submitting attendance:", err);
    res.status(500).json({ message: "Failed to submit attendance", error: err.message });
  }
});

//end point for pushing notification

app.post("/pushNotification", async (req, res) => {
  try {
    const { title, message, date, time, department, semester } = req.body;

    const NotificationModel = getNotificationModel(department, semester);

    const notificationData = { title, message, date, time };
    const result = await NotificationModel.create(notificationData);

    res
      .status(200)
      .json({ message: "Notification pushed successfully", data: result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to push notification", error: err.message });
  }
});

//end point for fetching notification

app.get("/notifications/:department/:semester", async (req, res) => {
  try {
    const { department, semester } = req.params;
    const NotificationModel = getNotificationModel(department, semester);

    const notifications = await NotificationModel.find().sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch notifications", error: err.message });
  }
});

app.get("/students/:group/:semester", async (req, res) => {
  try {
    const { group, semester } = req.params;
    const StudentModel = require("./models/student").getModel();
    const students = await StudentModel.find(
      { group, semester },
      { name: 1, regNo: 1, _id: 0 }
    );
    res.status(200).json(students);
  } catch (err) {
    console.log("Fetching student list");
    res.status(500).json({ message: "Failed to fetch student list" });
  }
});
