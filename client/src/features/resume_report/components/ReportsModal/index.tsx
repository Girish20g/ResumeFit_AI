import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ChevronDown } from 'lucide-react';
import ReportCard from './ReportCard';
import './ReportsModal.scss';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reports: any[];
  loading: boolean;
  onFetchReports: () => Promise<any[]>;
  onDeleteReport: (reportId: string) => Promise<boolean>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'newest' | 'score' | 'oldest';
  onSortChange: (sort: 'newest' | 'score' | 'oldest') => void;
}

const ReportsModal: React.FC<ReportsModalProps> = ({
  isOpen,
  onClose,
  reports,
  loading,
  onFetchReports,
  onDeleteReport,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [sortDropdown, setSortDropdown] = useState(false);

  // Fetch reports when modal opens
  useEffect(() => {
    if (isOpen && reports.length === 0) {
      onFetchReports();
    }
  }, [isOpen]);

  // Filter and sort reports
  const filteredReports = useMemo(() => {
    let filtered = reports.filter(report =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort reports
    switch (sortBy) {
      case 'score':
        return filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'newest':
      default:
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [reports, searchQuery, sortBy]);

  const handleViewReport = (reportId: string) => {
    onClose();
    navigate(`/report/${reportId}`);
  };

  const handleDeleteClick = async (reportId: string) => {
    const success = await onDeleteReport(reportId);
    if (success) {
      setDeleteConfirm(null);
    }
  };



  // Modal animations
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const drawerVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="reports-modal__backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="reports-modal__drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="reports-modal__header">
              <div className="reports-modal__title-section">
                <h2 className="reports-modal__title">My Reports</h2>
                <span className="reports-modal__count">{filteredReports.length}</span>
              </div>
              <button
                className="reports-modal__close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Controls */}
            <div className="reports-modal__controls">
              {/* Search */}
              <div className="reports-modal__search">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search reports by title..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="reports-modal__search-input"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="reports-modal__sort">
                <button
                  className="reports-modal__sort-btn"
                  onClick={() => setSortDropdown(!sortDropdown)}
                >
                  <span>
                    {sortBy === 'newest' && 'Newest First'}
                    {sortBy === 'score' && 'Highest Score'}
                    {sortBy === 'oldest' && 'Oldest First'}
                  </span>
                  <ChevronDown size={18} />
                </button>

                {sortDropdown && (
                  <motion.div
                    className="reports-modal__sort-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <button
                      className={`reports-modal__sort-item ${sortBy === 'newest' ? 'active' : ''}`}
                      onClick={() => {
                        onSortChange('newest');
                        setSortDropdown(false);
                      }}
                    >
                      Newest First
                    </button>
                    <button
                      className={`reports-modal__sort-item ${sortBy === 'score' ? 'active' : ''}`}
                      onClick={() => {
                        onSortChange('score');
                        setSortDropdown(false);
                      }}
                    >
                      Highest Score
                    </button>
                    <button
                      className={`reports-modal__sort-item ${sortBy === 'oldest' ? 'active' : ''}`}
                      onClick={() => {
                        onSortChange('oldest');
                        setSortDropdown(false);
                      }}
                    >
                      Oldest First
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="reports-modal__content">
              {loading ? (
                <div className="reports-modal__loading">
                  <div className="reports-modal__spinner" />
                  <p>Loading your reports...</p>
                </div>
              ) : filteredReports.length === 0 ? (
                <div className="reports-modal__empty">
                  <div className="reports-modal__empty-icon">📄</div>
                  <h3>No Reports Found</h3>
                  <p>
                    {searchQuery
                      ? 'Try adjusting your search criteria'
                      : 'Generate your first resume fit report to get started'}
                  </p>
                </div>
              ) : (
                <motion.div
                  className="reports-modal__grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredReports.map((report) => (
                    <motion.div key={report._id} variants={cardVariants}>
                      <ReportCard
                        report={report}
                        onView={() => handleViewReport(report._id)}
                        onDelete={() => setDeleteConfirm(report._id)}
                        isDeleting={deleteConfirm === report._id}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Delete Confirmation Dialog */}
            <AnimatePresence>
              {deleteConfirm && (
                <motion.div
                  className="reports-modal__confirm-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setDeleteConfirm(null)}
                >
                  <motion.div
                    className="reports-modal__confirm-dialog"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3>Delete Report?</h3>
                    <p>This action cannot be undone. Are you sure you want to delete this report?</p>
                    <div className="reports-modal__confirm-buttons">
                      <button
                        className="reports-modal__confirm-cancel"
                        onClick={() => setDeleteConfirm(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="reports-modal__confirm-delete"
                        onClick={() => handleDeleteClick(deleteConfirm)}
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReportsModal;
