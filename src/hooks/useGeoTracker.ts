import { useEffect, useState } from "react";

export function useGeoTracker(startTracking: boolean) {
  const [positions, setPositions] = useState<GeolocationPosition[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  useEffect(() => {
    if (startTracking && "geolocation" in navigator) {
      const id = navigator.geolocation.watchPosition(
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
      setWatchId(id);
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [startTracking]);

  return { positions, error };
}
