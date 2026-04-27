import React, { type ReactNode } from 'react';
import './SectionCard.scss';

interface SectionCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  children,
  title,
  subtitle,
  icon,
  className = '',
}) => {
  return (
    <div className={`section-card ${className}`.trim()}>
      {(title || subtitle) && (
        <div className="section-card__header">
          {icon && <div className="section-card__icon">{icon}</div>}
          <div className="section-card__heading">
            {title && <h2 className="section-card__title">{title}</h2>}
            {subtitle && (
              <p className="section-card__subtitle">{subtitle}</p>
            )}
          </div>
        </div>
      )}
      <div className="section-card__body">{children}</div>
    </div>
  );
};

export default SectionCard;
