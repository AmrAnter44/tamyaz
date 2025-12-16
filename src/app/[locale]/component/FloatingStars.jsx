"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function FloatingStars() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const stars = [
    { right: '10%', top: '15%', size: 100, duration: 8 },
    { right: '80%', top: '25%', size: 80, duration: 10 },
    { right: '50%', top: '60%', size: 90, duration: 9 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            right: star.right,
            top: star.top,
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.15, 1],
              x: [0, 20, -20, 0],
              y: [0, -15, 15, 0],
            }}
            transition={{
              rotate: {
                duration: star.duration,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              x: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{
              transformStyle: 'preserve-3d',
              filter: 'drop-shadow(0 0 20px rgba(253, 224, 71, 0.6))',
            }}
          >
            <motion.div
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 10 + index * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <Star
                size={star.size}
                className="text-yellow-300 fill-yellow-300"
                strokeWidth={2}
                style={{
                  filter: 'brightness(1.1)',
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
