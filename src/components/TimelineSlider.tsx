import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./Timeline.css";

// Import page components
import RBC1 from "../pages/RBC1";
import RBC2 from "../pages/RBC2";
import KBH from "../pages/KBH";
import BorealisAI from '../pages/Borealis';
import Intuit from '../pages/Intuit';

const TimelineSlider: React.FC = () => {
  


  const components: JSX.Element[] = [<Intuit/>, <BorealisAI />,  <RBC1 />, <RBC2 />,<KBH />, ];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragPosition, setDragPosition] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const rocketshipRef = useRef<HTMLImageElement | null>(null);

  // Repositions pointer whenever index changes
  const repositionRocket = (index: number): void => {
    if (rocketshipRef.current && timelineRef.current) {
      const timelineWidth = timelineRef.current.offsetWidth;
      const maxPosition = timelineWidth - rocketshipRef.current.offsetWidth;
      const newPosition = (index / (components.length - 1)) * maxPosition;
      rocketshipRef.current.style.left = `${newPosition}px`;
    }
  };

  useEffect(() => {
    repositionRocket(currentIndex);
  }, [currentIndex]);

  // Handle drag start
  const startDrag = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    const clientX =
      event.type === "touchstart"
        ? (event as React.TouchEvent<HTMLDivElement>).touches[0].clientX
        : (event as React.MouseEvent<HTMLDivElement>).clientX;
    setDragPosition(clientX);
  };

  // Handle drag movement
  const handleDrag = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void => {
    if (!isDragging) return;
    const clientX =
      event.type === "touchmove"
        ? (event as React.TouchEvent<HTMLDivElement>).touches[0].clientX
        : (event as React.MouseEvent<HTMLDivElement>).clientX;
    const deltaX = clientX - dragPosition;

    if (Math.abs(deltaX) > 50) {
      const direction = deltaX > 0 ? 1 : -1;
      const newIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        components.length - 1
      );
      setCurrentIndex(newIndex);
      setDragPosition(clientX);
      setIsDragging(false);
    }
  };

  // End drag
  const endDrag = (): void => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  // Arrow button handlers
  const handlePrev = (): void => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = (): void => {
    setCurrentIndex((prev) => Math.min(prev + 1, components.length - 1));
  };

  // Keyboard support for the slider area
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCurrentIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setCurrentIndex(components.length - 1);
    }
  };

  return (
    <div className="timeline-container">
      <div
        className="timeline-line"
        ref={timelineRef}
        onMouseDown={startDrag}
        onMouseMove={handleDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={startDrag}
        onTouchMove={handleDrag}
        onTouchEnd={endDrag}
        tabIndex={0}
        role="slider"
        aria-label="Career timeline"
        aria-valuemin={0}
        aria-valuemax={components.length - 1}
        aria-valuenow={currentIndex}
        aria-controls="timeline-slider-track"
        onKeyDown={handleKeyDown}
      >
        <div className="timeline-header">
          <button className="arrow-button" aria-label="Previous" onClick={handlePrev}>&lt;</button>
          <h2 className = "timelineheader" style={{ textAlign: "center", color: "var(--color-brand)", userSelect: "none", margin: "0 10px" }}>
            Work
          </h2>
          <button className="arrow-button" aria-label="Next" onClick={handleNext}>&gt;</button>
        </div>

        <img
          src="/slider.svg"
          className="rocketship"
          ref={rocketshipRef}
          alt="Timeline handle"
        />
      </div>

      {/* Sliding Content */}
      <div className="slider-content">
        <motion.div
          id="timeline-slider-track"
          className="slider-track"
          animate={{ x: `-${currentIndex * 100}vw` }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {components.map((Component, index: number) => (
            <div
              key={index}
              className={`slider-item ${index === currentIndex ? 'active' : ''}`}
              aria-hidden={index !== currentIndex}
            >
              {Component}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineSlider;
