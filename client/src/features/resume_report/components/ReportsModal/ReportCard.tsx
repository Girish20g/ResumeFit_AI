import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, Download, Trash2, Eye, FileJson, File } from 'lucide-react';
import './ReportCard.scss';

interface ReportCardProps {
  report: {
    _id: string;
    title: string;
    matchScore: number;
    createdAt: string;
  };
  onView: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

const ReportCard: React.FC<ReportCardProps> = ({
  report,
  onView,
  onDelete,
  isDeleting,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  // Get score label
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Needs Work';
  };

  return (
    <div className="report-card">
      <div className="report-card__header">
        <div className="report-card__title-section">
          <h3 className="report-card__title">{report.title}</h3>
          <p className="report-card__date">{formatDate(report.createdAt)}</p>
        </div>

        <div className="report-card__score-container">
          <svg
            className="report-card__score-ring"
            viewBox="0 0 36 36"
            width="50"
            height="50"
          >
            <circle
              className="report-card__score-ring-bg"
              cx="18"
              cy="18"
              r="16"
            />
            <motion.circle
              className="report-card__score-ring-progress"
              cx="18"
              cy="18"
              r="16"
              initial={{ strokeDashoffset: 100.53 }}
              animate={{ strokeDashoffset: 100.53 - (100.53 * report.matchScore) / 100 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ stroke: getScoreColor(report.matchScore) }}
            />
          </svg>
          <div className="report-card__score-text">
            <span className="report-card__score-value">{report.matchScore}</span>
            <span className="report-card__score-label">%</span>
          </div>
        </div>
      </div>

      <div className="report-card__footer">
        <span className="report-card__badge" style={{ color: getScoreColor(report.matchScore) }}>
          {getScoreLabel(report.matchScore)}
        </span>

        <div className="report-card__actions">
          <button
            className="report-card__action-btn report-card__action-btn--view"
            onClick={onView}
            title="View Report"
          >
            <Eye size={16} />
          </button>

          <div className="report-card__menu">
            <button
              className="report-card__action-btn report-card__action-btn--menu"
              onClick={() => setShowMenu(!showMenu)}
              title="More options"
            >
              <MoreVertical size={16} />
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  className="report-card__menu-dropdown"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="report-card__menu-item report-card__menu-item--delete"
                    onClick={() => {
                      onDelete();
                      setShowMenu(false);
                    }}
                    disabled={isDeleting}
                  >
                    <Trash2 size={14} />
                    <span>{isDeleting ? 'Deleting...' : 'Delete Report'}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
