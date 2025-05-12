import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/auth.css';

interface FormData {
  email: string;
  password: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
    const user = users.find(u => u.email === formData.email);
    
    if (!user) {
      setError('No account found with this email');
      return;
    }

    if (user.password !== formData.password) {
      setError('Invalid password');
      return;
    }

    const loggedInUser: Omit<User, 'password'> = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
    
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your account to continue</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="password-toggle"
                >
                  <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                </button>
              </div>

              <div className="forgot-password-container">
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-auth">
                Sign In
              </button>
            </form>

            <div className="auth-footer">
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
          </div>

          <div className="auth-image">
            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" alt="Elegant Room" />
            <div className="auth-image-overlay">
              <div className="auth-image-content">
                <h3>Find Your Perfect Space</h3>
                <p>Premium rooms designed for your comfort</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 