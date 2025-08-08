import React, { useState, useRef, useEffect } from "react";
import "./Timeline.css";
import Slider from '../../WorkAssets/slider.svg';

// Import page components
import RBC1 from "../pages/RBC1";
import RBC2 from "../pages/RBC2";
import KBH from "../pages/KBH";
import BorealisAI from '../pages/Borealis';

const TimelineSlider: React.FC = () => {
  


  const components: JSX.Element[] = [<BorealisAI />,  <RBC1 />, <RBC2 />,<KBH />, ];
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
      >
        <div className="timeline-header">
          <button className="arrow-button" onClick={handlePrev}>&lt;</button>
          <h2 className = "timelineheader" style={{ textAlign: "center", color: "#ed9ab0", userSelect: "none", margin: "0 10px" }}>
            My Professional Journey
          </h2>
          <button className="arrow-button" onClick={handleNext}>&gt;</button>
        </div>

        <img
          src={Slider}
          className="rocketship"
          ref={rocketshipRef}
        />
      </div>

      {/* Sliding Content */}
      <div className="slider-content">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${currentIndex * 100}vw)`,
            transition: "transform 2.5s ease-out",
          }}
        >
          {components.map((Component, index: number) => (
            <div key={index} className="slider-item">
              {Component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineSlider;
