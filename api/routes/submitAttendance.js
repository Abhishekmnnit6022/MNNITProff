const express = require('express');
const router = express.Router();
const getAttendanceModel = require("../models/attendance");

router.post('/', async (req, res) => {
  try {
    const attendanceData = req.body;
    console.log("attendanceData: from submit index", attendanceData);

    if (attendanceData.length === 0) {
      return res.status(400).json({ message: "No attendance data provided" });
    }

    const { group, semester, subject } = attendanceData[0];
    const AttendanceModel = await getAttendanceModel(group, semester, subject);

    const result = [];
    for (const student of attendanceData) {
      const existingRecord = await AttendanceModel.findOne({
        regNo: student.regNo,
        date: student.date,
        group,
        semester,
        subject,
      });

      if (existingRecord) {
        // Update the existing record
        existingRecord.status = student.status;
        await existingRecord.save();
        result.push(existingRecord);
      } else {
        // Create a new record
        const newRecord = new AttendanceModel(student);
        await newRecord.save();
        result.push(newRecord);
      }
    }

    res.status(200).json({ message: "Attendance submitted successfully", data: result });
  } catch (err) {
    console.error("Error submitting attendance:", err);
    res.status(500).json({ message: "Failed to submit attendance", error: err.message });
  }
});

module.exports = router;