import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleInterest, updateFormData, setStep, resetOnboarding } from './onboardingSlice';
import { setUser } from '../auth/authSlice';
import { updateUserProfile } from '../../Api/profileApi';


const interests = [
  'Tech & Innovation',
  'Venture Building',
  'Startups',
  'AI & Machine Learning',
  'Web Development',
  'Mobile Development',
  'Blockchain',
  'Cloud Computing',
  'DevOps',
  'Design',
  'Product Management',
  'Data Science',
];

const Step4_Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formData = useSelector((state) => state.onboarding.formData);
  const { interests: selectedInterests, location, phone, linkedin, github, twitter } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleToggleInterest = (interest) => {
    dispatch(toggleInterest(interest));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!location || !phone) {
      alert('Please fill in location and phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send only onboarding data to API
      const profileData = {
        skills: formData.skills,
        institution: formData.institution,
        major: formData.major,
        about: formData.about,
        photoURL: formData.photoURL,
        gender: formData.gender,
        experience: formData.experience,
        location: formData.location,
        phone: formData.phone,
        linkedin: formData.linkedin,
        github: formData.github,
        twitter: formData.twitter,
        interests: selectedInterests,
      };

      console.log('Submitting profile data:', profileData);

      // Call the update API
      const response = await updateUserProfile(profileData);
      console.log('Profile saved, user object:', response);

      // Store complete user object in Redux
      dispatch(setUser(response));

      // Reset onboarding state
      dispatch(resetOnboarding());

      // Navigate to feed
      navigate('/feed');
    } catch (error) {
      console.error('Profile save error:', error);
      alert('Failed to save profile: ' + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    dispatch(setStep(3));
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact & Social</h2>
        <p className="text-gray-500 text-sm font-medium">
          Add your contact information and social profiles so others can reach you.
        </p>

        {/* Progress Bar */}
        <div className="mt-6 flex items-center gap-2">
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <span className="text-xs font-bold text-gray-500 ml-2">Step 4 of 4</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Location *
          </label>
          <input
            required
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="City, Country"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Phone Number *
          </label>
          <input
            required
            type="tel"
            name="phone"
            value={phone}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Social Profiles (Optional)</h3>
          
          {/* LinkedIn */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="linkedin"
              value={linkedin}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              GitHub Profile
            </label>
            <input
              type="url"
              name="github"
              value={github}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="https://github.com/yourprofile"
            />
          </div>

          {/* Twitter */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Twitter/X Profile
            </label>
            <input
              type="url"
              name="twitter"
              value={twitter}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="https://twitter.com/yourprofile"
            />
          </div>
        </div>

        {/* Interests Selection */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Interests</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {interests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => handleToggleInterest(interest)}
                className={`p-3 rounded-lg font-semibold text-sm transition-all border-2 ${
                  selectedInterests.includes(interest)
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-500 hover:text-blue-600'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-bold text-blue-900 mb-2">Profile Summary</h4>
          <p className="text-xs text-blue-700">
            <strong>Location:</strong> {location || 'Not specified'}
          </p>
          <p className="text-xs text-blue-700 mt-1">
            <strong>Interests:</strong> {selectedInterests.length > 0 ? selectedInterests.slice(0, 3).join(', ') : 'None selected'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-6">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/25"
          >
            {isSubmitting ? 'Creating Profile...' : 'Complete Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4_Contact;
