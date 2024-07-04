const express = require("express");

const router = express.Router();

const MaterialTransactionController = require("../app/controller/material_transaction.controller");
const MaterialTransactionValidator = require("../app/validator/material_transaction.validator");
const upload = require('../middleware/upload.middleware');
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /material-transaction:
 *  get:
 *     tags:
 *     - Material Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Get all material transaction
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/material-transaction", AuthMiddleware, MaterialTransactionController.index);

/**
 * @openapi
 * /material-transaction/status/{status}:
 *  get:
 *     tags:
 *     - Material Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Detail material transaction based on status
 *     parameters:
 *     - name: status
 *       in: path
 *       description: Status of the material transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/material-transaction/status/:status", AuthMiddleware, MaterialTransactionController.showByStatus);

/**
 * @openapi
 * /material-transaction:
 *  post:
 *     tags:
 *     - Material Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Book a material
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
 *              material_id:
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
router.post("/material-transaction", AuthMiddleware, MaterialTransactionValidator.store, MaterialTransactionController.store);

/**
 * @openapi
 * /material-transaction/{id}:
 *  get:
 *     tags:
 *     - Material Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Detail material transaction
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the material transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/material-transaction/:id", AuthMiddleware, MaterialTransactionController.show);

/**
 * @openapi
 * /material-transaction/admin/{id}:
 *  put:
 *     tags:
 *     - Material Transaction
 *     summary: Update the booked material, include the confirmation (Admin)
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the material transaction
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
 *              material_id:
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
router.put("/material-transaction/admin/:id", MaterialTransactionValidator.adminUpdate, AuthMiddleware, MaterialTransactionController.update);

/**
 * @openapi
 * /material-transaction/take/{id}:
 *  put:
 *     tags:
 *     - Material Transaction
 *     summary: Taking the booked material (User)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the material transaction
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
router.put("/material-transaction/take/:id", upload.materialTransactionUpload.fields([{ name: 'picture', maxCount: 1}, { name: 'driving_license', maxCount: 1}, ]), MaterialTransactionValidator.userTake, AuthMiddleware, MaterialTransactionController.userTake);

/**
 * @openapi
 * /material-transaction/return/{id}:
 *  put:
 *     tags:
 *     - Material Transaction
 *     summary: Returning the booked material (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the material transaction
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
router.put("/material-transaction/return/:id", MaterialTransactionValidator.adminReturn, AuthMiddleware, MaterialTransactionController.adminReturn);

/**
 * @openapi
 * /material-transaction/{id}:
 *  delete:
 *     tags:
 *     - Material Transaction
 *     summary: Delete material transaction
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the material transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/material-transaction/:id", AuthMiddleware, MaterialTransactionController.destroy);


module.exports = router;
