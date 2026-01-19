import { useState } from 'react';
import './PortfolioCarousel.css';

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  iframeUrl?: string;
  buttonColor: string;
  buttonLink: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Lyrical',
    image: '/Portfolio/Lyrical.svg',
    iframeUrl: 'https://music.shirleyproject.com/',
    buttonColor: '#a15ef0',
    buttonLink: 'https://music.shirleyproject.com/',
  },
  {
    id: 2,
    title: 'Wisest',
    image: '/Portfolio/Wisest.svg',
    iframeUrl: 'https://wisests.shirleyproject.com/decision-maker',
    buttonColor: '#d2514d',
    buttonLink: 'https://wisests.shirleyproject.com/',
  },
  {
    id: 3,
    title: 'Affirmly',
    image: '/Portfolio/Affirmly.svg',
    buttonColor: '#8c97ab',
    buttonLink: 'https://github.com/shirly8/affirmly',
  },
  {
    id: 4,
    title: 'Overtailored',
    image: '/Portfolio/Overtailored.svg',
    buttonColor: '#000000',
    buttonLink: 'https://github.com/Shirly8/OverTailored',
  },
  {
    id: 5,
    title: 'Servicer',
    image: '/Portfolio/Servicer.svg',
    buttonColor: '#446074',
    buttonLink: 'https://servicer.vercel.app/',
  },
];

export default function PortfolioCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? portfolioItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === portfolioItems.length - 1 ? 0 : prev + 1));
  };

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
        <div className={`carousel-content ${currentItem.iframeUrl ? 'has-iframe' : ''}`}>
          <img src={currentItem.image} alt={currentItem.title} className="device-image" />
          {currentItem.iframeUrl && (
            <div className="iframe-overlay">
              <iframe
                src={currentItem.iframeUrl}
                title={currentItem.title}
                className="embedded-iframe"
              />
            </div>
          )}
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
}
