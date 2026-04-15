import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Step1_Skills from './Step1_Skills';
import Step2_Bio from './Step2_Bio';
import Step3_Experience from './Step3_Experience';
import Step4_Contact from './Step4_Contact';
import { resetOnboarding } from './onboardingSlice';

const OnboardingContainer = () => {

  const navigate = useNavigate();
  const step = useSelector((state) => state.onboarding.step);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Check if user is authenticated, if not redirect to auth
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1_Skills />;
      case 2:
        return <Step2_Bio />;
      case 3:
        return <Step3_Experience />;
      case 4:
        return <Step4_Contact />;
      default:
        return <Step1_Skills />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Design/Branding */}
      <div className="hidden lg:flex flex-[1.2] flex-col justify-center p-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="space-y-8 max-w-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-200">
            Campus Nexus
          </p>
          <h1 className="text-5xl font-extrabold leading-tight">
            Complete Your Profile
          </h1>
          <p className="text-blue-100 text-lg">
            Tell us about yourself so we can help you find the perfect co-founders and collaborators.
          </p>
          <div className="pt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <p className="font-bold">Share Your Skills</p>
                <p className="text-sm text-blue-100">Let others know what you're good at</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <p className="font-bold">Tell Your Story</p>
                <p className="text-sm text-blue-100">Help the community understand your background</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <p className="font-bold">Share Your Experience</p>
                <p className="text-sm text-blue-100">Highlight your professional achievements</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <p className="font-bold">Find Your People</p>
                <p className="text-sm text-blue-100">Connect with like-minded students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingContainer;