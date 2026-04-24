import React, { type ChangeEvent, type FocusEvent, useState } from 'react';
import './FormInput.scss';

interface FormInputProps {
  type: 'email' | 'password' | 'text';
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  label: string;
  name: string;
  disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  label,
  name,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const inputType = isPasswordField && showPassword ? 'text' : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="form-input-container">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-wrapper">
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`form-input ${error ? 'error' : ''}`}
          disabled={disabled}
          name={name}
          required
        />
        {isPasswordField && (
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
        {error && !isPasswordField && <span className="error-icon">⚠</span>}
        {error && isPasswordField && <span className="error-icon error-icon-with-toggle">⚠</span>}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FormInput;
