"use client";

import { useState, useEffect } from "react";

export default function AnimatedTitle() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const titles = ["WhatsUpToday", "오늘의 기분"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentTitle((prev) => (prev + 1) % titles.length);
        setIsAnimating(false);
      }, 300); // 애니메이션 중간에 텍스트 변경
    }, 3000); // 3초마다 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-12 flex items-center justify-center mb-2">
      <h1
        className={`text-3xl font-bold text-foreground transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
      >
        {titles[currentTitle]}
      </h1>
    </div>
  );
}
