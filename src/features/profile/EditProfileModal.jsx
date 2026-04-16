import React, { useState } from "react";
import { X } from "lucide-react";
import skillsData from "../../data/skills.json";

const EditProfileModal = ({
  isOpen,
  onClose,
  onSave,
  isSaving,
  user,
  editForm,
  setEditForm,
}) => {
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [searchSkill, setSearchSkill] = useState("");
  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
  });

  const interests = [
    "Tech & Innovation",
    "Venture Building",
    "Startups",
    "AI & Machine Learning",
    "Web Development",
    "Mobile Development",
    "Blockchain",
    "Cloud Computing",
    "DevOps",
    "Design",
    "Product Management",
    "Data Science",
  ];

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSkillToggle = (skill) => {
    setEditForm({
      ...editForm,
      skills: editForm.skills.includes(skill)
        ? editForm.skills.filter((s) => s !== skill)
        : [...editForm.skills, skill],
    });
  };

  const handleInterestToggle = (interest) => {
    setEditForm({
      ...editForm,
      interests: editForm.interests.includes(interest)
        ? editForm.interests.filter((i) => i !== interest)
        : [...editForm.interests, interest],
    });
  };

  const handleExperienceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewExperience({
      ...newExperience,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addExperience = () => {
    if (!newExperience.company || !newExperience.position || !newExperience.startDate) {
      alert("Please fill in company, position, and start date");
      return;
    }

    setEditForm({
      ...editForm,
      experience: [
        ...editForm.experience,
        {
          ...newExperience,
          endDate: newExperience.currentlyWorking ? "Present" : newExperience.endDate,
        },
      ],
    });

    setNewExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
    });
    setShowExperienceForm(false);
  };

  const removeExperience = (index) => {
    setEditForm({
      ...editForm,
      experience: editForm.experience.filter((_, i) => i !== index),
    });
  };

  const filteredSkills = searchSkill
    ? skillsData.skills.filter((skill) =>
        skill.toLowerCase().includes(searchSkill.toLowerCase())
      )
    : skillsData.skills;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <form className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photoURL"
                  value={editForm.photoURL}
                  onChange={handleFormChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Gender
                </label>
                <div className="flex gap-4">
                  {["male", "female", "other"].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={editForm.gender === g}
                        onChange={handleFormChange}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-sm font-semibold text-gray-700 capitalize">
                        {g}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900">Education</h3>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  name="institution"
                  value={editForm.institution}
                  onChange={handleFormChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Your University Name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Major *
                </label>
                <input
                  type="text"
                  name="major"
                  value={editForm.major}
                  onChange={handleFormChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Computer Science"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  About You *
                </label>
                <textarea
                  name="about"
                  value={editForm.about}
                  onChange={handleFormChange}
                  rows="4"
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900">Skills</h3>

              <div>
                <input
                  type="text"
                  value={searchSkill}
                  onChange={(e) => setSearchSkill(e.target.value)}
                  placeholder="Search skills..."
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-3"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {filteredSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`p-2 rounded-lg text-sm font-semibold transition-all border-2 ${
                      editForm.skills.includes(skill)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-blue-500"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {editForm.skills.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    Selected ({editForm.skills.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {editForm.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className="ml-1 hover:text-blue-200"
                        >
                          <X size={16} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Experience */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Experience</h3>
                <button
                  type="button"
                  onClick={() => setShowExperienceForm(!showExperienceForm)}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  {showExperienceForm ? "Cancel" : "+ Add Experience"}
                </button>
              </div>

              {showExperienceForm && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <input
                    type="text"
                    name="company"
                    value={newExperience.company}
                    onChange={handleExperienceChange}
                    placeholder="Company Name"
                    className="w-full p-2 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    name="position"
                    value={newExperience.position}
                    onChange={handleExperienceChange}
                    placeholder="Position"
                    className="w-full p-2 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="month"
                      name="startDate"
                      value={newExperience.startDate}
                      onChange={handleExperienceChange}
                      className="w-full p-2 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="month"
                      name="endDate"
                      value={newExperience.endDate}
                      onChange={handleExperienceChange}
                      disabled={newExperience.currentlyWorking}
                      className="w-full p-2 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="currentlyWorking"
                      checked={newExperience.currentlyWorking}
                      onChange={handleExperienceChange}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Currently working
                    </span>
                  </label>
                  <textarea
                    name="description"
                    value={newExperience.description}
                    onChange={handleExperienceChange}
                    rows="2"
                    placeholder="Description"
                    className="w-full p-2 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  ></textarea>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                  >
                    Add Experience
                  </button>
                </div>
              )}

              {editForm.experience.length > 0 && (
                <div className="space-y-3">
                  {editForm.experience.map((exp, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-gray-900">{exp.position}</p>
                          <p className="text-sm text-teal-600">{exp.company}</p>
                          <p className="text-xs text-gray-600">
                            {exp.startDate} - {exp.endDate}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExperience(idx)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact & Location */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900">Contact Information</h3>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleFormChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleFormChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={editForm.linkedin}
                  onChange={handleFormChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  GitHub
                </label>
                <input
                  type="url"
                  name="github"
                  value={editForm.github}
                  onChange={handleFormChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  name="twitter"
                  value={editForm.twitter}
                  onChange={handleFormChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900">Interests</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-2 rounded-lg text-sm font-semibold transition-all border-2 ${
                      editForm.interests.includes(interest)
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-teal-500"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-lg transition flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
