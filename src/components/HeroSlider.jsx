
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    imageUrl: 'https://static.wixstatic.com/media/04a779_d9f9616a4d354acdac6efbd94b5737fe~mv2.jpg/v1/fill/w_1331,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/04a779_d9f9616a4d354acdac6efbd94b5737fe~mv2.jpg',
    imageDescription: 'Paint cans and supplies neatly organized',
  },
  {
    imageUrl: 'https://static.wixstatic.com/media/04a779_158ffe39ef044c298ae59bb0a29a96f3~mv2.png/v1/fill/w_1331,h_653,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/04a779_158ffe39ef044c298ae59bb0a29a96f3~mv2.png',
    imageDescription: 'Close-up of a colorful paint texture',
  },
  {
    imageUrl: 'https://static.wixstatic.com/media/04a779_158ffe39ef044c298ae59bb0a29a96f3~mv2.png/v1/fill/w_1331,h_653,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/04a779_158ffe39ef044c298ae59bb0a29a96f3~mv2.png',
    imageDescription: 'Another view of a colorful paint texture',
  }
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const HeroSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = page % slides.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [page]);

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden hero-section">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="absolute w-full h-full"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <img 
            className="w-full h-full object-cover" 
            alt={slides[imageIndex].imageDescription} 
            src={slides[imageIndex].imageUrl}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
        <button onClick={() => paginate(-1)} className="bg-white/30 text-white p-2 rounded-full hover:bg-white/50 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
        <button onClick={() => paginate(1)} className="bg-white/30 text-white p-2 rounded-full hover:bg-white/50 transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > (page % slides.length) ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === (page % slides.length) ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;