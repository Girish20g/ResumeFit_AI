import React, { type ReactNode } from 'react';
import './Button.scss';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full-width' : ''} ${loading ? 'btn-loading' : ''}`}
    >
      {loading ? <span className="spinner"></span> : children}
    </button>
  );
};

export default Button;
