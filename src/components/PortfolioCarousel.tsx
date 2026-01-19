import { useState, useEffect, memo, useCallback } from 'react';
import './PortfolioCarousel.css';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  iframeUrl?: string;
  buttonColor: string;
  buttonLink: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'lyrical',
    description: 'Using Spotify and Genius API to transform music streaming through storytelling.',
    image: '/Portfolio/Lyrical.svg',
    iframeUrl: 'https://music.shirleyproject.com/',
    buttonColor: '#a15ef0',
    buttonLink: 'https://music.shirleyproject.com/',
  },
  {
    id: 2,
    title: 'wisest',
    description: 'A solution to indecisiveness. Make better decisions whenever you need to.',
    image: '/Portfolio/Wisest.svg',
    iframeUrl: 'https://wisests.shirleyproject.com/decision-maker',
    buttonColor: '#d2514d',
    buttonLink: 'https://wisests.shirleyproject.com/',
  },
  {
    id: 3,
    title: 'affirmly',
    description: 'An AI therapeutic journaling app using Meta\'s Llama-3 LLM to turn journal entries into positive affirmations.',
    image: '/Portfolio/Affirmly.svg',
    buttonColor: '#8c97ab',
    buttonLink: 'https://github.com/shirly8/affirmly',
  },
  {
    id: 4,
    title: 'overtailored',
    description: 'Tailor CVs and cover letters into professional LaTeX formats effortlessly with the power of Gemini AI.',
    image: '/Portfolio/Overtailored.svg',
    buttonColor: '#000000',
    buttonLink: 'https://github.com/Shirly8/OverTailored',
  },
  {
    id: 5,
    title: 'servicer',
    description: 'AI-powered platform transforming customer service for service-based businesses.',
    image: '/Portfolio/Servicer.svg',
    buttonColor: '#446074',
    buttonLink: 'https://servicer.vercel.app/',
  },
];

const PortfolioCarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images on mount
  useEffect(() => {
    portfolioItems.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  // Reset loaded state when index changes
  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? portfolioItems.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === portfolioItems.length - 1 ? 0 : prev + 1));
  }, []);

  const currentItem = portfolioItems[currentIndex];

  return (
    <div className="portfolio-carousel">
      <div className="carousel-wrapper">
        {/* Left Click Area */}
        <div className="carousel-nav carousel-nav-left" onClick={goToPrevious} title="Previous project">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>

        {/* SVG Image - Full Screen */}
        <div className={`carousel-content ${currentItem.iframeUrl ? 'has-iframe' : ''} ${isLoaded ? 'loaded' : ''}`}>
          <img src={currentItem.image} alt={currentItem.title} className="device-image" loading="lazy" />
          {currentItem.iframeUrl && (
            <div className="iframe-overlay">
              <iframe
                src={currentItem.iframeUrl}
                title={currentItem.title}
                className="embedded-iframe"
              />
            </div>
          )}
          <h2 className="project-title" style={{ color: currentItem.buttonColor }}>
            {currentItem.title}
          </h2>
          <p className="project-description">
            {currentItem.description}
          </p>
          <a
            href={currentItem.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-button"
            style={{ backgroundColor: currentItem.buttonColor }}
          >
            Visit
          </a>
        </div>

        {/* Right Click Area */}
        <div className="carousel-nav carousel-nav-right" onClick={goToNext} title="Next project">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="carousel-indicators">
        {portfolioItems.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(PortfolioCarouselComponent);
