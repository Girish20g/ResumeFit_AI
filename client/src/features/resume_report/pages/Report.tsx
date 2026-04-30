import React, { useState } from 'react';
import { useParams } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  ChevronDown,
  Target,
  MessageSquare,
  Cpu,
  Calendar,
  CheckSquare
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import { mockReportData } from '../mockReportData';
import './Report.scss';

// Type definitions matching our schema
type Question = {
  question: string;
  intention: string;
  answer: string;
};

type SkillGap = {
  skill: string;
  severity: "Low" | "Medium" | "High";
  reason: string;
};

type PreparationPlan = {
  day: number;
  focus: string;
  tasks: string[];
};

const Report: React.FC = () => {
  const { id } = useParams();
  const report = mockReportData;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="report-page">
      <Navbar />

      <main className="report-page__main">
        <motion.div
          className="report-page__container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* ── Hero Section (Score & Title) ──────── */}
          <motion.section className="report-page__hero" variants={itemVariants}>
            <div className="report-page__score-container">
              <svg className="report-page__score-circle" viewBox="0 0 100 100">
                <circle className="bg" cx="50" cy="50" r="45" />
                <motion.circle
                  className="progress"
                  cx="50" cy="50" r="45"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * report.matchScore) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
              </svg>
              <div className="report-page__score-text">
                <motion.span
                  className="value"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {report.matchScore}%
                </motion.span>
                <span className="label">Match</span>
              </div>
            </div>

            <div className="report-page__hero-content">
              <motion.h1
                className="report-page__title"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {report.title}
              </motion.h1>
              <p className="report-page__subtitle">
                Based on our deep analysis, here is how well your profile aligns with the target role, along with actionable insights to help you prepare.
              </p>
            </div>
          </motion.section>

          {/* ── Skill Gaps ───────────────────────── */}
          <motion.section variants={itemVariants}>
            <h2 className="report-page__section-header">
              <Target size={28} />
              Identified Skill Gaps
            </h2>
            <div className="report-page__gaps-grid">
              {report.skillGaps.map((gap, idx) => (
                <SkillGapCard key={idx} gap={gap} />
              ))}
            </div>
          </motion.section>

          {/* ── Technical Questions ──────────────── */}
          <motion.section variants={itemVariants}>
            <h2 className="report-page__section-header">
              <Cpu size={28} />
              Technical Interview Questions
            </h2>
            <div className="report-page__questions-list">
              {report.technicalQuestions.map((q, idx) => (
                <QuestionAccordion key={idx} question={q} />
              ))}
            </div>
          </motion.section>

          {/* ── Behavioral Questions ─────────────── */}
          <motion.section variants={itemVariants}>
            <h2 className="report-page__section-header">
              <MessageSquare size={28} />
              Behavioral Interview Questions
            </h2>
            <div className="report-page__questions-list">
              {report.behavioralQuestions.map((q, idx) => (
                <QuestionAccordion key={idx} question={q} />
              ))}
            </div>
          </motion.section>

          {/* ── Preparation Plan ─────────────────── */}
          <motion.section variants={itemVariants}>
            <h2 className="report-page__section-header">
              <Calendar size={28} />
              Preparation Action Plan
            </h2>
            <div className="report-page__timeline">
              {report.preparationPlan.map((plan, idx) => (
                <TimelineItem key={idx} plan={plan} />
              ))}
            </div>
          </motion.section>

        </motion.div>
      </main>
    </div>
  );
};

/* ── Subcomponents ─────────────────────────────────── */

const SkillGapCard = ({ gap }: { gap: SkillGap }) => {
  const getSeverityIcon = () => {
    switch (gap.severity) {
      case 'High': return <AlertTriangle size={18} />;
      case 'Medium': return <AlertCircle size={18} />;
      case 'Low': return <CheckCircle size={18} />;
      default: return null;
    }
  };

  return (
    <motion.div
      className="report-page__gap-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="header">
        <h3>{gap.skill}</h3>
        <span className={`badge badge--${gap.severity.toLowerCase()}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {getSeverityIcon()}
          {gap.severity} Priority
        </span>
      </div>
      <p>{gap.reason}</p>
    </motion.div>
  );
};

const QuestionAccordion = ({ question }: { question: Question }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`report-page__question-card ${isOpen ? 'open' : ''}`}>
      <button
        className="q-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question.question}</span>
        <ChevronDown size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="q-content-wrapper"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="q-content">
              <div className="intention">
                <Target size={18} />
                <div>
                  <strong>Why they ask this:</strong>
                  <p>{question.intention}</p>
                </div>
              </div>
              <div className="answer">
                <CheckCircle size={18} />
                <div>
                  <strong>How to answer:</strong>
                  <p>{question.answer}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TimelineItem = ({ plan }: { plan: PreparationPlan }) => {
  return (
    <motion.div
      className="report-page__timeline-item"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="dot"></div>
      <div className="content">
        <h4>
          <span className="day">Day {plan.day}</span>
          {plan.focus}
        </h4>
        <ul>
          {plan.tasks.map((task, idx) => (
            <li key={idx}>
              <CheckSquare size={16} />
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Report;
