import { useEffect, useState } from "react";

export function useGeoTracker(startTracking: boolean) {
  const [positions, setPositions] = useState<GeolocationPosition[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let watchId: number | null = null;

    if (startTracking && "geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setPositions((prev) => [...prev, pos]);
        },
        (err) => setError(err.message),
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 5000,
        }
      );
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        console.log("Tracking stopped & watch cleared");
      }
    };
  }, [startTracking]);

  return { positions, error };
}
