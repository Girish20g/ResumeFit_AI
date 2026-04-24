import React, { type ReactNode } from 'react';
import './FormContainer.scss';

interface FormContainerProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  subtitle?: string;
  footerText?: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  onSubmit,
  title,
  subtitle,
  footerText,
}) => {
  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">{title}</h1>
          {subtitle && <p className="form-subtitle">{subtitle}</p>}
        </div>

        <form onSubmit={onSubmit} className="form-body">
          {children}
        </form>

        {footerText && <div className="form-footer">{footerText}</div>}
      </div>
    </div>
  );
};

export default FormContainer;
