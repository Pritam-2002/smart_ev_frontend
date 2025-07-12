// src/components/Dashboard.jsx
import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import EVStationCard from '../../auth/dashboard/card/Evstationcard';
import { authDataContext } from '../../../../context/Isauthcontext';
import { useNavigate } from 'react-router-dom';
import { userdatacontext } from '../../../../context/Userprottected';

const Dashboard = () => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { getcurruser } = useContext(userdatacontext);
  const [evStations, setEVStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState('name');
  const [showEmergencyAI, setShowEmergencyAI] = useState(false);

  useEffect(() => {
    const fetchEVStations = async () => {
      try {
        const response = await axios.get(serverUrl + "/api/stations/findallstation");
        setEVStations(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch EV stations. Please try again.');
        setLoading(false);
        console.log(error);
      }
    };

    const handleGetLocation = () => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by this browser.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            console.log(latitude, longitude,address)
            // Send location data to the server via PATCH request
            await axios.patch(serverUrl + "/api/driver/location", {
              latitude,
              longitude,
              address,
            });

            // Refresh user context
            getcurruser();

            // Log with current date and time (11:10 AM IST, Saturday, July 12, 2025)
            console.log('Location updated successfully at 11:10 AM IST, Saturday, July 12, 2025:', { latitude, longitude, address });
          } catch (error) {
            console.error('Error sending location:', error);
          }
        },
        (error) => {
          console.error('Location error at 11:10 AM IST, Saturday, July 12, 2025:', error.message);
        }
      );
    };

    fetchEVStations();
    // Request location on component mount (after login)
    handleGetLocation();
  }, []);

  // Memoized filtered stations based on search term and filter
  const filteredStations = useMemo(() => {
    if (!searchTerm.trim()) {
      return evStations;
    }

    const searchLower = searchTerm.toLowerCase();
    
    return evStations.filter((station) => {
      switch (searchFilter) {
        case 'name':
          return station.name?.toLowerCase().includes(searchLower);
        
        case 'location':
          return (
            station.address?.toLowerCase().includes(searchLower) ||
            station.city?.toLowerCase().includes(searchLower) ||
            station.state?.toLowerCase().includes(searchLower) ||
            station.location?.address?.toLowerCase().includes(searchLower)
          );
        
        case 'status':
          const isActive = station.isOperational === true || 
                          station.status === 'active' || 
                          station.active === true ||
                          (station.isOperational !== false && station.status !== 'inactive');
          const statusText = isActive ? 'active' : 'inactive';
          return statusText.includes(searchLower);
        
        case 'all':
        default:
          return (
            station.name?.toLowerCase().includes(searchLower) ||
            station.address?.toLowerCase().includes(searchLower) ||
            station.city?.toLowerCase().includes(searchLower) ||
            station.state?.toLowerCase().includes(searchLower) ||
            station.location?.address?.toLowerCase().includes(searchLower)
          );
      }
    });
  }, [evStations, searchTerm, searchFilter]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search filter change
  const handleFilterChange = (e) => {
    setSearchFilter(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setSearchFilter('name');
  };

  // Handle Emergency AI
  const handleEmergencyAI = () => {
    setShowEmergencyAI(true);
    navigate('/aiinfo')
    console.log('Emergency AI activated');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Title Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                  EV Charging Stations
                </h1>
                <p className="text-lg text-gray-600 mt-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {filteredStations.length} stations available
                  </span>
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Emergency AI Button */}
              <button
                onClick={handleEmergencyAI}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Emergency AI</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search stations..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={searchFilter}
                onChange={handleFilterChange}
                className="appearance-none px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200 font-medium text-gray-700"
              >
                <option value="name">Name</option>
                <option value="location">Location</option>
                <option value="status">Status</option>
                <option value="all">All Fields</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={clearSearch}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="text-blue-800 font-medium">
                  Found <span className="font-bold text-blue-900">{filteredStations.length}</span> station{filteredStations.length !== 1 ? 's' : ''} 
                  {searchFilter !== 'all' && ` in ${searchFilter}`} matching "<span className="font-bold text-blue-900">{searchTerm}</span>"
                </span>
              </div>
              <button
                onClick={clearSearch}
                className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Emergency AI Modal */}
        {showEmergencyAI && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Emergency AI Assistant</h3>
              </div>
              <p className="text-gray-600 mb-6">
                I'm here to help you find the nearest charging station or assist with any emergency EV-related issues.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowEmergencyAI(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    navigate('/aidashboard');
                    console.log('Starting emergency assistance...');
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Get Help
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="space-y-6">
            {/* Loading Skeletons */}
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center shadow-lg">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-xl mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="font-medium text-lg mb-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 inline-block px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium shadow-lg"
            >
              Retry
            </button>
          </div>
        ) : filteredStations.length === 0 ? (
          <div className="bg-white border border-gray-200 text-gray-600 p-8 rounded-2xl text-center shadow-lg">
            {searchTerm ? (
              <div>
                <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-xl mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="font-bold text-xl mb-2 text-gray-900">No stations found</p>
                <p className="text-gray-500 mb-6">
                  No stations match your search criteria "<span className="font-medium">{searchTerm}</span>"
                </p>
                <button
                  onClick={clearSearch}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium shadow-lg"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-xl mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="font-bold text-xl text-gray-900">No EV stations found</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredStations.map((station) => (
              <div
                key={station._id}
                className="transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
              >
                <EVStationCard station={station} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;