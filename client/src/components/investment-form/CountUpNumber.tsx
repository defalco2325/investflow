import { useEffect, useState } from "react";

interface CountUpNumberProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUpNumber({ 
  end, 
  duration = 500, 
  decimals = 0, 
  prefix = "", 
  suffix = "",
  className = ""
}: CountUpNumberProps) {
  const [count, setCount] = useState(end);

  useEffect(() => {
    setCount(0); // Reset to 0 when end changes
    let startTime: number | null = null;
    const startValue = 0;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = startValue + (end - startValue) * easeOutQuart;
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
    
    return () => {
      setCount(end);
    };
  }, [end, duration]);

  const formattedNumber = count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <span className={className}>
      {prefix}{formattedNumber}{suffix}
    </span>
  );
}
