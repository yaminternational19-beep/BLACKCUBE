'use client';

import { useEffect, useState } from 'react';
const CustomCursor = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    const updateCursor = e => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .hover-glow, .hover-glow-card');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    document.addEventListener('mousemove', updateCursor);
    return () => {
      document.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  return <div className={`cursor ${isHovering ? 'hover' : ''}`} style={{
    left: position.x - 10,
    top: position.y - 10
  }} />;
};
export default CustomCursor;