const express =require ('express');
const router = express.Router();
const {fetchAttendance} = require('../controllers/attendence');

router.get('/fetchattendance',fetchAttendance);


