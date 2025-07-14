import { useState } from "react";
import { useGeoTracker } from "../hooks/useGeoTracker";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { useWakeLock } from "../hooks/useWakeLock";
import RouteCanvas from '../components/RouteCanvas';

export default function App() {
  const [tracking, setTracking] = useState(false);
  const { positions, error } = useGeoTracker(tracking);
  const { networkType, isOnline } = useNetworkStatus();

  useWakeLock(tracking);

  return (
    <div className=" p-4 bg-gray-100">
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => setTracking((prev) => !prev)}
      >
        {tracking ? "Stop Tracking" : "Start Tracking"}
      </button>

      <p className="mt-2 text-sm">
        Network: {isOnline ? (
            <span className="text-green-600 font-medium">{networkType} (Online)</span>
        ): (
            <span className="text-red-600 font-medium">Offline</span>
        )}  
      </p>

      {networkType === '2g' || !isOnline ? (
        <div className="mt-2 p-2 bg-yellow-200 text-yellow-800 rounded">
            Low or no connectivity — GPS updates may be delayed.
        </div>
        ) : null}

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <ul className="mt-4">
        {positions.map((pos, idx) => (
          <li key={idx}>
            Lat: {pos.coords.latitude}, Lng: {pos.coords.longitude}
          </li>
        ))}
      </ul>

      <RouteCanvas positions={positions}/>
    </div>
  );
}
