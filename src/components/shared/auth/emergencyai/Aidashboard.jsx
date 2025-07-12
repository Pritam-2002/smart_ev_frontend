import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StationRecommendationCard from './cart/Optimalevstation';

const Dashboard = () => {
  const location = useLocation();
  const stationData = location.state?.stationData;

  useEffect(() => {
    console.log("here is aidashboard data", stationData);
  }, [stationData]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-indigo-700">EV Charging Recommendation</h1>
        {stationData ? (
          <StationRecommendationCard station={stationData} />
        ) : (
          <p className="text-center text-gray-500 mt-8">No station data available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
