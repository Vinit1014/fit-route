import { useEffect } from 'react';

export function useWakeLock(active: boolean) {
  useEffect(() => {
    let wakeLock: any = null;

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await (navigator as any).wakeLock.request('screen');
          console.log('Wake lock is active');
        } else {
          console.warn('Wake Lock API not supported');
        }
      } catch (err) {
        console.error('Wake Lock error:', err);
      }
    };

    if (active) {
      requestWakeLock();
    }

    return () => {
      if (wakeLock) {
        wakeLock.release()
          .then(() => console.log('Wake lock released'))
          .catch((err: any) => console.error('Error releasing Wake Lock:', err));
      }
    };
  }, [active]);
}
