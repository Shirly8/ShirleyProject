import React, { useState, useRef } from 'react';
import './ImageModal.css';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageSrc, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const viewerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 1));

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && viewerRef.current) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setOffset({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const isRBCSmallImage = imageSrc.includes('model.png');
  const isRBCPOCImage = imageSrc.includes('sharepoint.png') || imageSrc.includes('shift.png');

  return (
    <div className="image-modal-overlay" onClick={onClose} role="presentation">
      <div className={`image-modal-content ${isRBCSmallImage ? 'rbc-small' : isRBCPOCImage ? 'rbc-poc' : 'default-size'}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Image viewer">
        <div
          ref={viewerRef}
          className="image-modal-viewer"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >
          <img
            src={imageSrc}
            alt="Enlarged view"
            className="image-modal-image"
            draggable={false}
            style={{
              transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
              userSelect: 'none'
            }}
          />
        </div>
        <div className="image-modal-controls">
          <button onClick={handleZoomOut} aria-label="Zoom out" className="zoom-btn">−</button>
          <span className="zoom-level">{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} aria-label="Zoom in" className="zoom-btn">+</button>
        </div>
        <button className="image-modal-close" onClick={onClose} aria-label="Close image viewer">Close</button>
      </div>
    </div>
  );
};

export default ImageModal;
