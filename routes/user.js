const express = require("express");

const router = express.Router();

const UserController = require("../app/controller/user.controller");
const UserValidator = require("../app/validator/user.validator");
const upload = require('../middleware/upload.middleware');
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /user/detail:
 *  get:
 *     tags:
 *     - User
 *     summary: Get detail user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/user/detail", AuthMiddleware, UserController.detail);

/**
 * @openapi
 * /user:
 *  get:
 *     tags:
 *     - User
 *     summary: Get all user
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/user", AuthMiddleware, UserController.index);

/**
 * @openapi
 * /user:
 *  post:
 *     tags:
 *     - User
 *     summary: Add User
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
 *              - email
 *              - password
 *              - phone
 *              - role
 *              - division
 *            properties:
 *              name:
 *               type: string
 *               example: Fitrah Firdaus
 *              email:
 *               type: string
 *               example: fitrahf87@gmedia.id
 *              password:
 *               type: string
 *               example: password
 *              phone:
 *               type: string
 *               example: 0895411423735
 *              role:
 *               type: string
 *               enum: ["User", "Admin", "SPV Rooms", "SPV Cars"]
 *              division:
 *               type: string
 *               example: Internship
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
router.post("/user", upload.userUpload.single('picture'), UserValidator.store, AuthMiddleware, UserController.store);

/**
 * @openapi
 * /user/{id}:
 *  get:
 *     tags:
 *     - User
 *     summary: Get user
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the user
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/user/:id", AuthMiddleware, UserController.show);

/**
 * @openapi
 * /user/profile/{id}:
 *  put:
 *     tags:
 *     - User
 *     summary: Update Profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the user
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - phone
 *              - role
 *              - division
 *            properties:
 *              name:
 *               type: string
 *               example: Fitrah Firdaus
 *              email:
 *               type: string
 *               example: fitrahf87@gmedia.id
 *              phone:
 *               type: string
 *               example: 0895411423735
 *              role:
 *               type: string
 *               enum: ["User", "Admin", "SPV Rooms", "SPV Cars"]
 *              division:
 *               type: string
 *               example: Internship
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
router.put("/user/profile/:id", upload.userUpload.single('picture'), AuthMiddleware, UserValidator.updateProfile, UserController.update);

/**
 * @openapi
 * /user/password/{id}:
 *  put:
 *     tags:
 *     - User
 *     summary: Update Password
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the user
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - oldpassword
 *              - newpassword
 *            properties:
 *              oldpassword:
 *               type: string
 *               example: password
 *              newpassword:
 *               type: string
 *               example: password
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
router.put("/user/password/:id", UserValidator.updatePassword, UserController.update);

/**
 * @openapi
 * /user/{id}:
 *  delete:
 *     tags:
 *     - User
 *     summary: Delete user
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the user
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/user/:id", AuthMiddleware, UserController.destroy);


module.exports = router;
