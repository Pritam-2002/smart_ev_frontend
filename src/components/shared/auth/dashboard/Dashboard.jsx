import React, { useState } from 'react';

const EVStationDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data based on your schema
  const [stations, setStations] = useState([
    {
      _id: '1',
      name: 'Central Mall EV Hub',
      operator: 'PowerGrid Solutions',
      location: { coordinates: [77.2090, 28.6139] },
      address: {
        street: '123 Central Avenue',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
        fullAddress: '123 Central Avenue, New Delhi, Delhi 110001'
      },
      contactInfo: {
        phone: '+91 9876543210',
        email: 'central@powergrid.com',
        website: 'https://powergrid.com'
      },
      chargingPoints: [
        { connectorType: 'CCS', chargingType: 'DC', powerOutput: 50, count: 4, isAvailable: true, pricePerUnit: 12 },
        { connectorType: 'Type2', chargingType: 'AC', powerOutput: 22, count: 6, isAvailable: true, pricePerUnit: 8 }
      ],
      batterySwapping: {
        isAvailable: true,
        supportedVehicles: ['2W', '3W'],
        swappingTime: 3,
        pricePerSwap: 150,
        availableBatteries: 25,
        totalBatteries: 30
      },
      ratings: { averageRating: 4.5, totalReviews: 128 },
      isActive: true,
      verificationStatus: 'VERIFIED',
      rushHourData: {
        peakHours: [
          { day: 'monday', startTime: '08:00', endTime: '10:00', congestionLevel: 'HIGH', averageWaitTime: 15 }
        ]
      }
    },
    {
      _id: '2',
      name: 'Tech Park Charging Station',
      operator: 'EcoCharge India',
      location: { coordinates: [77.1025, 28.4595] },
      address: {
        street: '456 Tech Park Road',
        city: 'Gurugram',
        state: 'Haryana',
        pincode: '122001',
        fullAddress: '456 Tech Park Road, Gurugram, Haryana 122001'
      },
      contactInfo: {
        phone: '+91 9876543211',
        email: 'techpark@ecocharge.com',
        website: 'https://ecocharge.com'
      },
      chargingPoints: [
        { connectorType: 'CCS', chargingType: 'DC', powerOutput: 100, count: 2, isAvailable: true, pricePerUnit: 15 },
        { connectorType: 'CHAdeMO', chargingType: 'DC', powerOutput: 50, count: 3, isAvailable: false, pricePerUnit: 12 }
      ],
      batterySwapping: {
        isAvailable: false,
        supportedVehicles: [],
        swappingTime: 0,
        pricePerSwap: 0,
        availableBatteries: 0,
        totalBatteries: 0
      },
      ratings: { averageRating: 4.2, totalReviews: 87 },
      isActive: true,
      verificationStatus: 'VERIFIED',
      rushHourData: {
        peakHours: [
          { day: 'monday', startTime: '18:00', endTime: '20:00', congestionLevel: 'MEDIUM', averageWaitTime: 8 }
        ]
      }
    },
    {
      _id: '3',
      name: 'Highway Rest Stop',
      operator: 'FastCharge Network',
      location: { coordinates: [77.3910, 28.5355] },
      address: {
        street: '789 Highway 1',
        city: 'Noida',
        state: 'Uttar Pradesh',
        pincode: '201301',
        fullAddress: '789 Highway 1, Noida, Uttar Pradesh 201301'
      },
      contactInfo: {
        phone: '+91 9876543212',
        email: 'highway@fastcharge.com',
        website: 'https://fastcharge.com'
      },
      chargingPoints: [
        { connectorType: 'Type2', chargingType: 'AC', powerOutput: 11, count: 8, isAvailable: true, pricePerUnit: 6 }
      ],
      batterySwapping: {
        isAvailable: true,
        supportedVehicles: ['2W'],
        swappingTime: 2,
        pricePerSwap: 100,
        availableBatteries: 15,
        totalBatteries: 20
      },
      ratings: { averageRating: 3.8, totalReviews: 45 },
      isActive: false,
      verificationStatus: 'PENDING',
      rushHourData: {
        peakHours: [
          { day: 'saturday', startTime: '12:00', endTime: '16:00', congestionLevel: 'LOW', averageWaitTime: 5 }
        ]
      }
    }
  ]);

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.operator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && station.isActive) ||
                         (filterStatus === 'inactive' && !station.isActive);
    return matchesSearch && matchesFilter;
  });

  const getTotalChargingPoints = () => {
    return stations.reduce((total, station) => {
      return total + station.chargingPoints.reduce((sum, point) => sum + point.count, 0);
    }, 0);
  };

  const getAvailableChargingPoints = () => {
    return stations.reduce((total, station) => {
      return total + station.chargingPoints.filter(point => point.isAvailable).reduce((sum, point) => sum + point.count, 0);
    }, 0);
  };

  const getBatterySwappingStations = () => {
    return stations.filter(station => station.batterySwapping.isAvailable).length;
  };

  const getAverageRating = () => {
    const totalRating = stations.reduce((sum, station) => sum + station.ratings.averageRating, 0);
    return (totalRating / stations.length).toFixed(1);
  };

  const StatCard = ({ title, value, subtitle, color = 'blue' }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${color}-500`}>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-600 mt-2`}>{value}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  const StationCard = ({ station }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{station.name}</h3>
          <p className="text-gray-600">{station.operator}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            station.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {station.isActive ? 'Active' : 'Inactive'}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            station.verificationStatus === 'VERIFIED' 
              ? 'bg-blue-100 text-blue-800' 
              : station.verificationStatus === 'PENDING'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {station.verificationStatus}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Total Charging Points</p>
          <p className="text-lg font-semibold">{station.chargingPoints.reduce((sum, point) => sum + point.count, 0)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Battery Swapping</p>
          <p className="text-lg font-semibold">{station.batterySwapping.isAvailable ? 'Available' : 'Not Available'}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-yellow-500 text-lg">★</span>
          <span className="ml-1 text-sm font-medium">{station.ratings.averageRating}</span>
          <span className="ml-1 text-sm text-gray-500">({station.ratings.totalReviews})</span>
        </div>
        <button 
          onClick={() => setSelectedStation(station)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );

  const StationDetails = ({ station }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{station.name}</h2>
          <p className="text-gray-600 mt-1">{station.operator}</p>
        </div>
        <button 
          onClick={() => setSelectedStation(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Location Details</h3>
          <p className="text-gray-700 mb-2">{station.address.fullAddress}</p>
          <div className="text-sm text-gray-600">
            <p>Phone: {station.contactInfo.phone}</p>
            <p>Email: {station.contactInfo.email}</p>
            <p>Website: {station.contactInfo.website}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Charging Points</h3>
          <div className="space-y-2">
            {station.chargingPoints.map((point, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">{point.connectorType} ({point.chargingType})</p>
                  <p className="text-sm text-gray-600">{point.powerOutput}kW • ₹{point.pricePerUnit}/kWh</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{point.count} units</p>
                  <p className={`text-sm ${point.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {point.isAvailable ? 'Available' : 'Unavailable'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {station.batterySwapping.isAvailable && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Battery Swapping</h3>
            <div className="p-4 bg-green-50 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Swapping Time</p>
                  <p className="font-medium">{station.batterySwapping.swappingTime} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price per Swap</p>
                  <p className="font-medium">₹{station.batterySwapping.pricePerSwap}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available Batteries</p>
                  <p className="font-medium">{station.batterySwapping.availableBatteries}/{station.batterySwapping.totalBatteries}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Supported Vehicles</p>
                  <p className="font-medium">{station.batterySwapping.supportedVehicles.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-3">Rush Hour Data</h3>
          <div className="space-y-2">
            {station.rushHourData.peakHours.map((hour, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-md">
                <p className="font-medium capitalize">{hour.day}</p>
                <p className="text-sm text-gray-600">{hour.startTime} - {hour.endTime}</p>
                <p className="text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    hour.congestionLevel === 'HIGH' ? 'bg-red-100 text-red-800' :
                    hour.congestionLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {hour.congestionLevel}
                  </span>
                  <span className="ml-2">Wait: {hour.averageWaitTime} min</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">EV Station Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'overview' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('stations')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'stations' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Stations
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'analytics' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Total Stations" 
                value={stations.length} 
                subtitle="Active network"
                color="blue"
              />
              <StatCard 
                title="Charging Points" 
                value={getTotalChargingPoints()} 
                subtitle={`${getAvailableChargingPoints()} available`}
                color="green"
              />
              <StatCard 
                title="Battery Swapping" 
                value={getBatterySwappingStations()} 
                subtitle="Stations with swapping"
                color="purple"
              />
              <StatCard 
                title="Average Rating" 
                value={getAverageRating()} 
                subtitle="User satisfaction"
                color="yellow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Station Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Stations</span>
                    <span className="font-semibold text-green-600">
                      {stations.filter(s => s.isActive).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Inactive Stations</span>
                    <span className="font-semibold text-red-600">
                      {stations.filter(s => !s.isActive).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Verified Stations</span>
                    <span className="font-semibold text-blue-600">
                      {stations.filter(s => s.verificationStatus === 'VERIFIED').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Verification</span>
                    <span className="font-semibold text-yellow-600">
                      {stations.filter(s => s.verificationStatus === 'PENDING').length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Connector Types</h3>
                <div className="space-y-3">
                  {['CCS', 'Type2', 'CHAdeMO', 'Type1', 'GB/T'].map(type => {
                    const count = stations.reduce((total, station) => {
                      return total + station.chargingPoints.filter(point => point.connectorType === type).length;
                    }, 0);
                    return (
                      <div key={type} className="flex justify-between items-center">
                        <span className="text-gray-600">{type}</span>
                        <span className="font-semibold">{count} stations</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search stations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Stations</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>

            {selectedStation ? (
              <StationDetails station={selectedStation} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredStations.map(station => (
                  <StationCard key={station._id} station={station} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Usage Analytics</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-md">
                    <h4 className="font-medium text-blue-800">Peak Usage Hours</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Most stations experience peak usage between 8-10 AM and 6-8 PM
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-md">
                    <h4 className="font-medium text-green-800">Popular Connector Types</h4>
                    <p className="text-sm text-green-600 mt-1">
                      CCS and Type2 connectors are most commonly used
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-md">
                    <h4 className="font-medium text-purple-800">Battery Swapping Growth</h4>
                    <p className="text-sm text-purple-600 mt-1">
                      {getBatterySwappingStations()} stations offer battery swapping services
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Station Performance</h3>
                <div className="space-y-4">
                  {stations.slice(0, 3).map((station, index) => (
                    <div key={station._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">{station.name}</p>
                        <p className="text-sm text-gray-600">{station.ratings.totalReviews} reviews</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{station.ratings.averageRating}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`text-sm ${i < Math.floor(station.ratings.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Network Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-md">
                  <p className="text-2xl font-bold text-blue-600">
                    {stations.filter(s => s.address.state === 'Delhi').length}
                  </p>
                  <p className="text-sm text-gray-600">Delhi</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-md">
                  <p className="text-2xl font-bold text-green-600">
                    {stations.filter(s => s.address.state === 'Haryana').length}
                  </p>
                  <p className="text-sm text-gray-600">Haryana</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-md">
                  <p className="text-2xl font-bold text-purple-600">
                    {stations.filter(s => s.address.state === 'Uttar Pradesh').length}
                  </p>
                  <p className="text-sm text-gray-600">Uttar Pradesh</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EVStationDashboard;