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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedCards, setDisplayedCards] = useState([]);
  const ITEMS_PER_PAGE = 4;

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

  // Filter logic - Apply all filters to create filteredFeed
  const filteredFeed = useMemo(() => {
    let result = allFeed;

    // Apply department filter
    if (selectedDepartment) {
      result = result.filter((user) => user.major === selectedDepartment);
    }

    // Apply skill filter
    if (selectedSkill) {
      result = result.filter((user) =>
        user.skills?.some(s => s.toLowerCase().includes(selectedSkill.toLowerCase()))
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(query);
      });
    }

    return result;
  }, [allFeed, selectedDepartment, selectedSkill, searchQuery]);

  // Pagination logic - Convert filteredFeed to displayedCards for current page
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    const cardsForCurrentPage = filteredFeed.slice(startIndex, endIndex);
    setDisplayedCards(cardsForCurrentPage);
  }, [filteredFeed, currentPage]);

  // Extract unique departments and skills for filters
  const departments = useMemo(() => 
    [...new Set(allFeed.map(user => user.major))].filter(Boolean).sort(),
    [allFeed]
  );

  const allSkills = useMemo(() => 
    [...new Set(allFeed.flatMap(user => user.skills || []))].sort().slice(0, 15),
    [allFeed]
  );

  // Calculate pagination info
  const totalPages = Math.ceil(filteredFeed.length / ITEMS_PER_PAGE);

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedDepartment('');
    setSelectedSkill('');
    setCurrentPage(1);
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
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setCurrentPage(1);
                  }}
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
                  onChange={(e) => {
                    setSelectedSkill(e.target.value);
                    setCurrentPage(1);
                  }}
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
            ) : displayedCards.length > 0 ? (
              <>
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedCards.map((user) => (
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

                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <div className="text-gray-600 font-semibold">
                    Page <span className="text-blue-600">{currentPage}</span> of <span className="text-blue-600">{totalPages}</span>
                  </div>

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No matches found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;