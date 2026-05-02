const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blacklist.model");

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in request
 * @access Public
 */

async function registerUserController(req,res) {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email amd password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username}, {email}]
    })

    if(isUserAlreadyExists) {
        if(isUserAlreadyExists.username === username) {
            return res.status(400).json({
            message: "Username already exists"
        })
        } else {
            return res.status(400).json({
            message: "Account already exists with this email address"
        })
        }
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,            
        sameSite: "none",        
        maxAge: 24 * 60 * 60 * 1000  // 1 day
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */

async function loginUserController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if(!user) {
        return res.status(400).json({
            message: "User with this email does not exist"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid password!!"
        })
    }

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,            
        sameSite: "none",        
        maxAge: 24 * 60 * 60 * 1000  // 1 day
    });
    res.status(200).json({
        message: "User loggedin successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name logoutUserController
 * @description logout a user, add token to blacklist from cookie
 * @access Public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token;

    if(token) {
        await tokenBlackListModel.create({token})
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name getUserController
 * @description get the current logged in user details
 * @access Private
 */

async function getUserController(req, res) {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        },
        message: "User details fetched successfully."
    })
}

module.exports = {registerUserController, loginUserController, logoutUserController, getUserController};