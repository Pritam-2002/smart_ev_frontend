// src/components/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import EVStationCard from '../../auth/dashboard/card/Evstationcard';
import { authDataContext } from '../../../../context/Isauthcontext';
// import { EV_STATIONS_ENDPOINT } from '../constants/api';

const Dashboard = () => {
  const { serverUrl } = useContext(authDataContext);
  const [evStations, setEVStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEVStations = async () => {
      try {
        const response = await axios.get(serverUrl + "/api/stations/findallstation");
        setEVStations(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch EV stations. Please try again.');
        setLoading(false);
        console.log(error)
      }
    };

    fetchEVStations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            EV Stations <span className="text-indigo-600">({evStations.length})</span>
          </h1>
          {/* Placeholder for future filter/search */}
          <div className="mt-4 sm:mt-0">
            <input
              type="text"
              placeholder="Search stations..."
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled
            />
          </div>
        </div>
  
        {/* Content Section */}
        {loading ? (
          <div className="space-y-6">
            {/* Loading Skeletons */}
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center">
            <p className="font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : evStations.length === 0 ? (
          <div className="bg-white border border-gray-200 text-gray-600 p-6 rounded-lg text-center">
            <p className="font-medium">No EV stations found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {evStations.map((station) => (
              <div
                key={station._id}
                className="transform transition-all duration-300 ease-in-out hover:-translate-y-1"
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