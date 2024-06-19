const express = require("express");

const router = express.Router();

const RoomTransactionController = require("../app/controller/room_transaction.controller");
const RoomTransactionValidator = require("../app/validator/room_transaction.validator");
const upload = require('../middleware/upload.middleware');
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /room-transaction:
 *  get:
 *     tags:
 *     - Room Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Get all room transaction
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/room-transaction", AuthMiddleware, RoomTransactionController.index);

/**
 * @openapi
 * /room-transaction/status/{status}:
 *  get:
 *     tags:
 *     - Room Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Detail room transaction based on status
 *     parameters:
 *     - name: status
 *       in: path
 *       description: Status of the room transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/room-transaction/status/:status", AuthMiddleware, RoomTransactionController.showByStatus);

/**
 * @openapi
 * /room-transaction:
 *  post:
 *     tags:
 *     - Room Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Book a room
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - room_id
 *              - date
 *              - time_start
 *              - time_end
 *              - event
 *              - description
 *              - participant
 *              - participant_description
 *              - consumption
 *              - consumption_description
 *            properties:
 *              room_id:
 *               type: integer
 *               example: 1
 *              date:
 *               type: string
 *               format: date
 *              time_start:
 *               type: string
 *               format: time
 *               example: 07:00:00
 *              time_end:
 *               type: string
 *               format: time
 *               example: 09:00:00
 *              event:
 *               type: string
 *               example: IT Forum
 *              description:
 *               type: string
 *               example: For meeting purposes
 *              participant:
 *               type: integer
 *               example: 14
 *              consumption:
 *               type: string
 *               example: 1
 *              note:
 *               type: string
 *               example: Lorem Ipsum
 *              status:
 *               type: string
 *               example: Dicek
 *              confirmation_note:
 *               type: string
 *               example: Lorem Ipsum
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
router.post("/room-transaction", AuthMiddleware, RoomTransactionValidator.store, RoomTransactionController.store);

/**
 * @openapi
 * /room-transaction/{id}:
 *  get:
 *     tags:
 *     - Room Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Detail room transaction
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the room/transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/room-transaction/:id", AuthMiddleware, RoomTransactionController.show);

/**
 * @openapi
 * /room-transaction/{id}:
 *  put:
 *     tags:
 *     - Room Transaction
 *     summary: Update the booked room (include confirmation)
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the room transaction
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - room_id
 *              - date
 *              - time_start
 *              - time_end
 *              - event
 *              - description
 *              - participant
 *              - participant_description
 *              - consumption
 *              - consumption_description
 *              - status
 *            properties:
 *              room_id:
 *               type: integer
 *               example: 1
 *              date:
 *               type: string
 *               format: date
 *              time_start:
 *               type: string
 *               format: time
 *               example: 07:00:00
 *              time_end:
 *               type: string
 *               format: time
 *               example: 09:00:00
 *              event:
 *               type: string
 *               example: IT Forum
 *              description:
 *               type: string
 *               example: For meeting purposes
 *              participant:
 *               type: integer
 *               example: 14
 *              consumption:
 *               type: string
 *               example: 1
 *              note:
 *               type: string
 *               example: Lorem Ipsum
 *              status:
 *               type: string
 *               example: Diterima
 *              confirmation_note:
 *               type: string
 *               example: Lorem Ipsum
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
router.put("/room-transaction/:id", RoomTransactionValidator.update, AuthMiddleware, RoomTransactionController.update);

/**
 * @openapi
 * /room-transaction/{id}:
 *  delete:
 *     tags:
 *     - Room Transaction
 *     summary: Delete room transaction
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the room/transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/room-transaction/:id", AuthMiddleware, RoomTransactionController.destroy);


module.exports = router;
