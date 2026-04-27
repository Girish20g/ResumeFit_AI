import React, { useState, type ChangeEvent } from 'react';
import { TextArea, FileUpload, SectionCard } from '../components';
import Button from '../../auth/components/Button';
import Navbar from '../../../components/Navbar';
import './Home.scss';

/* ── Types ─────────────────────────────────────────── */

interface HomeFormState {
  jobDescription: string;
  selfDescription: string;
}

/* ── Inline SVG icons ──────────────────────────────── */

const IconBriefcase = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const IconUser = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconPaperclip = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const IconSparkle = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

/* ── Component ─────────────────────────────────────── */

const Home: React.FC = () => {
  const [formState, setFormState] = useState<HomeFormState>({
    jobDescription: '',
    selfDescription: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleTextChange =
    (field: keyof HomeFormState) =>
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Generate Report →', {
      jobDescription: formState.jobDescription,
      selfDescription: formState.selfDescription,
      resumeFile,
    });
  };

  /* word-count helpers */
  const wordCount = (text: string) =>
    text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="home-page">
      {/* ── Navbar ───────────────────────────────────── */}
      <Navbar />

      {/* ── Scrollable main ──────────────────────────── */}
      <main className="home-main">
        {/* Hero */}
        <div className="home-hero">
          <div className="home-hero__badge">
            <IconSparkle />
            AI-Powered Match Analysis
          </div>
          <h1 className="home-hero__title">
            Generate Your CV Match Report
          </h1>
          <p className="home-hero__subtitle">
            Paste the job description, tell us about yourself, and upload
            your resume — we'll score the fit and surface what matters.
          </p>
        </div>

        {/* Form */}
        <form
          id="home-generate-form"
          className="home-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="home-form__grid">
            {/* ── Left column: Job Description ─────── */}
            <SectionCard
              title="Job Description"
              subtitle="Paste the full job posting or requirements"
              icon={<IconBriefcase />}
              className="home-form__card--tall"
            >
              <TextArea
                name="jobDescription"
                label=""
                placeholder="Paste the job description here… include role responsibilities, required skills, and qualifications."
                value={formState.jobDescription}
                onChange={handleTextChange('jobDescription')}
                rows={14}
                hint={`${wordCount(formState.jobDescription)} words`}
              />
            </SectionCard>

            {/* ── Right column: Self-description + File ─ */}
            <div className="home-form__right-col">
              <SectionCard
                title="About Yourself"
                subtitle="Describe your background, skills, and experience"
                icon={<IconUser />}
              >
                <TextArea
                  name="selfDescription"
                  label=""
                  placeholder="Briefly describe your professional background, key skills, notable projects, and what makes you a strong candidate…"
                  value={formState.selfDescription}
                  onChange={handleTextChange('selfDescription')}
                  rows={7}
                  hint={`${wordCount(formState.selfDescription)} words`}
                />
              </SectionCard>

              <SectionCard
                title="Upload Resume"
                subtitle="Attach your CV for deeper analysis"
                icon={<IconPaperclip />}
              >
                <FileUpload
                  name="resumeFile"
                  label=""
                  selectedFile={resumeFile}
                  onFileChange={setResumeFile}
                  hint="PDF only"
                />
              </SectionCard>
            </div>
          </div>

          {/* ── CTA ───────────────────────────────────── */}
          <div className="home-form__actions">
            <Button type="submit" variant="primary">
              <IconSparkle />
              Generate Match Report
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
