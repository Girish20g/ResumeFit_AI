import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useResumeReport } from '../../features/resume_report/hooks/useResumeReport';
import ReportsModal from '../../features/resume_report/components/ReportsModal';
import './Navbar.scss';
import { Link } from 'react-router';
import { Briefcase } from 'lucide-react';

const IconSun = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const IconMoon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const IconLogout = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, handleLogout } = useAuth();
  const { 
    userReports, 
    loading, 
    handleGetMyResumeReports, 
    handleDeleteReport, 
    handleExportReport,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  } = useResumeReport();
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <Link to="/" className="navbar__brand">
          <div className="navbar__logo-mark" aria-hidden="true" />
          <span className="navbar__logo-text">ResumeFit AI</span>
        </Link>
        
        <div className="navbar__actions">
          {user && (
            <button
              className="navbar__icon-btn navbar__reports-btn"
              onClick={() => setIsReportsModalOpen(true)}
              title="My Reports"
              aria-label="My Reports"
            >
              <Briefcase size={20} />
              {userReports.length > 0 && (
                <span className="navbar__reports-badge">{userReports.length}</span>
              )}
            </button>
          )}
          
          <button 
            className="navbar__icon-btn" 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          
          {user ? (
            <div className="navbar__user-menu">
              <div className="navbar__profile">
                <IconUser />
                <span className="navbar__username">{user.username || user.email?.split('@')[0]}</span>
              </div>
              <button 
                className="navbar__logout-btn" 
                onClick={handleLogout}
                title="Logout"
              >
                <IconLogout />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="navbar__login-link">
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Reports Modal */}
      <ReportsModal
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
        reports={userReports}
        loading={loading}
        onFetchReports={handleGetMyResumeReports}
        onDeleteReport={handleDeleteReport}
        onExportReport={handleExportReport}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </>
  );
};

export default Navbar;
