const express = require("express");

const router = express.Router();

const MaterialController = require("../app/controller/material.controller");
const MaterialValidator = require("../app/validator/material.validator");
const upload = require('../middleware/upload.middleware');
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /material:
 *  get:
 *     tags:
 *     - Material
 *     security:
 *       - bearerAuth: []
 *     summary: Get all material
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/material", AuthMiddleware, MaterialController.index);

/**
 * @openapi
 * /material:
 *  post:
 *     tags:
 *     - Material
 *     summary: Add Material
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
 *              - license
 *              - picture
 *            properties:
 *              name:
 *               type: string
 *               example: Volkswagen
 *              license:
 *               type: string
 *               example: AB12345
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
router.post("/material", upload.materialUpload.single('picture'), MaterialValidator.store, AuthMiddleware, MaterialController.store);

/**
 * @openapi
 * /material/{id}:
 *  get:
 *     tags:
 *     - Material
 *     summary: Get material
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the material
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/material/:id", AuthMiddleware, MaterialController.show);

/**
 * @openapi
 * /material/{id}:
 *  put:
 *     tags:
 *     - Material
 *     summary: Update Material
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the material
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - license
 *            properties:
 *              name:
 *               type: string
 *               example: Volkswagen
 *              license:
 *               type: string
 *               example: AB12345
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
router.put("/material/:id", upload.materialUpload.single('picture'), MaterialValidator.update, AuthMiddleware, MaterialController.update);

/**
 * @openapi
 * /material/{id}:
 *  delete:
 *     tags:
 *     - Material
 *     summary: Delete material
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the material
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/material/:id", AuthMiddleware, MaterialController.destroy);


module.exports = router;
