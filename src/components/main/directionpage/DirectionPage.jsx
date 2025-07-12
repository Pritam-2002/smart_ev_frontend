import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";

import polyline from "@mapbox/polyline";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon issue
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 👇 Import the icons as ES Modules
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useLocation } from "react-router-dom";

// 👇 Fix the missing default icon bug in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const RouteHighlighterMap = () => {

   const location = useLocation();
  const stationlatlong = location.state?.coordinates;
  const [coordinates, setCoordinates] = useState([]);
  const [routeData, setRouteData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

const fetchRouteFromAPI = async (destinationCoords) => {
  setIsLoading(true);
  setError(null);

  const [destination_lng, destination_lat] = destinationCoords; // deconstruct properly

  try {
    const response = await fetch("http://localhost:3000/api/driver/getdirection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin_lat: 22.5958,
        origin_lng: 88.4795,
        destination_lat,
        destination_lng,
        mode: "driving",
      }),
    });

    const data = await response.json();
    console.log("here is the data", data);

    if (!response.ok || !data?.data?.routes?.[0]?.overview_polyline) {
      throw new Error(data.message || "Invalid route data");
    }

    processRouteData(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};


  const processRouteData = useCallback((data) => {
    try {
      const encoded = data.data.routes[0].overview_polyline;
      const decoded = polyline.decode(encoded); // Returns [lat, lng] array
      setCoordinates(decoded);
      setRouteData(data);
    } catch (err) {
      setError("Failed to decode polyline");
    }
  }, []);

  useEffect(()=>{
    fetchRouteFromAPI(stationlatlong)
    console.log("here is data coming==>",stationlatlong)
  },[])
  useEffect(()=>{
    console.log("here is testing",)
  })

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">🗺️ Most Optimal Route</h1>

      {/* <div className="mb-6">
        <button
          onClick={fetchRouteFrmAPI}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Load Route from API
        </button>
      </div> */}

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {coordinates.length > 0 && (
        <MapContainer
          center={coordinates[0]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Polyline positions={coordinates} color="blue" weight={4} />

          {/* Start Marker */}
          <Marker position={coordinates[0]}>
            <Popup>Start Point</Popup>
          </Marker>

          {/* End Marker */}
          <Marker position={coordinates[coordinates.length - 1]}>
            <Popup>End Point</Popup>
          </Marker>
        </MapContainer>
      )}

      {routeData && (
        <div className="mt-6 bg-blue-50 p-4 rounded">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Route Information</h3>
          <p><strong>Distance:</strong> {routeData.data.routes[0].legs?.[0]?.readable_distance|| "N/A"}km</p>
          <p><strong>Duration:</strong> {routeData.data.routes[0].legs?.[0]?.readable_duration || "N/A"}</p>
        </div>
      )}
    </div>
  );
};

export default RouteHighlighterMap;
