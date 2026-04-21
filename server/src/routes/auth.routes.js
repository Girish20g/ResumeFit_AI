const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleWare = require('../middlewares/auth.middleware');

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @descrition Register a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login a user with email and password
 * @access Public
 */

authRouter.post("/login", authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add token in blacklist
 * @access Public
 */

authRouter.get("/logout", authController.logoutUserController)

/**
 * @route GET /api/auth/me
 * @description get the current logged in user details
 * @access Private
 */

authRouter.get("/me",authMiddleWare.authUser,authController.getUserController)

module.exports = authRouter;