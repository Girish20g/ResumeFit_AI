const pdfParse = require("pdf-parse");
const { generateResumeFitReport } = require("../services/ai.service");
const resumeReportModel = require("../models/resumeReport.model");

/**
 * @description Generate a resume fit report for a given job description and resume pdf and self description .
 * @access private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

async function generateResumeFitReportController(req, res) {
    const resumeFile = req.file;
    const resumeText = await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText();
    const { jobDescription, selfDescription } = req.body;
    try {

        const resumeReportByAI = await generateResumeFitReport({ jobDescription, resumeText, selfDescription });
        const resumeReport = await resumeReportModel.create({
            user: req.user.id,
            jobDescription,
            resumeText: resumeText.text,
            selfDescription,
            ...resumeReportByAI,
        });
        return res.status(201).json({
            message: "Resume Fit Report generated successfully",
            resumeReport
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error generating resume fit report",
            error: error.message
        });
    }
}

/**
 * @description Get a resume fit report by id.
 * @access private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

async function getResumeReportbyIdController(req, res) {
    try {
        const { reportId } = req.params;
        if (!reportId) {
            throw new Error("Report Id is required");
        }
        const resumeReport = await resumeReportModel.findOne({ _id: reportId, user: req.user.id });
        if (!resumeReport) {
            throw new Error("Report not found");
        }
        return res.status(200).json({
            message: "Resume Fit Report fetched successfully",
            resumeReport
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching resume fit report",
            error: error.message
        });
    }
}

async function getUserResumeReportsController(req, res) {
    try {
        const resumeReports = await resumeReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resumeText -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -preparationPlan -skillGaps")
        return res.status(200).json({
            message: "Resume Fit Reports fetched successfully",
            resumeReports
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching resume fit reports",
            error: error.message
        });
    }
}

module.exports = { generateResumeFitReportController, getResumeReportbyIdController, getUserResumeReportsController };