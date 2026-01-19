import { useEffect, useRef, useState } from 'react';
import './Sparkles.css';

interface Sparkle {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  swayX: number;
}

interface SparklesProps {
  intensity?: 'light' | 'heavy';
  lightMode?: boolean;
}

export default function Sparkles({ intensity = 'light', lightMode = false }: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const idRef = useRef(0);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const config = {
    light: {
      spawnRate: 10,
      sizeMin: 2,
      sizeMax: 4,
    },
    heavy: {
      spawnRate: 5,
      sizeMin: 2,
      sizeMax: 5,
    },
  };

  const cfg = config[intensity];

  useEffect(() => {
    // Light mode sparkles always show, don't require scroll
    if (lightMode) {
      setIsNearBottom(true);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const isBottom = scrollPosition >= pageHeight - 300;

      setIsNearBottom(isBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lightMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const createSparkle = () => {
      const colors = ['#f88dd9', '#f88dd9', '#f88dd9', '#be8ed4'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const sparkle: Sparkle = {
        id: idRef.current++,
        left: Math.random() * 100,
        duration: 3 + Math.random() * 2.5,
        delay: Math.random() * 0.2,
        size: cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin),
        swayX: (Math.random() - 0.5) * 150,
      };

      sparklesRef.current.push(sparkle);

      const element = document.createElement('div');
      element.className = 'sparkle';
      element.style.left = `${sparkle.left}%`;
      element.style.width = `${sparkle.size}px`;
      element.style.height = `${sparkle.size}px`;
      element.style.setProperty('--sway', `${sparkle.swayX}px`);
      element.style.setProperty('--color', randomColor);
      const animationName = lightMode ? 'sparkle-light' : 'sparkle-rise';
      element.style.animation = `${animationName} ${sparkle.duration}s ease-out ${sparkle.delay}s forwards`;

      container.appendChild(element);

      // Remove element after animation completes
      setTimeout(() => {
        element.remove();
        sparklesRef.current = sparklesRef.current.filter(s => s.id !== sparkle.id);
      }, (sparkle.duration + sparkle.delay) * 1000);
    };

    // Only create sparkles when near bottom
    if (isNearBottom) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(createSparkle, cfg.spawnRate);
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isNearBottom, cfg.spawnRate]);

  return <div className={`sparkles-container ${lightMode ? 'light-mode' : ''}`} ref={containerRef}></div>;
}
