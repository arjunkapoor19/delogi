"use client"; // 👈 THIS IS THE ONLY CHANGE NEEDED FOR THE COMPONENT ITSELF

import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const followerCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate3d(${clientX - 8}px, ${clientY - 8}px, 0)`;
      }

      if (followerCursorRef.current) {
        followerCursorRef.current.style.transform = `translate3d(${clientX - 16}px, ${clientY - 16}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={mainCursorRef}
        // 👇 I've added a class here to easily hide it on mobile
        className="custom-cursor-main fixed w-4 h-4 rounded-full bg-blue-500 pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      {/* Follower Cursor */}
      <div
        ref={followerCursorRef}
        // 👇 I've added a class here to easily hide it on mobile
        className="custom-cursor-follower fixed w-8 h-8 rounded-full border border-yellow-400 pointer-events-none z-[9998] opacity-50"
        style={{
          transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;