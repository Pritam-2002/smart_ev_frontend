import { useEffect } from "react";
import {
  BadgeCheck,
  Clock,
  MapPin,
  Zap,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StationRecommendationCard = ({ station }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("here is the data coming", station);
  }, [station]);

  if (!station)
    return (
      <div className="text-center text-gray-400 text-lg mt-20">
        No station data available.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6">
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-3xl p-8 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-4 flex items-center gap-3">
          <BadgeCheck className="text-green-500" size={28} />
          <span>Recommended Station</span>
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
          {station.reason}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
          <InfoBox
            icon={<Clock size={18} className="text-blue-600" />}
            label="Arrival Time"
            value={station.estimatedArrivalTime}
            bg="bg-blue-50"
            border="border-blue-100"
          />
          <InfoBox
            icon={<MapPin size={18} className="text-green-600" />}
            label="Search Radius"
            value={`${station.searchRadius} meters`}
            bg="bg-green-50"
            border="border-green-100"
          />
          <InfoBox
            icon={<Zap size={18} className="text-yellow-600" />}
            label="Urgency Level"
            value={station.urgencyLevel}
            bg="bg-yellow-50"
            border="border-yellow-100"
          />
          <InfoBox
            icon={<AlertTriangle size={18} className="text-purple-600" />}
            label="Confidence Score"
            value={`${station.confidence}/10`}
            bg="bg-purple-50"
            border="border-purple-100"
          />
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 col-span-1 sm:col-span-2">
            <div className="text-gray-600 flex items-center gap-2 font-medium">
              <MapPin size={18} className="text-red-600" />
              <span>Alternative Station:</span>
              <span className="ml-1 font-semibold text-gray-800">{station.alternativeStation}</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-400 text-right">
          Analyzed {station.totalStationsAnalyzed} stations at{" "}
          {new Date(station.timestamp).toLocaleString()}
        </p>
      </div>

      {/* Premium Button Section */}
      <div className="mt-8 relative bg-white/80 border border-yellow-200 rounded-2xl shadow-md px-6 py-6 backdrop-blur-md">
        <button
          disabled
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-500 to-gray-700 text-white text-lg font-semibold rounded-xl shadow-lg cursor-not-allowed opacity-70"
        >
          <Lock className="h-5 w-5" />
          <span>Get Directions</span>
        </button>

        {/* Premium Badge */}
        <span className="absolute -top-3 right-5 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full shadow">
          Premium
        </span>

        <p className="text-center text-sm text-gray-500 mt-3 italic">
          This feature is available only to premium users.
        </p>
      </div>
    </div>
  );
};

const InfoBox = ({ icon, label, value, bg, border }) => (
  <div className={`${bg} p-4 rounded-xl border ${border}`}>
    <div className="text-gray-600 flex items-center gap-2">
      {icon}
      <strong>{label}:</strong>
      <span className="ml-1 font-medium text-gray-800">{value}</span>
    </div>
  </div>
);

export default StationRecommendationCard;
