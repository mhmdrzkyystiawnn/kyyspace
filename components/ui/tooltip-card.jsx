"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Tooltip = ({
  content,
  children,
  containerClassName
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isVisible && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isVisible, content]);

  const calculatePosition = useCallback((mouseX, mouseY) => {
    if (!contentRef.current || !containerRef.current) {
      return { x: mouseX + 12, y: mouseY + 12 };
    }

    const tooltip = contentRef.current;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const tooltipWidth = 240;
    const tooltipHeight = tooltip.scrollHeight;

    const absoluteX = containerRect.left + mouseX;
    const absoluteY = containerRect.top + mouseY;

    let finalX = mouseX + 12;
    let finalY = mouseY + 12;

    if (absoluteX + 12 + tooltipWidth > viewportWidth) {
      finalX = mouseX - tooltipWidth - 12;
    }

    if (absoluteX + finalX < 0) {
      finalX = -containerRect.left + 12;
    }

    if (absoluteY + 12 + tooltipHeight > viewportHeight) {
      finalY = mouseY - tooltipHeight - 12;
    }

    if (absoluteY + finalY < 0) {
      finalY = -containerRect.top + 12;
    }

    return { x: finalX, y: finalY };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isVisible) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const newPosition = calculatePosition(mouseX, mouseY);
    setPosition(newPosition);
  }, [isVisible, calculatePosition]);

  const handleMouseEnter = useCallback((e) => {
    setIsVisible(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const newPosition = calculatePosition(mouseX, mouseY);
    setPosition(newPosition);
  }, [calculatePosition]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;
    const newPosition = calculatePosition(mouseX, mouseY);
    setPosition(newPosition);
    setIsVisible(true);
  }, [calculatePosition]);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      setIsVisible(false);
      setPosition({ x: 0, y: 0 });
    }, 2000);
  }, []);

  const handleClick = useCallback((e) => {
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      if (isVisible) {
        setIsVisible(false);
        setPosition({ x: 0, y: 0 });
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const newPosition = calculatePosition(mouseX, mouseY);
        setPosition(newPosition);
        setIsVisible(true);
      }
    }
  }, [isVisible, calculatePosition]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${containerClassName || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{
    type: "spring",
    stiffness: 200,
    damping: 20,
  }}
className="pointer-events-none absolute z-50"
  style={{
    top: position.y,
    left: position.x,
  }}
>
  <div className="tooltip-glass">
    <div ref={contentRef} className="tooltip-glass-content">
      {content}
    </div>
  </div>
</motion.div>

        )}
      </AnimatePresence>
    </div>
  );
};