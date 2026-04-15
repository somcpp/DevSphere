import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSkill, setStep } from './onboardingSlice';
import skillsData from '../../data/skills.json';

const Step1_Skills = () => {
  const dispatch = useDispatch();
  const selectedSkills = useSelector((state) => state.onboarding.formData.skills);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter skills based on search term
  const filteredSkills = useMemo(() => {
    return skillsData.skills.filter((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleToggleSkill = (skill) => {
    dispatch(toggleSkill(skill));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (selectedSkills.length > 0) {
      dispatch(setStep(2));
    } else {
      alert('Please select at least one skill');
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your Skills</h2>
        <p className="text-gray-500 text-sm font-medium">
          Choose the skills that best represent your expertise. Use the search bar to find skills quickly.
        </p>

        {/* Progress Bar */}
        <div className="mt-6 flex items-center gap-2">
          <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
          <span className="text-xs font-bold text-gray-500 ml-2">Step 1 of 3</span>
        </div>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        {/* Search Bar */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Search Skills
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by skill name (e.g., React, Python, AWS)..."
              className="w-full p-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Skills Grid */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Available Skills
          </p>
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 max-h-96 overflow-y-auto pr-2">
              {filteredSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleToggleSkill(skill)}
                  className={`p-3 rounded-lg font-semibold text-sm transition-all border-2 ${
                    selectedSkills.includes(skill)
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No skills found matching "{searchTerm}"</p>
              <p className="text-gray-400 text-xs mt-1">Try searching for something else</p>
            </div>
          )}
        </div>

        {/* Selected Count */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900 font-semibold">
            {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
          </p>
          {selectedSkills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 group"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleToggleSkill(skill)}
                    className="ml-1 group-hover:text-blue-200 transition"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-6">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/25"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1_Skills;
