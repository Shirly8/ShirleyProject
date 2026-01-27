import { useState, useEffect, memo, useCallback } from 'react';
import './PortfolioCarousel.css';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  iframeUrl?: string;
  canvaEmbedUrl?: string;
  buttonColor: string;
  buttonLink: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'lyrical',
    description: 'Using Spotify and Genius API to transform music streaming through storytelling.',
    image: '/Portfolio/screen.webp',
    iframeUrl: 'https://music.shirleyproject.com/',
    canvaEmbedUrl: 'https://www.canva.com/design/DAG_E3fn3MM/nSqaw_sDZkCLK8kwb0DIOA/view?embed',
    buttonColor: '#a15ef0',
    buttonLink: 'https://music.shirleyproject.com/',
  },
  {
    id: 2,
    title: 'wisest',
    description: 'A solution to indecisiveness. A multi-criteria decision analysis visualizer with D3.js.',
    image: '/Portfolio/screen.webp',
    iframeUrl: 'https://wisests.shirleyproject.com/demo',
    buttonColor: '#d2514d',
    buttonLink: 'https://wisests.shirleyproject.com/',
  },
  {
    id: 3,
    title: 'oceanBottle',
    description: 'Immersive 3D experience that visualizes your plastic bottle usage.',
    image: '/Portfolio/screen.webp',
    iframeUrl: 'https://ocean-bottle-nine.vercel.app/',
    buttonColor: '#4a90e2',
    buttonLink: 'https://ocean-bottle-nine.vercel.app/',
  },
  {
    id: 4,
    title: 'servicer',
    description: 'Aspect-Based Sentiment Analysis and RAG for service-based businesses.',
    image: '/Portfolio/screen.webp',
    iframeUrl: 'https://servicer.vercel.app/',
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
        <button className="carousel-nav carousel-nav-left" onClick={goToPrevious} aria-label="Previous project">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

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
          {currentItem.canvaEmbedUrl && (
            <div className="canva-embed-wrapper">
              <div className="canva-embed-inner">
                <iframe loading="lazy" style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0}} src={currentItem.canvaEmbedUrl} allowFullScreen></iframe>
              </div>
            </div>
          )}
          <div className="project-info-container">
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
        </div>

        {/* Right Click Area */}
        <button className="carousel-nav carousel-nav-right" onClick={goToNext} aria-label="Next project">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

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
    </div>
  );
};

export default memo(PortfolioCarouselComponent);
