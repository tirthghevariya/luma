"use client";

import { useEffect, useRef } from 'react';

export default function Avatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let time = 0;
    const draw = () => {
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);

      // Draw a pulsating circle
      const radius = 40 + 5 * Math.sin(time * 0.05);
      context.beginPath();
      context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
      context.fillStyle = 'rgba(168, 85, 247, 0.5)';
      context.fill();

      // Draw a smaller, more solid circle
      context.beginPath();
      context.arc(width / 2, height / 2, 20, 0, 2 * Math.PI);
      context.fillStyle = 'rgba(168, 85, 247, 1)';
      context.fill();

      time++;
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} width="200" height="200" />;
}
