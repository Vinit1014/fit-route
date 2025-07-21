import { useState } from "react"
import { useGeoTracker } from "../hooks/useGeoTracker"
import { useNetworkStatus } from "../hooks/useNetworkStatus"
import { useWakeLock } from "../hooks/useWakeLock"
import RouteCanvas from "./RouteCanvas"

export default function Tracker() {
  const [tracking, setTracking] = useState(false)
  const { positions, error } = useGeoTracker(tracking)
  const { networkType, isOnline } = useNetworkStatus()

  useWakeLock(tracking)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            className={`
              px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg
              ${
                tracking
                  ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              }
            `}
            onClick={() => setTracking((prev) => !prev)}
          >
            {tracking ? "🛑 Stop Tracking" : "Start Tracking"}
          </button>

          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
            <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}></div>
            <span className="text-sm font-medium">
              {isOnline ? (
                <span className="text-green-700">{networkType.toUpperCase()} Online</span>
              ) : (
                <span className="text-red-700">Offline</span>
              )}
            </span>
          </div>
        </div>

        {(networkType === "2g" || !isOnline) && (
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-xl">
            <div className="flex items-center gap-2">
              <p className="text-yellow-800 font-medium">Low or no connectivity — GPS updates may be delayed.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-gradient-to-r from-red-100 to-pink-100 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">📍 Your Route</h2>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {positions.length} points
          </div>
        </div>
        <RouteCanvas positions={positions} />
      </div>

      {positions.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-400 to-blue-600">
            <h3 className="text-white font-bold text-lg">Position History</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            <div className="divide-y divide-gray-100">
              {positions
                .slice(-10)
                .reverse()
                .map((pos, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-sm text-gray-500">Point {positions.length - idx}</span>
                      </div>
                      <div className="text-sm font-mono text-gray-700 sm:ml-auto">
                        {pos.coords.latitude.toFixed(6)}, {pos.coords.longitude.toFixed(6)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {positions.length > 10 && (
              <div className="p-4 text-center text-gray-500 text-sm">... and {positions.length - 10} more points</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
