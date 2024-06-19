const express = require("express");

const router = express.Router();

const NotificationController = require("../app/controller/notification.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /notification:
 *  get:
 *     tags:
 *     - Notification
 *     security:
 *       - bearerAuth: []
 *     summary: Get all notification based on authentication
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/notification", AuthMiddleware, NotificationController.index);

module.exports = router;
