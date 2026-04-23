import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OnboardingContainer from './features/onboarding/OnBoardingContainer';
import FeedPage from './features/feed/FeedPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AuthPage from './features/auth/AuthPage';
import ViewProfilePage from './features/viewProfile/ViewProfilePage';
import ConnectionsPage from './features/connections/ConnectionsPage';
import MyConnectionsPage from './features/connections/pages/MyConnectionsPage';
import IncomingRequestPage from './features/connections/pages/IncomingRequestPage';
import OutgoingRequestPage from './features/connections/pages/OutgoingRequestPage';
import MyProfilePage from './features/profile/MyProfilePage';
import ProtectedRoute from './features/RoutingProtection/ProtectedRoute';
import { restoreAuth } from './features/auth/authSlice';

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
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Restore auth state from localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(restoreAuth({ token, user }));
      } catch (error) {
        console.error('Failed to restore auth:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    
    // Done checking auth
    setIsCheckingAuth(false);
  }, [dispatch]);

  // Show loading screen while checking auth
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
          <ProtectedRoute>
            <MainLayout>
              <FeedPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/view/:id'
        element={
          <ProtectedRoute>
            <MainLayout>
              <ViewProfilePage/>
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/connections"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ConnectionsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/connections/my"
        element={
          <ProtectedRoute>
            <MainLayout>
              <MyConnectionsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/connections/incoming"
        element={
          <ProtectedRoute>
            <MainLayout>
              <IncomingRequestPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/connections/outgoing"
        element={
          <ProtectedRoute>
            <MainLayout>
              <OutgoingRequestPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <MyProfilePage/>
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <MainLayout>
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-2">Settings page coming soon...</p>
              </div>
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/support"
        element={
          <ProtectedRoute>
            <MainLayout>
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900">Support</h1>
                <p className="text-gray-600 mt-2">Support page coming soon...</p>
              </div>
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;