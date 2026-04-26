const express = require("express");
const authMiddleWare = require("../middlewares/auth.middleware");
const resumeController = require("../controllers/resume.controller");
const upload = require("../middlewares/file.middleware")

const resumeRouter = express.Router();

/**
 * @route POST /api/resume/generate-resume-fit-report
 * @description Generate a resume fit report for a given job description and resume pdf and self description .
 * @access private
 */
resumeRouter.post("/generate-resume-fit-report", authMiddleWare.authUser, upload.single("resume"), resumeController.generateResumeFitReportController);

module.exports = resumeRouter;