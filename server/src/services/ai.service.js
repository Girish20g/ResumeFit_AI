const { GoogleGenAI } = require('@google/genai');
const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const resumeReportSchema = z.object({
  matchScore: z.number().min(0).max(100).describe("The match score between the resume and the job description between 0 to 100 indicating how well the resume matches the job description"),
  technicalQuestions: z.array(z.object({
    question: z.string().describe("The technical questions that can be asked in the interview"),
    intention: z.string().describe("The intention behind the technical question"),
    answer: z.string().describe("how to answer this question, what points to cover, what keywords to use, what example to include and what common mistakes to avoid")
  })).describe("Technical questions that can be asked in the interview along with a proper answer for each"),
  behavioralQuestions: z.array(z.object({
    question: z.string().describe("The behavioral questions that can be asked in the interview"),
    intention: z.string().describe("The intention behind the behavioral question"),
    answer: z.string().describe("how to answer this question, what points to cover, what keywords to use, what example to include and what common mistakes to avoid")
  })).describe("Behavioral questions that can be asked in the interview along with a proper answer for each"),
  skillGaps: z.array(z.object({
    skill: z.string().describe("The skill gap that needs to be addressed"),
    severity: z.enum(["Low", "Medium", "High"]).describe("The severity of the skill gap"),
    reason: z.string().describe("The reason for the skill gap"),
  })).describe("Skill gaps that need to be addressed along with the severity and reason for each"),
  preparationPlan: z.array(z.object({
    day: z.number().describe("The day of the preparation plan"),
    focus: z.string().describe("The focus of the preparation plan"),
    tasks: z.array(z.string()).describe("The tasks to be completed on the day")
  })).describe("A day-wise preparation plan to address the skill gaps and improve the match score"),
  title: z.string().describe("The title of the job for which the resume fit report is generated. Try make it intresting and catchy")
}).describe("A comprehensive resume fit report that includes technical questions, behavioral questions, skill gaps, and a preparation plan to improve the match score");



async function generateResumeFitReport({ jobDescription, resumeText, selfDescription }) {
  const prompt = `You are an expert technical recruiter and career coach. Analyze the provided resume, self-description, and job description, then generate a resume fit report as JSON object based on the schema defined.

## INPUTS
<resume>${resumeText}</resume>
<self_description>${selfDescription}</self_description>
<job_description>${jobDescription}</job_description>

## OUTPUT SCHEMA
Return ONLY valid JSON. No markdown, no explanation.

{
  "matchScore": <0-100 integer reflecting resume-JD alignment>,
  "technicalQuestions": [
    {
      "question": "<role-specific technical question>",
      "intention": "<what the interviewer is assessing>",
      "answer": "<key points, keywords, example to cite, mistakes to avoid>"
    }
    // 5-7 questions
  ],
  "behavioralQuestions": [
    {
      "question": "<STAR-format behavioral question>",
      "intention": "<competency being evaluated>",
      "answer": "<structure, talking points, example from candidate's background, pitfalls>"
    }
    // 4-5 questions
  ],
  "skillGaps": [
    {
      "skill": "<missing or weak skill>",
      "severity": "<Low|Medium|High>",
      "reason": "<why it matters for this role and what's lacking>"
    }
  ],
  "preparationPlan": [
    {
      "day": <1-based integer>,
      "focus": "<theme for the day>",
      "tasks": ["<concrete, actionable task>"]
    }
    // 7-14 days covering all skill gaps
  ]
}

## SCORING RULES
- matchScore: weight technical skills 50%, experience relevance 30%, domain/culture fit 20%
- skillGaps severity: High = required in JD but absent; Medium = mentioned but weak; Low = nice-to-have
- preparationPlan: prioritize High-severity gaps first; tasks must be specific (e.g., "Build a REST API with JWT auth" not "practice coding")
- behavioral answers must reference candidate's actual background from resume/self-description where possible`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumeReportSchema),
    },
  });
  return JSON.parse(response.text);
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4', margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' } });
  await browser.close();
  return pdfBuffer;
}

async function generateResumePDF({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z.string().describe("The HTML content of the resume, which should be well-formatted and visually appealing, incorporating the resume content, self-description, and job description in a way that highlights the candidate's strengths and fit for the role, which can be directly converted to a PDF format using a library like Puppeteer")
  }).describe("Schema for the generated resume PDF");

  const prompt = `You are an expert resume writer and designer. Create a visually appealing and well-structured HTML resume that effectively showcases the candidate's qualifications, experience, and fit for the job description. Use the provided resume content, self-description, and job description to craft a compelling narrative that highlights the candidate's strengths and suitability for the role.

## INPUTS
<resume>${resume}</resume>
<self_description>${selfDescription}</self_description>
<job_description>${jobDescription}</job_description>

## OUTPUT SCHEMA
Return ONLY valid JSON. No markdown, no explanation.

{
  "html": "<well-formatted HTML content for the resume>"
}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });
  const pdfBuffer = await generatePdfFromHtml(JSON.parse(response.text).html);
  return pdfBuffer;
}

module.exports = { generateResumeFitReport, generateResumePDF };