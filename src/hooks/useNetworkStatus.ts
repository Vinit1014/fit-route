import { useEffect, useState } from 'react';

export function useNetworkStatus() {
  const [networkType, setNetworkType] = useState<string>('unknown');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const connection = (navigator as any).connection || (navigator as any).webkitConnection;
    console.log("Connection is ", connection);
    
    const updateNetworkInfo = () => {
      if (connection && connection.effectiveType) {
        setNetworkType(connection.effectiveType);
      }
      setIsOnline(navigator.onLine);
    };

    updateNetworkInfo();

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
