import { useEffect, useRef } from 'react';

interface RouteCanvasProps {
  positions: GeolocationPosition[];
}

export default function RouteCanvas({ positions }: RouteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mapToCanvas = (
    lat: number,
    lng: number,
    baseLat: number,
    baseLng: number
  ) => {
    const scale = 100000; // Adjust if needed
    return {
      x: (lng - baseLng) * scale + 300,
      y: (lat - baseLat) * -scale + 300,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || positions.length < 1) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const baseLat = positions[0].coords.latitude;
    const baseLng = positions[0].coords.longitude;

    // Draw red dots for every point
    ctx.fillStyle = 'red';
    positions.forEach((pos) => {
      const { x, y } = mapToCanvas(
        pos.coords.latitude,
        pos.coords.longitude,
        baseLat,
        baseLng
      );
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw path line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    // ctx.beginPath();
    // positions.forEach((pos, i) => {
    //   const { x, y } = mapToCanvas(
    //     pos.coords.latitude,
    //     pos.coords.longitude,
    //     baseLat,
    //     baseLng
    //   );
    //   if (i === 0) {
    //     ctx.moveTo(x, y);
    //   } else {
    //     ctx.lineTo(x, y);
    //   }
    // });
    // ctx.stroke();

    ctx.beginPath();

    // If movement is small, draw a tiny offset line to visualize
    if (positions.length === 1) return;

    let lastX: number | null = null;
    let lastY: number | null = null;

    positions.forEach((pos, i) => {
    const { x, y } = mapToCanvas(
        pos.coords.latitude,
        pos.coords.longitude,
        baseLat,
        baseLng
    );

    if (i === 0) {
        ctx.moveTo(x, y);
    } else {
        if (Math.abs(x - (lastX ?? 0)) > 1 || Math.abs(y - (lastY ?? 0)) > 1) {
        ctx.lineTo(x, y);
        } else {
        // Add tiny bump to make it visible
        ctx.lineTo(x + 0.5, y + 0.5);
        }
    }

    lastX = x;
    lastY = y;
    });

    ctx.stroke();
  }, [positions]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={600}
      className="mt-6 border-2 border-black bg-white"
    />
  );
}
