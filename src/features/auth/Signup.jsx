import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../Api/authApi';
import { setUser } from '../auth/authSlice';

const Signup = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.firstName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Call signup API
      const response = await signupUser(formData);
      console.log('Signup Success:', response);

      // Store user in Redux after successful signup
      dispatch(setUser(response));

      // Navigate to onboarding
      navigate('/onboarding');
    } catch (err) {
      console.error('Signup Error:', err);
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
      <p className="text-gray-500 mb-8 text-sm font-medium">
        Join Campus Nexus and start building your network.
      </p>

      {/* Social Signup Buttons (UI Only for now) */}
      <div className="flex gap-4 mb-8">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-semibold text-sm text-gray-700"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-5 h-5"
            alt="Google"
          />
          Google
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-semibold text-sm text-gray-700"
        >
          <img
            src="https://www.svgrepo.com/show/394434/sso.svg"
            className="w-5 h-5"
            alt="SSO"
          />
          SSO
        </button>
      </div>

      <div className="relative flex items-center justify-center mb-8">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
          Or sign up with email
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
              First Name
            </label>
            <input
              required
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3.5 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400"
              placeholder="John"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3.5 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
            University Email
          </label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3.5 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400"
            placeholder="name@university.edu"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
            Password
          </label>
          <input
            required
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3.5 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <span
          onClick={onSwitchToLogin}
          className="text-blue-600 cursor-pointer font-semibold hover:underline transition"
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

export default Signup;
