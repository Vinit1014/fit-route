// import { useEffect, useRef } from 'react';

// interface RouteCanvasProps {
//   positions: GeolocationPosition[];
// }

// export default function RouteCanvas({ positions }: RouteCanvasProps) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   const mapToCanvas = (
//     lat: number,
//     lng: number,
//     baseLat: number,
//     baseLng: number
//   ) => {
//     const scale = 100000; // Adjust if needed
//     return {
//       x: (lng - baseLng) * scale + 300,
//       y: (lat - baseLat) * -scale + 300,
//     };
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas || positions.length < 1) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     const baseLat = positions[0].coords.latitude;
//     const baseLng = positions[0].coords.longitude;

//     // Draw red dots for every point
//     ctx.fillStyle = 'red';
//     positions.forEach((pos) => {
//       const { x, y } = mapToCanvas(
//         pos.coords.latitude,
//         pos.coords.longitude,
//         baseLat,
//         baseLng
//       );
//       ctx.beginPath();
//       ctx.arc(x, y, 3, 0, 2 * Math.PI);
//       ctx.fill();
//     });

//     // Draw path line
//     ctx.strokeStyle = '#2563eb';
//     ctx.lineWidth = 2;
//     // ctx.beginPath();
//     // positions.forEach((pos, i) => {
//     //   const { x, y } = mapToCanvas(
//     //     pos.coords.latitude,
//     //     pos.coords.longitude,
//     //     baseLat,
//     //     baseLng
//     //   );
//     //   if (i === 0) {
//     //     ctx.moveTo(x, y);
//     //   } else {
//     //     ctx.lineTo(x, y);
//     //   }
//     // });
//     // ctx.stroke();

//     ctx.beginPath();

//     // If movement is small, draw a tiny offset line to visualize
//     if (positions.length === 1) return;

//     let lastX: number | null = null;
//     let lastY: number | null = null;

//     positions.forEach((pos, i) => {
//     const { x, y } = mapToCanvas(
//         pos.coords.latitude,
//         pos.coords.longitude,
//         baseLat,
//         baseLng
//     );

//     if (i === 0) {
//         ctx.moveTo(x, y);
//     } else {
//         if (Math.abs(x - (lastX ?? 0)) > 1 || Math.abs(y - (lastY ?? 0)) > 1) {
//         ctx.lineTo(x, y);
//         } else {
//         // Add tiny bump to make it visible
//         ctx.lineTo(x + 0.5, y + 0.5);
//         }
//     }

//     lastX = x;
//     lastY = y;
//     });

//     ctx.stroke();
//   }, [positions]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={600}
//       height={600}
//       className="mt-6 border-2 border-black bg-white"
//     />
//   );
// }

import { useEffect, useRef } from "react"

interface RouteCanvasProps {
  positions: GeolocationPosition[]
}

export default function RouteCanvas({ positions }: RouteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const mapToCanvas = (
    lat: number,
    lng: number,
    baseLat: number,
    baseLng: number,
    canvasWidth: number,
    canvasHeight: number,
  ) => {
    const scale = 100000 
    return {
      x: (lng - baseLng) * scale + canvasWidth / 2,
      y: (lat - baseLat) * -scale + canvasHeight / 2,
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || positions.length < 1) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const container = canvas.parentElement
    if (container) {
      const containerWidth = container.clientWidth
      const size = Math.min(containerWidth - 32, 600)
      canvas.width = size
      canvas.height = size
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const baseLat = positions[0].coords.latitude
    const baseLng = positions[0].coords.longitude

    if (positions.length > 1) {
      ctx.strokeStyle = "#679cf2ff"
      ctx.lineWidth = 3
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      ctx.shadowColor = "rgba(59, 130, 246, 0.3)"
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 2

      ctx.beginPath()
      let lastX: number | null = null
      let lastY: number | null = null

      positions.forEach((pos, i) => {
        const { x, y } = mapToCanvas(
          pos.coords.latitude,
          pos.coords.longitude,
          baseLat,
          baseLng,
          canvas.width,
          canvas.height,
        )

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          if (Math.abs(x - (lastX ?? 0)) > 1 || Math.abs(y - (lastY ?? 0)) > 1) {
            ctx.lineTo(x, y)
          } else {
            ctx.lineTo(x + 0.5, y + 0.5)
          }
        }
        lastX = x
        lastY = y
      })
      ctx.stroke()

      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
    }

    positions.forEach((pos, index) => {
      const { x, y } = mapToCanvas(
        pos.coords.latitude,
        pos.coords.longitude,
        baseLat,
        baseLng,
        canvas.width,
        canvas.height,
      )

      if (index === 0) {
        ctx.fillStyle = "#10b981"
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, 2 * Math.PI)
        ctx.fill()
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, 2 * Math.PI)
        ctx.fill()
      } else if (index === positions.length - 1 && positions.length > 1) {
        ctx.fillStyle = "#ef4444"
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, 2 * Math.PI)
        ctx.fill()
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, 2 * Math.PI)
        ctx.fill()
      } else {
        ctx.fillStyle = "#5b94f0ff"
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, 2 * Math.PI)
        ctx.fill()
      }
    })

    if (positions.length > 1) {
      ctx.font = "12px system-ui"
      ctx.textAlign = "left"

      ctx.fillStyle = "#10b981"
      ctx.beginPath()
      ctx.arc(20, canvas.height - 40, 6, 0, 2 * Math.PI)
      ctx.fill()
      ctx.fillStyle = "#374151"
      ctx.fillText("Start", 35, canvas.height - 35)

      ctx.fillStyle = "#ef4444"
      ctx.beginPath()
      ctx.arc(20, canvas.height - 20, 6, 0, 2 * Math.PI)
      ctx.fill()
      ctx.fillStyle = "#374151"
      ctx.fillText("Current", 35, canvas.height - 15)
    }
  }, [positions])

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-200 rounded-xl bg-gradient-to-br from-blue-50 to-green-50 shadow-inner"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}
