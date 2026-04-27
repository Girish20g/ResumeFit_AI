import React, { type ChangeEvent } from 'react';
import './TextArea.scss';

interface TextAreaProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  error?: string;
  disabled?: boolean;
  hint?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  rows = 6,
  error,
  disabled = false,
  hint,
}) => {
  return (
    <div className="textarea-container">
      <div className="textarea-label-row">
        <label htmlFor={name} className="textarea-label">
          {label}
        </label>
        {hint && <span className="textarea-hint">{hint}</span>}
      </div>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        className={`textarea-field${error ? ' error' : ''}`}
      />
      {error && <p className="textarea-error">{error}</p>}
    </div>
  );
};

export default TextArea;
