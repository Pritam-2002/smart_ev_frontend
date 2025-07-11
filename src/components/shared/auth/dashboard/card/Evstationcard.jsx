import React from 'react';
import { MapPin, Zap, Star, Clock, Users, Battery, Shield } from 'lucide-react';

const EVStationCard = ({ station }) => {
  // Simulated authentication check (replace with your actual logic)
  const isDriver = true; // Example: Replace with `user.role === 'driver'` from context or auth state

  // Mock station data for demonstration
  const mockStation = {
    name: "Tesla Supercharger Station",
    operator: "Tesla Motors",
    address: "123 Electric Avenue, Tech City, TC 12345",
    batterySwapping: { isAvailable: true },
    ratings: { averageRating: 4.5, totalReviews: 128 },
    rushHourData: {
      peakHours: [
        { day: "monday", startTime: "8:00 AM", endTime: "10:00 AM", chargingDemand: "HIGH" },
        { day: "tuesday", startTime: "5:00 PM", endTime: "7:00 PM", chargingDemand: "HIGH" },
        { day: "friday", startTime: "6:00 PM", endTime: "8:00 PM", chargingDemand: "HIGH" }
      ]
    },
    ...station
  };

  const stationData = mockStation;

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 4.0) return 'text-yellow-500';
    if (rating >= 3.0) return 'text-orange-500';
    return 'text-red-500';
  };

  const highDemandPeaks = stationData.rushHourData?.peakHours?.filter(
    (peak) => peak.chargingDemand === 'HIGH'
  ) || [];

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out">
      {/* Gradient overlay for visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Main content */}
      <div className="relative p-8">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {stationData.name}
            </h2>
            <div className="flex items-center text-gray-600 mb-1">
              <Shield className="h-4 w-4 mr-2 text-blue-500" />
              <span className="font-medium">{stationData.operator}</span>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">Active</span>
          </div>
        </div>

        {/* Driver-Only Content */}
        {isDriver ? (
          <div className="space-y-6">
            {/* Location */}
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <MapPin className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{stationData.address}</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Battery Swapping */}
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex-shrink-0">
                  <Battery className={`h-6 w-6 ${stationData.batterySwapping.isAvailable ? 'text-green-500' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Battery Swapping</h4>
                  <span className={`text-sm font-medium ${
                    stationData.batterySwapping.isAvailable 
                      ? 'text-green-600' 
                      : 'text-gray-500'
                  }`}>
                    {stationData.batterySwapping.isAvailable ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                <div className="flex-shrink-0">
                  <Star className={`h-6 w-6 ${getRatingColor(stationData.ratings.averageRating)} fill-current`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Rating</h4>
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm font-bold ${getRatingColor(stationData.ratings.averageRating)}`}>
                      {stationData.ratings.averageRating}
                    </span>
                    <span className="text-gray-500 text-sm">/5</span>
                    <span className="text-gray-400 text-xs">({stationData.ratings.totalReviews})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Peak Hours Section */}
            {highDemandPeaks.length > 0 && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-3 border border-red-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-red-500" />
                  <h3 className="text-sm font-bold text-gray-900">Peak Hours</h3>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    High Demand
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {highDemandPeaks.map((peak, index) => (
                    <div key={index} className="flex items-center space-x-1 px-2 py-1 bg-white rounded text-xs border border-red-100">
                      <span className="font-medium text-gray-900 capitalize">
                        {peak.day.slice(0, 3)}
                      </span>
                      <span className="text-gray-600">
                        {peak.startTime.replace(' ', '').toLowerCase()} - {peak.endTime.replace(' ', '').toLowerCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                <MapPin className="h-5 w-5 inline mr-2" />
                Get Directions
              </button>
            </div>
          </div>
        ) : (
          /* Non-driver view */
          <div className="text-center py-12">
            <div className="mb-6">
              <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Driver Access Required</h3>
              <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                Please log in as a driver to view detailed station information including location, availability, and booking options.
              </p>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Login as Driver
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EVStationCard;