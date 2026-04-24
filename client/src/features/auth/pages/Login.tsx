import React, { useState, type ChangeEvent, type FocusEvent } from 'react';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import './Login.scss';
import { Link, useNavigate } from 'react-router';
import loginBg from "../../../assets/login_background.svg";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface TouchedFields {
  email: boolean;
  password: boolean;
}

const Login: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    password: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Email validation regex - RFC 5322 simplified
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation rules
  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return undefined;
  };

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle field blur - validate on blur
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = formState[name as keyof FormState];

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    let error: string | undefined;

    if (name === 'email') {
      error = validateEmail(value);
    } else if (name === 'password') {
      error = validatePassword(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Validate all fields before submission
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailError = validateEmail(formState.email);
    const passwordError = validatePassword(formState.password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      console.log('Form submitted with:', {
        email: formState.email,
        password: formState.password,
      });

      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Handle login response and redirect
      console.log('Login successful');

      // Reset form on success (optional)
      setFormState({ email: '', password: '' });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const footerContent = (
    <p>
      Don't have an account?{' '}
      <Link to={"/register"}>Sign up here</Link>
    </p>
  );

  return (
    <div className="auth-page">
      <div className="auth-background">
        <img src={loginBg} alt="" aria-hidden="true" />
      </div>
      <div className="login-content">
        <div className="app-header">
          <h1 className="app-title">ResumeFit AI</h1>
          <p className="app-tagline">Master Your Interview • Perfect Your Resume</p>
        </div>
        <FormContainer
          title="Welcome Back"
          subtitle="Enter your credentials to access your account"
          onSubmit={handleSubmit}
          footerText={footerContent}
        >
          <FormInput
            type="email"
            name="email"
            label="Email Address"
            placeholder="you@example.com"
            value={formState.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : undefined}
          />

          <FormInput
            type="password"
            name="password"
            label="Password"
            placeholder="••••••••"
            value={formState.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={touched.password ? errors.password : undefined}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </FormContainer>
      </div>
    </div>
  );
};

export default Login;