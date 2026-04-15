import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeedCard = ({ 
  photoURL, 
  skills, 
  firstName, 
  lastName, 
  major, 
  institution, 
  interests,
  location,
  experience,
  userId 
}) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/view/${userId}`);
  };

  // Get top 3 skills
  const topSkills = skills?.slice(0, 3) || [];
  
  // Get top interests
  const topInterests = interests?.slice(0, 2) || [];
  
  // Get most recent experience
  const latestExperience = experience && experience.length > 0 ? experience[0] : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm hover:shadow-lg transition-shadow">
      {/* Header with interests tag */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {/* Profile Image */}
          <img 
            src={photoURL || 'https://via.placeholder.com/150'} 
            alt={`${firstName} ${lastName}`}
            className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-blue-500"
          />
          
          {/* Name and Role */}
          <h3 className="text-lg font-bold text-gray-800">
            {firstName} {lastName}
          </h3>
          <p className="text-sm text-gray-600">
            {major || 'Student'} • {institution?.split(' ').slice(0, 2).join(' ') || 'University'}
          </p>
          
          {/* Experience or Location */}
          {latestExperience ? (
            <p className="text-xs text-teal-600 font-semibold mt-1">
              💼 {latestExperience.position} @ {latestExperience.company}
            </p>
          ) : location && (
            <p className="text-xs text-gray-500 mt-1">📍 {location}</p>
          )}
        </div>
        
        {/* Interest Tag */}
        {topInterests[0] && (
          <div className="text-xs font-semibold bg-teal-200 text-teal-800 px-3 py-1 rounded-full whitespace-nowrap ml-2">
            {topInterests[0]?.toUpperCase().slice(0, 10)}
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className="mb-4">
        <p className="text-xs font-bold text-gray-700 mb-2 uppercase">Top Skills</p>
        <div className="flex flex-wrap gap-2">
          {topSkills.map((skill, index) => (
            <span 
              key={index}
              className="text-xs font-semibold bg-teal-100 text-teal-700 px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* View Profile Button */}
      <button 
        onClick={handleViewProfile}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        View Profile
      </button>
    </div>
  );
};

export default FeedCard;