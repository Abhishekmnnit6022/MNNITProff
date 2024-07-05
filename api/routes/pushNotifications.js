const express = require("express");
const router = express.Router();
const getNotificationModel = require("./models/notification");


router.post("/", async (req, res) => {
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

module.exports = router;