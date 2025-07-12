import React, { useState, useEffect, useContext } from 'react';
import { Battery, MapPin, Clock, Zap } from 'lucide-react';
import { userdatacontext } from '../../../../context/Userprottected';
import axios from 'axios';
import { authDataContext } from '../../../../context/Isauthcontext';
import { useNavigate } from 'react-router-dom';

export default function BatteryRangeDashboard() {
    const navigator=useNavigate()
    const {serverUrl}=useContext(authDataContext);
    const {userdata}=useContext(userdatacontext);
  const [batteryPercentage, setBatteryPercentage] = useState(30);
  const [rangeLeft, setRangeLeft] = useState(40);
  const [currentLocation, setCurrentLocation] = useState({ coordinates: [22.5726, 88.3639] });
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [locationError, setLocationError] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  

  // Get user's current location
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError('');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            coordinates: [77.5946, 12.9716]
          });
          setIsGettingLocation(false);
        },
        (error) => {
          setLocationError('Unable to get location. Using default location.');
          setIsGettingLocation(false);
          console.log(error)
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
      setIsGettingLocation(false);
    }
  };

  // Auto-detect timezone
  useEffect(() => {
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(detectedTimezone);
  }, []);

  // Get battery color based on percentage
  const getBatteryColor = (percentage) => {
    if (percentage > 50) return 'text-green-500';
    if (percentage > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Get battery icon fill
  const getBatteryFill = (percentage) => {
    if (percentage > 75) return 'fill-green-500';
    if (percentage > 50) return 'fill-yellow-500';
    if (percentage > 25) return 'fill-orange-500';
    return 'fill-red-500';
  };

  // Common timezones for dropdown
  const commonTimezones = [
    'Asia/Kolkata',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
    'UTC'
  ];

  const handleai=async()=>{
    try{
        const resonse=await axios.post(serverUrl + "/api/stations/recommend" , {
            batteryPercentage: batteryPercentage,
          rangeLeft: rangeLeft,
          currentLocation: {
            coordinates: [77.5946,12.9716] // <--- FIX HERE
        },
        },{withCredentials:true})
        navigator('/aidashboard')
        console.log(resonse.data);
    }catch(error){
        console.error("Error fetching AI recommendations:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Vehicle Dashboard</h1>
          <p className="text-gray-600">Monitor your battery and range status</p>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Battery Status Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Battery Status</h2>
              <Battery className={`w-8 h-8 ${getBatteryColor(batteryPercentage)} ${getBatteryFill(batteryPercentage)}`} />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Battery Level</span>
                <span className={`text-sm font-bold ${getBatteryColor(batteryPercentage)}`}>
                  {batteryPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    batteryPercentage > 50 ? 'bg-green-500' : 
                    batteryPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${batteryPercentage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Set Battery Percentage
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={batteryPercentage}
                onChange={(e) => setBatteryPercentage(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Range Status Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Range Status</h2>
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Range Remaining</span>
                <span className="text-sm font-bold text-blue-600">{rangeLeft} km</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${Math.min(rangeLeft, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Set Range (km)
              </label>
              <input
                type="number"
                min="0"
                max="500"
                value={rangeLeft}
                onChange={(e) => setRangeLeft(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter range in km"
              />
            </div>
          </div>
        </div>

        {/* Location and Timezone Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Location Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Current Location</h2>
              <MapPin className="w-8 h-8 text-green-500" />
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Coordinates</div>
              <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
                <div>Longitude: {77.5946}</div>
                <div>Latitude: { 12.9716}</div>
              </div>
            </div>

            <button
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                isGettingLocation 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
              } text-white`}
            >
              {isGettingLocation ? 'Getting Location...' : 'Update Location'}
            </button>

            {locationError && (
              <div className="mt-2 text-sm text-red-600">
                {locationError}
              </div>
            )}
          </div>

          {/* Timezone Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Timezone</h2>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Current Timezone</div>
              <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
                {timezone}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {commonTimezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Output */}
       <button className=' p-5 bg-green-200' onClick={()=>handleai()}>
        Get Ai Recomendation
       </button>
      </div>
    </div>
  );
}