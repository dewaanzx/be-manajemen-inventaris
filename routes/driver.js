const express = require("express");

const router = express.Router();

const DriverController = require("../app/controller/driver.controller");
const DriverValidator = require("../app/validator/driver.validator");
const upload = require('../middleware/upload.middleware');
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /driver:
 *  get:
 *     tags:
 *     - Driver
 *     security:
 *       - bearerAuth: []
 *     summary: Get all driver
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/driver", AuthMiddleware, DriverController.index);

/**
 * @openapi
 * /driver:
 *  post:
 *     tags:
 *     - Driver
 *     summary: Add Driver
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
 *              - picture
 *            properties:
 *              name:
 *               type: string
 *               example: Asep
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
router.post("/driver", upload.driverUpload.single('picture'), DriverValidator.store, AuthMiddleware, DriverController.store);

/**
 * @openapi
 * /driver/{id}:
 *  get:
 *     tags:
 *     - Driver
 *     summary: Get driver
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the driver
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/driver/:id", AuthMiddleware, DriverController.show);

/**
 * @openapi
 * /driver/{id}:
 *  put:
 *     tags:
 *     - Driver
 *     summary: Update Driver
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the driver
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *               type: string
 *               example: Asep
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
router.put("/driver/:id", upload.driverUpload.single('picture'), DriverValidator.update, AuthMiddleware, DriverController.update);

/**
 * @openapi
 * /driver/{id}:
 *  delete:
 *     tags:
 *     - Driver
 *     summary: Delete driver
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the driver
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/driver/:id", AuthMiddleware, DriverController.destroy);


module.exports = router;
