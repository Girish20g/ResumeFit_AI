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

module.exports = { generateResumeFitReportController };