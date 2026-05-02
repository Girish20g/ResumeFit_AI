# ResumeFit AI

> **AI-powered resume analyzer that matches your resume to job descriptions, identifies skill gaps, and generates personalized interview preparation guides.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Active](https://img.shields.io/badge/Status-Active%20Development-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)]()
[![React](https://img.shields.io/badge/React-19.2-61dafb)]()
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933)]()

---

## 🎯 The Problem

Job seekers face a critical challenge: **How do you know if your resume matches a job description?** 

Without clear feedback, candidates spend hours tweaking their resume blindly, preparing for the wrong interview topics, and missing key skill alignments. This leads to:
- ❌ Resume rejections despite strong qualifications
- ❌ Unfocused interview preparation
- ❌ Missed opportunities to highlight relevant experiences
- ❌ Wasted time on irrelevant skill development

**ResumeFit AI solves this** by providing instant, AI-driven analysis that tells you exactly how your resume aligns with any job description.

---

## ✨ Key Features

### 🔍 **Resume Upload & AI Analysis**
Upload your resume (PDF) and a job description. Our system extracts your resume content and sends it to Google's Gemini AI for comprehensive analysis.

### 📊 **Resume-to-Job Matching Score**
Get a 0-100 score based on:
- **Technical Fit (50%)** — How well your technical skills match
- **Experience Alignment (30%)** — Relevance of your work history
- **Culture Fit (20%)** — Soft skills and cultural alignment

### 🎤 **Interview Question Generation**
Automatically generates:
- **5-7 Technical Questions** — Role-specific technical challenges with detailed answers
- **4-5 Behavioral Questions** — STAR-format answers for common HR questions
- **Interview Tips** — Context-aware guidance for each question

### 🎓 **Skill Gap Analysis**
Identifies missing skills with severity levels:
- 🔴 **High Priority** — Critical for the role
- 🟡 **Medium Priority** — Preferred qualifications
- 🟢 **Low Priority** — Nice-to-have skills

Each gap includes a brief explanation of why it matters for the target role.

### 📅 **Personalized Preparation Plans**
Get a **7-14 day customized roadmap** with:
- Daily focus areas tailored to skill gaps
- Actionable tasks for each day
- Progressive difficulty (foundation → advanced)

### 📝 **Resume Optimization**
AI generates a **tailored version of your resume** optimized for the specific job description, highlighting relevant experiences and using matching keywords.

### 💾 **PDF Export & Report Storage**
- Export reports as JSON for data portability
- Generate PDF versions of optimized resumes
- Store unlimited reports in your account for future reference

### 🔐 **Secure Authentication**
- JWT-based authentication with HTTP-only cookies
- Password encryption with bcryptjs
- Token blacklist for secure logout
- Protected routes for authenticated users only

---

## 🏗️ How It Works

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER UPLOADS RESUME & JOB DESCRIPTION                   │
│    └─ PDF resume + job description text + optional notes   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. SERVER EXTRACTS RESUME TEXT                             │
│    └─ PDF parsing with pdf-parse library                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. AI ANALYSIS (GOOGLE GEMINI)                             │
│    └─ Structured prompting with Zod schemas for JSON       │
│    └─ Analyzes: match score, questions, skills, plan       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. DATABASE STORAGE                                         │
│    └─ Complete report with all analysis saved in MongoDB   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. RESULTS DISPLAYED TO USER                               │
│    └─ Interactive UI showing all analysis & recommendations│
└─────────────────────────────────────────────────────────────┘
```

### 🧠 Why Gemini AI with Zod Schemas?

We use **Google Gemini 3.5-Flash** for fast, cost-effective analysis combined with **Zod validation** to ensure:
- ✅ **Structured Output** — AI responses conform to exact JSON schema
- ✅ **Reliability** — No parsing errors or malformed data
- ✅ **Consistency** — Every report has the same high-quality structure
- ✅ **Type Safety** — Validated data throughout the application

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.5 | UI framework with hooks |
| TypeScript | 6.0.2 | Type-safe development |
| Vite | 8.0.9 | Lightning-fast module bundler |
| React Router | 7.14.2 | Client-side routing |
| SCSS | 1.99.0 | Advanced styling |
| Axios | 1.15.2 | HTTP client with credentials |
| Framer Motion | 12.38.0 | Smooth animations |
| Lucide React | 1.14.0 | Beautiful SVG icons |

### **Backend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 5.2.1 | Web server framework |
| MongoDB | - | NoSQL database |
| Mongoose | 9.4.1 | MongoDB object modeling |
| JWT | 9.0.3 | Secure authentication |
| Bcryptjs | 3.0.3 | Password encryption |
| Multer | 2.1.1 | File upload handling |

### **AI & PDF Processing**
| Technology | Version | Purpose |
|-----------|---------|---------|
| Google Generative AI | 1.50.1 | Gemini AI API for analysis |
| pdf-parse | 2.4.5 | Extract text from PDFs |
| Puppeteer | 24.42.0 | Generate PDFs server-side |
| Zod | 3.25.76 | Schema validation & TypeScript inference |

### **Development Tools**
| Technology | Purpose |
|-----------|---------|
| ESLint | Code linting & consistency |
| Concurrently | Run frontend + backend simultaneously |
| Nodemon | Auto-restart backend on changes |

---

## 🔒 Security Architecture

### **Authentication Flow**
```
User Registration/Login
        ↓
   Password Hashed (bcryptjs)
        ↓
   Generate JWT Token
        ↓
   Store as HTTP-only Cookie (Secure)
        ↓
   Validate on Protected Routes
```

### **Security Features**

🔐 **JWT Authentication**
- Tokens stored in HTTP-only cookies (protected from XSS)
- 1-day token expiration for time-limited access
- Automatic token validation on protected routes

🛡️ **Token Blacklist Mechanism**
- On logout, token is added to blacklist collection
- Middleware checks blacklist before validating tokens
- Prevents token reuse after explicit logout

🔑 **Password Encryption**
- bcryptjs with salt rounds for industry-standard hashing
- Passwords never stored in plain text
- Secure password verification on login

🌐 **CORS Configuration**
- Whitelist frontend origin (localhost:5173 for dev)
- Credentials allowed for cookie transmission
- Prevents unauthorized cross-origin requests

✅ **Input Validation**
- Zod schemas for API request validation
- Enforced structured responses from AI
- Type-safe data throughout the pipeline

---

## 🤖 AI Integration Highlights

### **Structured Prompting with Zod**

Traditional AI integrations often return inconsistent JSON. We solved this with **Zod schema validation**:

```typescript
const InterviewQuestionsSchema = z.object({
  question: z.string(),
  intention: z.string(),
  answer: z.string()
});

const ReportSchema = z.object({
  matchScore: z.number().min(0).max(100),
  technicalQuestions: z.array(InterviewQuestionsSchema),
  behavioralQuestions: z.array(InterviewQuestionsSchema),
  skillGaps: z.array(SkillGapSchema),
  preparationPlan: z.array(PlanDaySchema)
});
```

This ensures **every AI response is validated** before being saved to the database. ✅

### **AI-Generated Content**

Gemini AI analyzes your resume across multiple dimensions:

📋 **Technical Assessment**
- Evaluates technical skills against job requirements
- Considers years of experience in relevant technologies
- Identifies technology overlap and gaps

🎯 **Interview Preparation**
- Generates role-specific technical questions with complete answers
- Creates behavioral questions following STAR methodology
- Provides context for why each question matters

🔄 **Personalized Roadmap**
- Creates 7-14 day learning plan focused on skill gaps
- Prioritizes by severity and relevance
- Includes practical tasks for each day

---

## 📁 Project Structure

```
ResumeFit_AI/
├── client/                          # React Frontend (Vite)
│   ├── src/
│   │   ├── app.routes.tsx          # Route definitions
│   │   ├── App.tsx                 # Root component
│   │   ├── main.tsx                # Entry point
│   │   ├── assets/                 # Images, fonts, etc.
│   │   ├── components/
│   │   │   └── Navbar/             # Navigation component
│   │   ├── features/
│   │   │   ├── auth/               # Authentication feature
│   │   │   │   ├── components/     # Button, FormInput, FormContainer
│   │   │   │   ├── hooks/          # useAuth custom hook
│   │   │   │   ├── pages/          # Login, Register pages
│   │   │   │   └── services/       # auth.api.ts (API calls)
│   │   │   └── resume_report/      # Resume analysis feature
│   │   │       ├── components/     # FileUpload, ReportsModal, SectionCard
│   │   │       ├── hooks/          # useResumeReport custom hook
│   │   │       ├── pages/          # Home (upload), Report (results)
│   │   │       └── services/       # report.api.ts (API calls)
│   │   └── hooks/
│   │       └── useTheme.tsx        # Theme management (dark/light)
│   ├── vite.config.ts              # Vite configuration
│   ├── tsconfig.json               # TypeScript config
│   └── package.json                # Frontend dependencies
│
├── server/                          # Express.js Backend
│   ├── src/
│   │   ├── app.js                  # Express setup, middleware
│   │   ├── config/
│   │   │   └── database.js         # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js  # Login, Register, Logout logic
│   │   │   └── resume.controller.js# Resume analysis logic
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js  # JWT verification
│   │   │   └── file.middleware.js  # PDF upload validation
│   │   ├── models/
│   │   │   ├── user.model.js       # User schema (username, email, password)
│   │   │   ├── resumeReport.model.js # Report schema (questions, gaps, plan)
│   │   │   └── blacklist.model.js  # Token blacklist for logout
│   │   ├── routes/
│   │   │   ├── auth.routes.js      # /api/auth/* endpoints
│   │   │   └── resume.routes.js    # /api/resume/* endpoints
│   │   └── services/
│   │       └── ai.service.js       # Gemini AI integration & PDF processing
│   ├── server.js                   # Server entry point
│   └── package.json                # Backend dependencies
│
├── README.md                        # This file
└── package.json                    # Root (manages scripts)
```

### **Key Folders Explained**

- **`client/features/auth/`** — Complete authentication system including login/register pages, form validation, and API integration
- **`client/features/resume_report/`** — Core feature: resume upload, AI analysis display, interview questions, skill gaps, and preparation plans
- **`server/services/ai.service.js`** — Brain of the application: PDF extraction, Gemini AI prompting, and structured output validation
- **`server/models/`** — Data layer defining User, ResumeReport, and TokenBlacklist schemas

---

## 🎨 Key Implementation Details

### **Frontend State Management**
- **Context API** (not Redux) for simplicity and reduced bundle size
- Nested providers: Theme → Auth → ResumeReport
- Custom hooks (`useAuth`, `useResumeReport`) for clean component logic

### **File Upload & Processing**
- **Multipart form data** — Resume PDF + job description + notes in single request
- **Memory storage** with Multer — Files never written to disk
- **5MB size limit** enforced for uploads
- **pdf-parse** library extracts text content from PDFs

### **API Architecture**
- **RESTful endpoints** with consistent naming (`/api/auth/*`, `/api/resume/*`)
- **Pagination support** on reports retrieval
- **Filtered responses** — Sensitive fields excluded from list endpoints

### **AI Prompt Strategy**
- Zod schemas define exact expected output format
- Gemini AI receives clear, structured prompt with schema requirements
- Validation fails gracefully if AI output doesn't match schema
- Fallback handling for edge cases

### **Error Handling & UX**
- Loading states for long-running AI analysis
- User-friendly error messages for file validation
- Graceful degradation (if AI fails, user can still export report)

---

## 📸 Screenshots

### **1. Authentication - Login Page**
Clean, professional login interface with email/password form. Secure JWT-based authentication.

![Login Screen](docs/screenshots/01-login.png)

---

### **2. Resume Upload - Home Page**
Simple, intuitive upload form where users submit their PDF resume and target job description.

![Upload Resume](docs/screenshots/02-upload.png)

---

### **3. AI Analysis in Progress**
Smooth loading animation while Gemini AI analyzes the resume and generates insights (30-60 seconds).

![AI Processing](docs/screenshots/03-aiLoading.png)

---

### **4. User Reports History**
Dashboard showing all saved reports. Users can view past analyses and track their interview prep progress.

![Reports History](docs/screenshots/04-userReports.png)

---

### **5. Full Analysis Report**
Comprehensive report view displaying:
- Resume-to-job matching score (0-100)
- Match breakdown by category (Technical, Experience, Culture)
- Key metrics and recommendations

![Full Report](docs/screenshots/05-report-view.png)

---

### **6. Interview Questions**
Auto-generated technical and behavioral interview questions with:
- Role-specific technical challenges
- STAR-format behavioral questions
- Detailed answers for each question

![Interview Questions](docs/screenshots/06-interviewQuestions.png)

---

### **7. Preparation Plan**
Personalized 7-14 day roadmap with:
- Daily focus areas
- Actionable tasks for skill gap closure
- Progressive difficulty progression

![Preparation Plan](docs/screenshots/07-preparation_plan.png)

---

### **8. Optimized Resume**
AI-generated version of your resume tailored to the specific job description, highlighting relevant skills and experiences.

![Optimized Resume](docs/screenshots/08-optimized-resume.png)

---

## 🚀 Getting Started

### **For Users**

1. **Sign Up** — Create an account with email and password
2. **Upload Resume** — Provide your PDF resume and target job description
3. **Wait for AI Analysis** — Takes 30-60 seconds for Gemini to analyze
4. **Review Results** — See match score, questions, gaps, and prep plan
5. **Export & Prepare** — Download your personalized preparation roadmap

### **For Developers**

#### **Prerequisites**
- Node.js 18+
- MongoDB (local or Atlas cluster)
- Google Generative AI API key

#### **Quick Setup**

```bash
# Clone repository
git clone https://github.com/yourusername/resumefit-ai.git
cd ResumeFit_AI

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with:
# MONGODB_URI=your_mongodb_connection_string
# GOOGLE_API_KEY=your_google_generative_ai_key
# JWT_SECRET=your_jwt_secret

# Run development servers (frontend + backend)
npm run dev
```

**Frontend** runs at `http://localhost:5173`  
**Backend API** runs at `http://localhost:3000`

#### **API Endpoints Summary**

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/auth/register` | ❌ | Create new account |
| POST | `/api/auth/login` | ❌ | Login with credentials |
| GET | `/api/auth/logout` | ✅ | Logout & blacklist token |
| GET | `/api/auth/me` | ✅ | Get current user profile |
| POST | `/api/resume/generate-resume-fit-report` | ✅ | Upload resume & get analysis |
| GET | `/api/resume/reports` | ✅ | Get all user's reports |
| GET | `/api/resume/report/:reportId` | ✅ | Get single report |
| POST | `/api/resume/export-resume/:reportId` | ✅ | Export as PDF |

---

## 🛡️ Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumefit

# AI API
GOOGLE_API_KEY=your_google_generative_ai_api_key

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRY=1d

# Server
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

---

## 💡 Key Learnings & Technical Highlights

This project demonstrates expertise in:

✅ **Full-Stack Development** — React frontend + Node.js backend + MongoDB database  
✅ **AI Integration** — Structured prompting with Zod for reliable AI outputs  
✅ **Authentication & Security** — JWT tokens, bcryptjs hashing, token blacklist mechanism  
✅ **PDF Processing** — Text extraction and server-side PDF generation  
✅ **TypeScript** — Type-safe development across frontend and backend  
✅ **State Management** — Context API for scalable application state  
✅ **Database Design** — Complex data models with nested documents  
✅ **RESTful APIs** — Clean endpoint design with proper HTTP methods  
✅ **Error Handling** — Graceful degradation and user-friendly messages  

---

## 📄 License

This project is licensed under the **MIT License** — see the LICENSE file for details.

---

## 📧 Contact & Links

**Questions or want to discuss this project?**

📧 **Email:** girishgaba.dev@gmail.com  
🔗 **LinkedIn:** https://linkedin.com/in/girish-gaba  
🐙 **GitHub:** https://github.com/girish  

---

## 🙏 Acknowledgments

- **Google Generative AI** for powerful Gemini API
- **MongoDB** for flexible document storage
- **React & TypeScript** communities for excellent tooling
- **Open source contributors** for libraries that made this possible

---

**Made with ❤️ for job seekers everywhere. Happy interview prep! 🎯**
