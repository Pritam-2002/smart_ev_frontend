// src/components/EmergencyAI.jsx - Emergency AI Page
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EVStationCard from '../../auth/dashboard/card/Evstationcard';
import { authDataContext } from '../../../../context/Isauthcontext';

const EmergencyAI = () => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const [recommendedStation, setRecommendedStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emergencyStatus, setEmergencyStatus] = useState('analyzing'); // analyzing, found, error

  // Get user's location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  // Fetch recommended station
  useEffect(() => {
    const fetchRecommendedStation = async () => {
      try {
        setLoading(true);
        setEmergencyStatus('analyzing');
        
        // Get user's current location
        let userLocation = null;
        try {
          userLocation = await getCurrentLocation();
        } catch (locationError) {
          console.log('Could not get location:', locationError);
          // Continue without location - backend should handle this
        }

        // Hit the recommend endpoint
        const requestData = {
          ...(userLocation && {
            userLatitude: userLocation.latitude,
            userLongitude: userLocation.longitude
          }),
          emergencyRequest: true
        };

        const response = await axios.post(serverUrl + "/api/stations/recommend", requestData);
        
        if (response.data) {
          setRecommendedStation(response.data);
          setEmergencyStatus('found');
        } else {
          setError('No recommended station found.');
          setEmergencyStatus('error');
        }
      } catch (error) {
        console.error('Error fetching recommendation:', error);
        setError('Failed to get station recommendation. Please try again.');
        setEmergencyStatus('error');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedStation();
  }, [serverUrl]);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setEmergencyStatus('analyzing');
    // Re-trigger the useEffect
    window.location.reload();
  };

  const handleCallEmergency = () => {
    // You can add actual emergency calling logic here
    alert('Emergency services would be contacted here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                  🚨 Emergency AI Assistant
                </h1>
                <p className="text-lg text-gray-600 mt-1">
                  Finding the best charging station for your emergency
                </p>
              </div>
            </div>
            
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>

        {/* Emergency Status Banner */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Emergency Mode Activated</h2>
                <p className="text-red-100">
                  {emergencyStatus === 'analyzing' && 'Analyzing your location and finding the best station...'}
                  {emergencyStatus === 'found' && 'Found the best charging station for you!'}
                  {emergencyStatus === 'error' && 'Unable to find recommendation. Please try again.'}
                </p>
              </div>
            </div>
            <button
              onClick={handleCallEmergency}
              className="px-4 py-2 bg-white text-red-600 rounded-xl hover:bg-red-50 transition-colors font-medium shadow-lg"
            >
              📞 Call Emergency
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 animate-spin">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">🤖 AI is Working...</h3>
            <p className="text-gray-600 mb-4">
              Analyzing your location, battery level, and nearby stations to find the perfect match
            </p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center shadow-lg">
            <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-2">Unable to Get Recommendation</h3>
            <p className="text-red-700 mb-6">{error}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium shadow-lg"
              >
                🔄 Try Again
              </button>
              <button
                onClick={handleBackToDashboard}
                className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium shadow-lg"
              >
                View All Stations
              </button>
            </div>
          </div>
        )}

        {/* Success State - Show Recommended Station */}
        {recommendedStation && !loading && !error && (
          <div className="space-y-6">
            {/* AI Recommendation Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">🎯 Perfect Match Found!</h2>
                  <p className="text-green-100">
                    Based on your location, battery level, and station availability
                  </p>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                AI Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-600">Closest to your location</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-600">Fast charging available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-gray-600">Currently operational</span>
                </div>
              </div>
            </div>

            {/* Recommended Station Card */}
            <div className="transform transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-2xl shadow-lg">
                <div className="bg-white rounded-xl p-2">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="text-blue-800 font-bold">AI RECOMMENDED</span>
                    </div>
                  </div>
                  <EVStationCard station={recommendedStation} />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  // Add navigation to station logic
                  console.log('Navigate to station:', recommendedStation);
                }}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Get Directions</span>
              </button>
              
              <button
                onClick={() => {
                  // Add call station logic
                  console.log('Call station:', recommendedStation);
                }}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Station</span>
              </button>
              
              <button
                onClick={handleBackToDashboard}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 shadow-lg font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span>View All Stations</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyAI;