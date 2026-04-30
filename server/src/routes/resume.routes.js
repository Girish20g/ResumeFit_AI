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

/**
 * @route GET /api/resume/report/:reportId
 * @description Get a resume fit report by id.
 * @access private
 */
resumeRouter.get("/report/:reportId", authMiddleWare.authUser, resumeController.getResumeReportbyIdController);

/**
 * @route GET /api/resume/reports
 * @description Get all resume fit reports for a user.
 * @access private
 */
resumeRouter.get("/reports", authMiddleWare.authUser, resumeController.getUserResumeReportsController);



module.exports = resumeRouter;