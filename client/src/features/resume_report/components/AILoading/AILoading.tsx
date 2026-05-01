import React, { useEffect, useState } from 'react';
import './AILoading.scss';

const loadingTexts = [
  "Initializing AI Engine...",
  "Parsing Job Description...",
  "Analyzing Your Profile...",
  "Extracting Key Skills...",
  "Comparing Match Points...",
  "Generating Interview Questions...",
  "Finalizing Your Report...",
];

const IconSparkle = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ai-loading__icon-svg"
  >
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

const AILoading: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ai-loading-overlay">
      <div className="ai-loading-container">
        <div className="ai-loading__spinner">
          <div className="ai-loading__spinner-ring"></div>
          <div className="ai-loading__spinner-ring"></div>
          <div className="ai-loading__spinner-icon">
            <IconSparkle />
          </div>
        </div>
        
        <h3 className="ai-loading__title">Gen AI is Analyzing</h3>
        
        <div className="ai-loading__text-container">
          <p className="ai-loading__text" key={textIndex}>
            {loadingTexts[textIndex]}
          </p>
        </div>

        <div className="ai-loading__progress">
          <div className="ai-loading__progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default AILoading;
