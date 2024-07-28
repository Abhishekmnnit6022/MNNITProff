const express = require("express");
const router = express.Router();
const getNotificationModel = require("../models/notification");
const { Expo } = require('expo-server-sdk');

const expo = new Expo({ accessToken: "8zhxUq72RQ214TdzCBlmU2gbqcTb4YNyWEib_O2e", useFcmV1: true });

// Combined POST route for creating notification and sending push notification
router.post("/", async (req, res) => {
  try {
    const { professorId, title, message, Date, time, department, semester } = req.body;
    console.log("Request received in combined notification API");

    // Save the notification to the database
    const NotificationModel = await getNotificationModel(department, semester);
    const notificationData = { professorId, title, message, Date, time };
    const result = await NotificationModel.create(notificationData);

    // Send push notification
    const pushToken = "ExponentPushToken[bR_Y8nCV4j95w27Q_KohDY]";
    
    if (!Expo.isExpoPushToken(pushToken)) {
      throw new Error(`Push token ${pushToken} is not a valid Expo push token`);
    }

    const messages = [{
      to: pushToken,
      sound: 'default',
      title: title,
      body: message,
      data: { withSome: 'data' },
    }];

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error('Error sending push notifications:', error);
        throw new Error('Failed to send push notification');
      }
    }

    res.status(200).json({ 
      message: "Notification created and push notification sent successfully", 
      data: result,
      pushNotificationTickets: tickets 
    });
  } catch (err) {
    console.error('Error in combined notification route:', err);
    res.status(500).json({ 
      message: "Failed to create notification and send push notification", 
      error: err.message 
    });
  }
});

// Existing GET route
router.get("/:professorId/:department/:semester", async (req, res) => {
  try {
    const { professorId, department, semester } = req.params;
    const NotificationModel = await getNotificationModel(department, semester);
    const notifications = await NotificationModel.find({ professorId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications", error: err.message });
  }
});

// Existing PUT route
// Updated PUT route
router.put("/:department/:semester/:id", async (req, res) => {
  try {
    const { department, semester, id } = req.params;
    const { message, title } = req.body;
    const NotificationModel = await getNotificationModel(department, semester);
    const updatedNotification = await NotificationModel.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );

    // Send push notification
    const pushToken = "ExponentPushToken[bR_Y8nCV4j95w27Q_KohDY]";
    if (!Expo.isExpoPushToken(pushToken)) {
      throw new Error(`Push token ${pushToken} is not a valid Expo push token`);
    }

    const messages = [{
      to: pushToken,
      sound: 'default',
      title: `Updated: ${title}`,
      body: message,
      data: { withSome: 'data' },
    }];

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error('Error sending push notifications:', error);
        throw new Error('Failed to send push notification');
      }
    }

    res.status(200).json({
      message: "Notification updated and push notification sent successfully",
      data: updatedNotification,
      pushNotificationTickets: tickets
    });
  } catch (err) {
    console.error('Error in update notification route:', err);
    res.status(500).json({
      message: "Failed to update notification and send push notification",
      error: err.message
    });
  }
});

// Existing DELETE route
router.delete("/:department/:semester/:id", async (req, res) => {
  try {
    const { department, semester, id } = req.params;
    const NotificationModel = await getNotificationModel(department, semester);
    await NotificationModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete notification", error: err.message });
  }
});

module.exports = router;