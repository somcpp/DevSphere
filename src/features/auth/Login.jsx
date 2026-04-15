import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Api/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from './authSlice';

const Login = ({ onSwitchToSignup }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const data = await loginUser({ email, password });
      console.log('Login Success:', data);
      dispatch(setUser(data))
      // Navigate to feed
      navigate('/feed');
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
      <p className="text-gray-500 mb-8 text-sm font-medium">
        Enter your credentials to access your nexus account.
      </p>

      {/* Social Login Buttons (UI Only for now) */}
      <div className="flex gap-4 mb-8">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-semibold text-sm text-gray-700"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
          Google
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-semibold text-sm text-gray-700"
        >
          <img src="https://www.svgrepo.com/show/394434/sso.svg" className="w-5 h-5" alt="SSO" />
          SSO
        </button>
      </div>

      <div className="relative flex items-center justify-center mb-8">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
          Or continue with email
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
            University Email
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3.5 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400"
            placeholder="name@university.edu"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1.5 ml-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
              Password
            </label>
            <span className="text-xs text-blue-600 font-bold hover:underline cursor-pointer transition">
              Forgot?
            </span>
          </div>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3.5 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600 font-medium">
        Don't have an account?
        <span
          onClick={onSwitchToSignup}
          className="text-blue-600 cursor-pointer font-bold hover:underline ml-1.5 transition"
        >
          Create Account
        </span>
      </p>
    </div>
  );
};

export default Login;