import { useState, useEffect } from "react";

export function useCountdown(target) {
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor(diff / (1000 * 60 * 60)) % 24,
      m: Math.floor(diff / (1000 * 60)) % 60,
      s: Math.floor(diff / 1000) % 60,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const timer = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
}
