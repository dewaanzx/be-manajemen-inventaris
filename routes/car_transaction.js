const express = require("express");

const router = express.Router();

const CarTransactionController = require("../app/controller/car_transaction.controller");
const CarTransactionValidator = require("../app/validator/car_transaction.validator");
const upload = require('../middleware/upload.middleware');
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /car-transaction:
 *  get:
 *     tags:
 *     - Car Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Get all car transaction
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/car-transaction", AuthMiddleware, CarTransactionController.index);

/**
 * @openapi
 * /car-transaction/status/{status}:
 *  get:
 *     tags:
 *     - Car Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Detail car transaction based on status
 *     parameters:
 *     - name: status
 *       in: path
 *       description: Status of the car transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/car-transaction/status/:status", AuthMiddleware, CarTransactionController.showByStatus);

/**
 * @openapi
 * /car-transaction:
 *  post:
 *     tags:
 *     - Car Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Book a car
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - date
 *              - time
 *              - destination
 *              - description
 *              - passanger
 *              - passanger_description
 *              - driver
 *            properties:
 *              date:
 *               type: string
 *               format: date
 *              time:
 *               type: string
 *               format: time
 *               example: 07:00:00
 *              destination:
 *               type: string
 *               example: Lorem Ipsum
 *              description:
 *               type: string
 *               example: Solo
 *              passanger:
 *               type: integer
 *               example: 5
 *              passanger_description:
 *               type: string
 *               example: Lorem Ipsum
 *              driver:
 *               type: string
 *               example: 1
 *              driver_id:
 *               type: string
 *               example: 1
 *              car_id:
 *               type: integer
 *               example: 1
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
router.post("/car-transaction", AuthMiddleware, CarTransactionValidator.store, CarTransactionController.store);

/**
 * @openapi
 * /car-transaction/{id}:
 *  get:
 *     tags:
 *     - Car Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Detail car transaction
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the car transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/car-transaction/:id", AuthMiddleware, CarTransactionController.show);

/**
 * @openapi
 * /car-transaction/admin/{id}:
 *  put:
 *     tags:
 *     - Car Transaction
 *     summary: Update the booked car, include the confirmation (Admin)
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the car transaction
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - date
 *              - time
 *              - destination
 *              - description
 *              - passanger
 *              - passanger_description
 *              - driver
 *              - status
 *            properties:
 *              date:
 *               type: string
 *               format: date
 *               example: 2023-11-13
 *              time:
 *               type: string
 *               format: time
 *               example: 07:30:00
 *              destination:
 *               type: string
 *               example: Lorem Ipsum
 *              description:
 *               type: string
 *               example: Solo
 *              passanger:
 *               type: integer
 *               example: 5
 *              passanger_description:
 *               type: string
 *               example: Lorem Ipsum
 *              driver:
 *               type: string
 *               example: 1
 *              driver_id:
 *               type: string
 *               example: 1
 *              car_id:
 *               type: integer
 *               example: 1
 *              status:
 *               type: string
 *               enum: ["Dicek", "Ditolak", "Diterima", "Digunakan", "Selesai"]
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
router.put("/car-transaction/admin/:id", CarTransactionValidator.adminUpdate, AuthMiddleware, CarTransactionController.update);

/**
 * @openapi
 * /car-transaction/take/{id}:
 *  put:
 *     tags:
 *     - Car Transaction
 *     summary: Taking the booked car (User)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the car transaction
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - date
 *              - time_taken
 *              - picture
 *              - driving_license
 *            properties:
 *              date:
 *               type: string
 *               format: date
 *               example: 2023-11-13
 *              time_taken:
 *               type: string
 *               format: time
 *               example: 08:00:00
 *              picture:
 *               type: file
 *              driving_license:
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
router.put("/car-transaction/take/:id", upload.carTransactionUpload.fields([{ name: 'picture', maxCount: 1}, { name: 'driving_license', maxCount: 1}, ]), CarTransactionValidator.userTake, AuthMiddleware, CarTransactionController.userTake);

/**
 * @openapi
 * /car-transaction/return/{id}:
 *  put:
 *     tags:
 *     - Car Transaction
 *     summary: Returning the booked car (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the car transaction
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - date
 *              - time_return
 *              - return_note
 *            properties:
 *              date:
 *               type: string
 *               format: date
 *               example: 2023-11-13
 *              time_return:
 *               type: string
 *               format: time
 *               example: 08:00:00
 *              return_note:
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
router.put("/car-transaction/return/:id", CarTransactionValidator.adminReturn, AuthMiddleware, CarTransactionController.adminReturn);

/**
 * @openapi
 * /car-transaction/{id}:
 *  delete:
 *     tags:
 *     - Car Transaction
 *     summary: Delete car transaction
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the car transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/car-transaction/:id", AuthMiddleware, CarTransactionController.destroy);


module.exports = router;
