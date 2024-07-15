const express = require("express");

const router = express.Router();

const AuthController = require("../app/controller/auth.controller");
const AuthValidator = require("../app/validator/auth.validator");

/**
 * @openapi
 * /login:
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *               type: string
 *               example: dewabandis11@gmail.com
 *              password:
 *               type: string
 *               example: tes
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/login", AuthValidator.login, AuthController.login);

/**
 * @openapi
 * /register:
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Register
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *              - phone
 *              - division
 *            properties:
 *              name:
 *               type: string
 *               example: Fitrah Firdaus
 *              email:
 *               type: string
 *               example: dewabandis11@gmail.com
 *              password:
 *               type: string
 *               example: password
 *              phone:
 *               type: string
 *               example: 089501027942
 *              division:
 *               type: string
 *               example: internship
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/register", AuthValidator.register, AuthController.register);

/**
 * @openapi
 * /verify-email:
 *  get:
 *     tags:
 *     - Authentication
 *     summary: Verify email user (You cant try this route)
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/verify-email", AuthController.verifyEmail);

/**
 * @openapi
 * /forgot-password:
 *  put:
 *     tags:
 *     - Authentication
 *     summary: Forgot password
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *               type: string
 *               example: dewabandis11@gmail.com
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.put("/forgot-password", AuthValidator.forgotPassword, AuthController.forgotPassword);

/**
 * @openapi
 * /reset-password:
 *  put:
 *     tags:
 *     - Authentication
 *     summary: Reset password (You cant try this route)
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - password
 *              - repeatpassword
 *            properties:
 *              password:
 *               type: string
 *               example: passwords
 *              repeatpassword:
 *               type: string
 *               example: passwords
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.put("/reset-password", AuthValidator.resetPassword, AuthController.resetPassword);

module.exports = router;
