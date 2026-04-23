import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch, selectSearch } from '../features/header/headerSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Get user info from auth state
  const user = useSelector((state) => state.auth?.user);
  // Get search query from header state
  const searchQuery = useSelector(selectSearch);

  const handleLogout = () => {
    // Clear auth state and navigate to login
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/feed')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-lg font-bold text-gray-900">DevSphere</span>
            <span className="text-xs text-gray-500 ml-2">COLLABORATIVE SPACE</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, project, or role..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <svg
                className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
                  <h3 className="font-bold text-gray-900 mb-3">Notifications</h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <p className="text-sm text-gray-700">New connection request from Sarah</p>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            

            {/* User Dropdown */}
            <div className="relative ml-4">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <img
                  src={user?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-blue-500"
                />
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  <button
                    onClick={() => navigate('/profile')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Profile
                  </button>
                  
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;