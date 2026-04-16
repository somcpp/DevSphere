import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFeed, selectLoading, setUserFeed, setLoading, setError } from './feedSlice';
import { getUserFeed } from '../../Api/userApi';
import FeedCard from './FeedCard';

// Mock data for development
const MOCK_FEED_DATA = [
  {
    _id: "1",
    firstName: "Marcus",
    lastName: "Chen",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    major: "Computer Science",
    institution: "Stanford University",
    skills: ["JavaScript", "React", "Python"],
    experience: [
      { company: "Google", position: "SWE Intern", startDate: "2024-06", endDate: "Present" }
    ],
    location: "Palo Alto, USA",
    interests: ["AI & ML", "Startup Building"],
  },
  {
    _id: "2",
    firstName: "Sarah",
    lastName: "Jenkins",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    major: "Finance",
    institution: "Harvard Business School",
    skills: ["Financial Analysis", "Python", "SQL"],
    experience: [
      { company: "Goldman Sachs", position: "Business Analyst", startDate: "2023-09", endDate: "2024-08" }
    ],
    location: "Boston, USA",
    interests: ["Fintech", "Venture Investing"],
  },
  {
    _id: "3",
    firstName: "Alex",
    lastName: "Rivera",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    major: "Industrial Design",
    institution: "RISD",
    skills: ["Figma", "Product Design", "User Research"],
    experience: [
      { company: "Airbnb", position: "Product Designer", startDate: "2024-01", endDate: "Present" }
    ],
    location: "San Francisco, USA",
    interests: ["Tech & Innovation", "Social Impact"],
  },
  {
    _id: "4",
    firstName: "Elena",
    lastName: "Rodriguez",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    major: "Marketing",
    institution: "UC Berkeley",
    skills: ["Community Building", "Social Strategy", "Growth"],
    experience: [
      { company: "Stripe", position: "Growth Marketing Manager", startDate: "2023-06", endDate: "Present" }
    ],
    location: "San Francisco, USA",
    interests: ["Social Networks", "Brand Building"],
  },
  {
    _id: "5",
    firstName: "Jordan",
    lastName: "Smith",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    major: "Mechanical Engineering",
    institution: "MIT",
    skills: ["CAD Design", "Arduino", "3D Printing"],
    experience: [
      { company: "Tesla", position: "Mechanical Engineer", startDate: "2024-05", endDate: "Present" }
    ],
    location: "Boston, USA",
    interests: ["IoT", "Hardware"],
  },
  {
    _id: "6",
    firstName: "Maya",
    lastName: "Patel",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    major: "Public Policy",
    institution: "Georgetown University",
    skills: ["Data Analysis", "Grant Writing", "Policy Research"],
    experience: [
      { company: "World Bank", position: "Policy Analyst", startDate: "2024-02", endDate: "Present" }
    ],
    location: "Washington DC, USA",
    interests: ["Social Work", "Sustainability"],
  },
];

const FeedPage = () => {
  const dispatch = useDispatch();
  const allFeed = useSelector(selectFeed);
  const isLoading = useSelector(selectLoading);
  
  const [feed, setFeed] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  const fetchFeed = async () => {
      try {
        dispatch(setLoading(true));
        const res = await getUserFeed();
        dispatch(setUserFeed(res));
        setFeed(res); // Update local state with fetched data
      } catch (error) {
        console.error('Failed to fetch feed:', error);
        // Use mock data on error
        dispatch(setUserFeed(MOCK_FEED_DATA));
        setFeed(MOCK_FEED_DATA);
        dispatch(setError(error.message));
      }
    };

  // Fetch feed data on mount
  useEffect(() => {
    
    // If there's already data in Redux, use it; otherwise fetch
    if (allFeed.length === 0) {
      fetchFeed();
    } else {
      setFeed(allFeed);
    }
  }, []);

  // Handle department filter
  const handleFilterDepartment = (e) => {
    const deptName = e.target.value;
    setSelectedDepartment(deptName);
    
    if (deptName === '') {
      setFeed(allFeed);
    } else {
      const filtered = allFeed.filter((user) => user.major === deptName);
      setFeed(filtered);
    }
  };

  // Handle skill filter
  const handleFilterSkill = (e) => {
    const skill = e.target.value;
    setSelectedSkill(skill);
    
    if (skill === '') {
      setFeed(allFeed);
    } else {
      const filtered = allFeed.filter((user) => 
        user.skills?.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      );
      setFeed(filtered);
    }
  };

  // Get unique departments
  const departments = [...new Set(allFeed.map(user => user.major))].filter(Boolean).sort();
  
  // Get unique skills
  const allSkills = [...new Set(allFeed.flatMap(user => user.skills || []))].sort().slice(0, 15);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Find Your Perfect <span className="text-blue-600">Collaborative Match</span>
          </h1>
          <p className="text-gray-600 mt-1">Connect with talented students to bring your innovative ideas to life.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">⚙️</span> Filters
              </h2>

              {/* Department Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                  Campus Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={handleFilterDepartment}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skill Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                  Skills
                </label>
                <select
                  value={selectedSkill}
                  onChange={handleFilterSkill}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Skills</option>
                  {allSkills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedDepartment('');
                  setSelectedSkill('');
                  setFeed(allFeed);
                }}
                className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Feed Cards Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading feed...</p>
                </div>
              </div>
            ) : feed.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feed.map((user) => (
                  <FeedCard
                    key={user._id}
                    userId={user._id}
                    photoURL={user.photoURL}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    major={user.major}
                    institution={user.institution}
                    skills={user.skills}
                    interests={user.interests}
                    location={user.location}
                    experience={user.experience}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No matches found. Try adjusting your filters.</p>
              </div>
            )}

            {/* Load More Button */}
            {feed.length > 0 && (
              <div className="text-center mt-8">
                <button className="bg-gray-100 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                  Load more talented teammates
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;