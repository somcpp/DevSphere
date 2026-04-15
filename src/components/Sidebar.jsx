import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIncomingRequests } from '../features/connections/connectionsSlice';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const incomingRequests = useSelector(selectIncomingRequests);
  const hasPendingRequests = incomingRequests.length > 0;

  const menuItems = [
    {
      icon: '🔍',
      label: 'DISCOVERY',
      path: '/feed',
    },
    {
      icon: '🤝',
      label: 'MY CONNECTIONS',
      path: '/connections',
      showDot: hasPendingRequests,
    },
    {
      icon: '👤',
      label: 'PROFILE',
      path: '/profile',
    },
    {
      icon: '⚙️',
      label: 'SETTINGS',
      path: '/settings',
    },
    {
      icon: '💬',
      label: 'SUPPORT',
      path: '/support',
    },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 min-h-screen flex flex-col transition-all duration-300 sticky top-0`}>
      
      {/* Toggle Collapse Button */}
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Main Menu Items */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            title={collapsed ? item.label : ''}
          >
            {/* Icon with red dot */}
            <span className="relative text-xl flex-shrink-0">
              {item.icon}
              {item.showDot && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              )}
            </span>

            {!collapsed && (
              <span className="text-sm font-semibold">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

    </aside>
  );
};

export default Sidebar;