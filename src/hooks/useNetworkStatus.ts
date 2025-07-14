import { useEffect, useState } from 'react';

export function useNetworkStatus() {
  const [networkType, setNetworkType] = useState<string>('unknown');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

    const updateNetworkInfo = () => {
      if (connection && connection.effectiveType) {
        setNetworkType(connection.effectiveType);
      }
      setIsOnline(navigator.onLine);
    };

    updateNetworkInfo(); // initial set

    window.addEventListener('online', updateNetworkInfo);
    window.addEventListener('offline', updateNetworkInfo);

    if (connection) {
      connection.addEventListener('change', updateNetworkInfo);
    }

    return () => {
      window.removeEventListener('online', updateNetworkInfo);
      window.removeEventListener('offline', updateNetworkInfo);
      if (connection) {
        connection.removeEventListener('change', updateNetworkInfo);
      }
    };
  }, []);

  return { networkType, isOnline };
}
