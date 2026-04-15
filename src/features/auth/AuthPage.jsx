import React, { useState } from 'react';
import AuthSidebar from '../../components/AuthSidebar';
import Login from './Login';
import Signup from './Signup';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Component - AuthLayout/Sidebar */}
      <AuthSidebar />

      {/* Right Side - Forms */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          {isLogin ? (
            <Login onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <Signup onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;