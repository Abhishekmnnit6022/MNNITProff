const { connectAttendanceDetails } = require('../dbConfig');

async function fetchStudentAttendance(req, res) {
    try {
        const AttendanceDetails = (await connectAttendanceDetails).model('AttendanceDetails');
        const { regNo } = req.query; // Use query parameter for GET requests

        if (!regNo) {
            return res.status(400).json({ error: 'Missing registration number' });
        }

        const attendanceRecords = await AttendanceDetails.find({ regNo });

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: "No attendance records found for this registration number" });
        }

        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { fetchStudentAttendance };
