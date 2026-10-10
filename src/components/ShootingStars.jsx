import React, { useState, useEffect } from "react";

export const ShootingStars = ({
  minSpeed = 10,
  maxSpeed = 25,
  minDelay = 800,
  maxDelay = 2500,
  starColor = "#ffaa00",
  trailColor = "#ff5500",
  starWidth = 120,
  starHeight = 2,
}) => {
  const [star, setStar] = useState(null);

  useEffect(() => {
    let timeoutId;

    const spawnStar = () => {
      // Pick random entry point along the edge
      const side = Math.floor(Math.random() * 2); // top or left
      const x = side === 0 ? Math.random() * window.innerWidth : 0;
      const y = side === 1 ? Math.random() * window.innerHeight : 0;

      setStar({
        id: Date.now(),
        x,
        y,
        angle: 45, // 45-degree angle downwards right
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      });

      const nextDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutId = setTimeout(spawnStar, nextDelay);
    };

    spawnStar();
    return () => clearTimeout(timeoutId);
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    if (!star) return;

    const frame = requestAnimationFrame(() => {
      const radians = (star.angle * Math.PI) / 180;
      const nextX = star.x + star.speed * Math.cos(radians);
      const nextY = star.y + star.speed * Math.sin(radians);

      // Remove star if it moves out of view
      if (
        nextX > window.innerWidth + starWidth ||
        nextY > window.innerHeight + starWidth
      ) {
        setStar(null);
      } else {
        setStar((prev) => (prev ? { ...prev, x: nextX, y: nextY } : null));
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [star, starWidth]);

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        <linearGradient
          id="shooting-star-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={trailColor} stopOpacity="0" />
          <stop offset="70%" stopColor={trailColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={starColor} stopOpacity="1" />
        </linearGradient>
      </defs>
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth}
          height={starHeight}
          fill="url(#shooting-star-gradient)"
          transform={`rotate(${star.angle}, ${star.x}, ${star.y})`}
          style={{
            filter: `drop-shadow(0px 0px 6px ${starColor})`,
          }}
        />
      )}
    </svg>
  );
};
