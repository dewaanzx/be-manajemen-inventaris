const express = require("express");

const router = express.Router();

const RoomController = require("../app/controller/room.controller");
const RoomValidator = require("../app/validator/room.validator");
const upload = require('../middleware/upload.middleware');
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /room:
 *  get:
 *     tags:
 *     - Room
 *     security:
 *       - bearerAuth: []
 *     summary: Get all room
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/room", AuthMiddleware, RoomController.index);

/**
 * @openapi
 * /room:
 *  post:
 *     tags:
 *     - Room
 *     summary: Add Room
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - capacity
 *              - picture
 *            properties:
 *              name:
 *               type: string
 *               example: Meeting Room 1
 *              description:
 *               type: string
 *               example: Lorem Ipsum
 *              capacity:
 *               type: integer
 *               example: 15
 *              picture:
 *               type: file
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/room", upload.roomUpload.single('picture'), RoomValidator.store, AuthMiddleware, RoomController.store);

/**
 * @openapi
 * /room/{id}:
 *  get:
 *     tags:
 *     - Room
 *     security:
 *       - bearerAuth: []
 *     summary: Get room
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the room
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/room/:id", AuthMiddleware, RoomController.show);

/**
 * @openapi
 * /room/{id}:
 *  put:
 *     tags:
 *     - Room
 *     summary: Update Room
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the room
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - capacity
 *            properties:
 *              name:
 *               type: string
 *               example: Meeting Room 1
 *              description:
 *               type: string
 *               example: Lorem Ipsum
 *              capacity:
 *               type: integer
 *               example: 15
 *              picture:
 *               type: file
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.put("/room/:id", upload.roomUpload.single('picture'), RoomValidator.update, AuthMiddleware, RoomController.update);

/**
 * @openapi
 * /room/{id}:
 *  delete:
 *     tags:
 *     - Room
 *     summary: Delete room
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the room
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/room/:id", AuthMiddleware, RoomController.destroy);


module.exports = router;
