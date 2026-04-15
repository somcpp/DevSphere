import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OnboardingContainer from './features/onboarding/OnBoardingContainer';
import FeedPage from './features/feed/FeedPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AuthPage from './features/auth/AuthPage';
import ViewProfilePage from './features/viewProfile/ViewProfilePage';
import ConnectionsPage from './features/connections/ConnectionsPage';

// Layout component for main app pages
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Auth Routes - No Header/Sidebar */}
      <Route path="/" element={<Navigate to="/feed" />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/onboarding" element={<OnboardingContainer />} />

      {/* Main App Routes - With Header/Sidebar */}
      <Route
        path="/feed"
        element={
          <MainLayout>
            <FeedPage />
          </MainLayout>
        }
      />

      <Route
        path='/view/:id'
        element={
          <MainLayout>
            <ViewProfilePage/>
          </MainLayout>
        }
      />

      <Route
        path="/connections"
        element={
          <MainLayout>
           <ConnectionsPage/>
          </MainLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <MainLayout>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-2">Profile page coming soon...</p>
            </div>
          </MainLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <MainLayout>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-2">Settings page coming soon...</p>
            </div>
          </MainLayout>
        }
      />

      <Route
        path="/support"
        element={
          <MainLayout>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900">Support</h1>
              <p className="text-gray-600 mt-2">Support page coming soon...</p>
            </div>
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;