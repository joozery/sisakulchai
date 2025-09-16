
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Palette, Car, Gem, TreeDeciduous, Shield, Factory, Paintbrush, SprayCan } from 'lucide-react';

const categories = [
  { name: 'สีทาบ้าน', icon: <Palette />, path: '/products/สีทาบ้าน' },
  { name: 'สีรถยนต์', icon: <Car />, path: '/products/สีรถยนต์' },
  { name: 'สีทอง', icon: <Gem />, path: '/products/สีทอง' },
  { name: 'สีทาไม้', icon: <TreeDeciduous />, path: '/products/สีทาไม้' },
  { name: 'สีกันสนิม', icon: <Shield />, path: '/products/สีกันสนิม' },
  { name: 'สีอุตสาหกรรม', icon: <Factory />, path: '/products/สีอุตสาหกรรม' },
  { name: 'อุปกรณ์ทาสี', icon: <Paintbrush />, path: '/products/อุปกรณ์ทาสี' },
  { name: 'สีสเปรย์', icon: <SprayCan />, path: '/products/สีสเปรย์' },
];

const CategorySlider = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  };

  const scroll = (direction) => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = direction * (el.clientWidth * 0.75);
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      checkScrollability();
    }

    return () => {
      if (el) {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      }
    };
  }, []);

  return (
    <div className="bg-white border-y border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
        
        <div
          ref={scrollContainerRef}
          className={`flex overflow-x-auto scrollbar-hide space-x-4 md:space-x-6 py-4 ${!canScrollLeft && !canScrollRight ? 'justify-center' : ''}`}
        >
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="flex-shrink-0"
            >
              <motion.div
                className="flex items-center space-x-3 px-4 py-2.5 rounded-full bg-gray-100/80 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 group"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors">
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                  {category.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CategorySlider;
