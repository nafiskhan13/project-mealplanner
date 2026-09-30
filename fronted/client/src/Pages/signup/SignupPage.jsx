import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TiSocialFacebookCircular, TiSocialGooglePlus, TiSocialLinkedin } from "react-icons/ti";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Min 8 characters';
    else if (!/[A-Z]/.test(formData.password)) newErrors.password = 'At least one uppercase letter';
    else if (!/[a-z]/.test(formData.password)) newErrors.password = 'At least one lowercase letter';
    else if (!/\d/.test(formData.password)) newErrors.password = 'At least one number';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    try {
      await axios.post('https://mealplannerserverside.onrender.com/api/v1/users/register', {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password
      });
      setSuccessMessage('Registration successful! Please verify your email.');
      setShowVerifyModal(true);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) setErrors({ email: err.response.data.error });
        else setErrors({ form: err.response.data.error || 'Registration failed' });
      } else if (err.request) {
        setErrors({ form: 'No response from server' });
      } else {
        setErrors({ form: 'Error submitting form' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-white px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center animate-pulse">
            {successMessage}
          </div>
        )}

        {errors.form && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {[
            { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
            { id: 'username', label: 'Username', type: 'text', placeholder: 'johndoe' },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border rounded-lg font-medium focus:outline-none text-black focus:ring-2 transition ${errors[id] ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
                  }`}
              />
              {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
            </div>
          ))}

          {['password', 'confirmPassword'].map((id) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {id === 'password' ? 'Password' : 'Confirm Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={id === 'password' ? '********' : 'Re-enter your password'}
                  className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition ${errors[id] ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 text-xs"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#89ce00] text-black py-2 rounded-lg hover:bg-[#5ba300] transition active:scale-95 ${isLoading ? 'opacity-70 cursor-pointer' : 'cursor-pointer'
              }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <div>
          <p className="text-center text-gray-500 text-sm mb-2">Or sign up with</p>
          <div className="flex justify-center gap-4 mt-6 ">
            <button
              aria-label="Continue with Facebook"
              className="text-blue-600 hover:text-white hover:bg-blue-600 p-2 rounded-full transition shadow hover:scale-110 active:scale-95"
            >
              <TiSocialFacebookCircular className="text-4xl cursor-pointer" />
            </button>
            <button
              aria-label="Continue with Google"
              className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-full transition shadow hover:scale-110 active:scale-95"
            >
              <TiSocialGooglePlus className="text-4xl cursor-pointer" />
            </button>
            <button
              aria-label="Continue with LinkedIn"
              className="text-blue-700 hover:text-white hover:bg-blue-700 p-2 rounded-full transition shadow hover:scale-110 active:scale-95"
            >
              <TiSocialLinkedin className="text-4xl cursor-pointer" />
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>


      {showVerifyModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm transform transition-transform scale-95 animate-enter">
            <h3 className="text-lg font-bold text-black text-center mb-3">Verify Your Email ✉️</h3>
            <p className="text-sm text-center text-black mb-4">Please check your email and enter the 6-digit verification code:</p>
            <input
              type="text"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="123456"
              className="w-full text-black px-4 py-2 border rounded-lg mb-3 text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {verifyError && <p className="text-red-500 text-center text-sm mb-2">{verifyError}</p>}

            <button
              onClick={async () => {
                setVerifyLoading(true);
                setVerifyError('');
                try {
                  await axios.post('https://mealplannerserverside.onrender.com/api/v1/users/verify-email', {
                    email: formData.email,
                    code: verificationCode
                  });
                  setSuccessMessage('✅ Email verified! Redirecting...');
                  setTimeout(() => navigate('/login'), 2000);
                } catch (err) {
                  setVerifyError(err.response?.data?.error || 'Invalid or expired code.');
                } finally {
                  setVerifyLoading(false);
                }
              }}
              disabled={verifyLoading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition active:scale-95 disabled:opacity-60"
            >
              {verifyLoading ? 'Verifying...' : 'Verify'}
            </button>

            <button
              onClick={() => setShowVerifyModal(false)}
              className="w-full mt-2 text-sm text-gray-500 hover:underline text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
