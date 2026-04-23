import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSearch, clearSearch } from '../header/headerSlice';
import { getUserFeed } from '../../Api/userApi';
import FeedCard from './FeedCard';
import { MOCK_FEED_DATA } from '../../data/mockData';
import { useDispatch } from 'react-redux';

const FeedPage = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearch);
  
  const [allFeed, setAllFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  // Fetch feed data on mount
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setIsLoading(true);
        const res = await getUserFeed();
        setAllFeed(res);
      } catch (error) {
        console.error('Failed to fetch feed:', error);
        setAllFeed(MOCK_FEED_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, []);

  // Filter logic - memoized for performance
  const filteredFeed = useMemo(() => {
    let result = allFeed;

    // Department filter
    if (selectedDepartment) {
      result = result.filter((user) => user.major === selectedDepartment);
    }

    // Skill filter
    if (selectedSkill) {
      result = result.filter((user) =>
        user.skills?.some(s => s.toLowerCase().includes(selectedSkill.toLowerCase()))
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

        return (
          fullName.includes(query)
        );
      });
    }

    return result;
  }, [allFeed, selectedDepartment, selectedSkill, searchQuery]);


  // Extract unique departments and skills for filters
  const departments = useMemo(() => 
    [...new Set(allFeed.map(user => user.major))].filter(Boolean).sort(),
    [allFeed]
  );

  const allSkills = useMemo(() => 
    [...new Set(allFeed.flatMap(user => user.skills || []))].sort().slice(0, 15),
    [allFeed]
  );

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedDepartment('');
    setSelectedSkill('');
    dispatch(clearSearch());
  };

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
                  onChange={(e) => setSelectedDepartment(e.target.value)}
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
                  onChange={(e) => setSelectedSkill(e.target.value)}
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
                onClick={handleClearFilters}
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
            ) : filteredFeed.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFeed.map((user) => (
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
            {filteredFeed.length > 0 && (
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