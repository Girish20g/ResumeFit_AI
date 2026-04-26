const mongoose = require("mongoose");

/**
 * - job description: string
 * - resume text: string
 * - Self description: string
 * 
 * 
 * - Match Score: Number
 * - Technical questions: 
 *          [{
 *            question: "",
 *            intention: ,
 *            answer: ""
 *          }]
 * - Behavioral questions: 
 *         [{
 *            question: "",
 *            intention: ,
 *            answer: ""
 *         }]
 * - Skill gaps: 
 *        [{
 *             skill: "",
 *             severity: {
 *                 type: String,
 *                 enum: ["Low", "Medium", "High"]
 *             },
 *        }]
 * - preparation plan: [{
 *        day: string,
 *        focus: string,
 *        tasks: [string]
 * }]
 */

const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Technical Question Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Technical Question Answer is required"]
    }
}, {
    _id: false,
});

const behavioralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioral Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Behavioral Question Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Behavioral Question Answer is required"]
    }
}, {
    _id: false,
});

const skillGapsSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: [true, "Severity is required"]
    },
    reason: {
        type: String,
    }
}, {
    _id: false,
});

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: {
        type: [String],
        required: [true, "Tasks are required"]
    }
});

const resumeReportSchema = new mongoose.Schema({

    jobDescription: {
        type: String,
        required: [true, "Job Description is required"]
    },
    resumeText: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillGaps: [skillGapsSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
});

const resumeReportModel = mongoose.model("ResumeReport", resumeReportSchema);

module.exports = resumeReportModel;

