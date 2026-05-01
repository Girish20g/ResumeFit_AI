import React, { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { TextArea, FileUpload, SectionCard, AILoading } from '../components';
import Button from '../../auth/components/Button';
import Navbar from '../../../components/Navbar';
import './Home.scss';
import { useResumeReport } from '../hooks/useResumeReport';

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
  const navigate = useNavigate();
  const { loading, error, handleGenerateResumeFitReport } = useResumeReport();
  const [formState, setFormState] = useState<HomeFormState>({
    jobDescription: '',
    selfDescription: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string>('');

  const handleTextChange =
    (field: keyof HomeFormState) =>
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormState((prev) => ({ ...prev, [field]: e.target.value }));
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!formState.jobDescription.trim()) {
      setValidationError('Job description is required.');
      return;
    }

    if (!formState.selfDescription.trim() && !resumeFile) {
      setValidationError('Please provide either a self description or upload your resume.');
      return;
    }

    const report = await handleGenerateResumeFitReport({
      jobDescription: formState.jobDescription,
      selfDescription: formState.selfDescription,
      resumeFile: resumeFile,
    });

    if (report && report._id) {
      console.log(report);
      navigate(`/report/${report._id}`);
    }
  };

  /* word-count helpers */
  const wordCount = (text: string) =>
    text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="home-page">
      {loading && <AILoading />}
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

        {validationError && (
          <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '1.5rem', textAlign: 'center', maxWidth: '1100px', margin: '0 auto 1.5rem auto' }}>
            {validationError}
          </div>
        )}

        {error && (
          <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '1.5rem', textAlign: 'center', maxWidth: '1100px', margin: '0 auto 1.5rem auto' }}>
            An error occurred while generating the report. Please try again.
          </div>
        )}

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
