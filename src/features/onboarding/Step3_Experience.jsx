import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExperience, removeExperience, updateExperience, setStep } from './onboardingSlice';

const Step3_Experience = () => {
  const dispatch = useDispatch();
  const experiences = useSelector((state) => state.onboarding.formData.experience);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.position || !formData.startDate) {
      alert('Please fill in company, position, and start date');
      return;
    }

    dispatch(addExperience({
      ...formData,
      endDate: formData.currentlyWorking ? 'Present' : formData.endDate,
    }));

    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: '',
    });
  };

  const handleRemoveExperience = (index) => {
    dispatch(removeExperience(index));
  };

  const handleNext = (e) => {
    e.preventDefault();
    dispatch(setStep(4));
  };

  const handleBack = () => {
    dispatch(setStep(2));
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Add Your Experience</h2>
        <p className="text-gray-500 text-sm font-medium">
          Share your professional experience and internships.
        </p>

        {/* Progress Bar */}
        <div className="mt-6 flex items-center gap-2">
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
          <span className="text-xs font-bold text-gray-500 ml-2">Step 3 of 4</span>
        </div>
      </div>

      <form onSubmit={handleAddExperience} className="space-y-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Add Experience Entry</h3>

          {/* Company */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Company Name *
            </label>
            <input
              required
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="e.g., Google, Microsoft"
            />
          </div>

          {/* Position */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Position *
            </label>
            <input
              required
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="e.g., Software Engineer, Product Manager"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Start Date *
              </label>
              <input
                required
                type="month"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                End Date
              </label>
              <input
                type="month"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                disabled={formData.currentlyWorking}
                className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50"
              />
            </div>
          </div>

          {/* Currently Working */}
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="currentlyWorking"
                checked={formData.currentlyWorking}
                onChange={handleInputChange}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm font-semibold text-gray-700">I currently work here</span>
            </label>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            Add Experience
          </button>
        </div>
      </form>

      {/* Experience List */}
      {experiences.length > 0 && (
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-bold text-gray-900">Your Experience</h3>
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">{exp.position}</h4>
                  <p className="text-teal-600 font-semibold">{exp.company}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveExperience(index)}
                  className="text-red-600 hover:text-red-800 font-bold"
                >
                  Remove
                </button>
              </div>
              {exp.description && (
                <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-xs text-blue-700">
          💡 <strong>Tip:</strong> You can add multiple experiences. Skip if you don't have any yet.
        </p>
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
          onClick={handleNext}
          className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/25"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3_Experience;
