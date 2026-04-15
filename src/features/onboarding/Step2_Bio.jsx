import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, setStep } from './onboardingSlice';

const Step2_Bio = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.onboarding.formData);
  const { institution, major, about, gender, photoURL } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (institution && major && about) {
      dispatch(setStep(3));
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleBack = () => {
    dispatch(setStep(1));
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Yourself</h2>
        <p className="text-gray-500 text-sm font-medium">
          Help other students get to know you better.
        </p>

        {/* Progress Bar */}
        <div className="mt-6 flex items-center gap-2">
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
          <span className="text-xs font-bold text-gray-500 ml-2">Step 2 of 3</span>
        </div>
      </div>

      <form onSubmit={handleNext} className="space-y-5">
        {/* Gender Selection */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Gender
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm font-semibold text-gray-700">Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm font-semibold text-gray-700">Female</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === 'other'}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm font-semibold text-gray-700">Other</span>
            </label>
          </div>
        </div>

        {/* Institution */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            University/Institution
          </label>
          <input
            required
            type="text"
            name="institution"
            value={institution}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Your University Name"
          />
        </div>

        {/* Major */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Major / Field of Study
          </label>
          <input
            required
            type="text"
            name="major"
            value={major}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Computer Science"
          />
        </div>

        {/* About */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            About You
          </label>
          <textarea
            required
            name="about"
            value={about}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            placeholder="Tell us about yourself, your passions, and what you're looking for..."
          ></textarea>
          <p className="text-xs text-gray-400 mt-1">{about.length}/500</p>
        </div>

        {/* Photo URL (Optional) */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Photo URL (Optional)
          </label>
          <input
            type="url"
            name="photoURL"
            value={photoURL}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-6">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/25"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2_Bio;
