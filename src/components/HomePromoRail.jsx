import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePromoRail = () => {
  const slides = [
    '/assets/promotio.jpg',
    'https://picsum.photos/seed/slide2/1200/500',
    'https://picsum.photos/seed/slide3/1200/500'
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  const go = (dir) => {
    setIndex((prev) => {
      const next = dir === 'next' ? prev + 1 : prev - 1;
      if (next < 0) return slides.length - 1;
      return next % slides.length;
    });
  };

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left big banner */}
          <div className="lg:col-span-2 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="relative h-[220px] md:h-[300px]">
              {slides.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`slide-${i}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    i === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
              <button onClick={() => go('prev')} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/40 text-white p-1.5 rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => go('next')} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/40 text-white p-1.5 rounded-full">
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 flex items-center gap-3">
                <Button asChild size="sm" className="bg-primary">
                  <Link to="/products">
                    ดูรายละเอียด
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <div className="flex gap-1.5">
                  {slides.map((_, i) => (
                    <span
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                        i === index ? 'bg-white' : 'bg-white/50'
                      }`}
                    />)
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {[{ label: 'ผ่อน 0%' }, { label: 'โปรโมชั่น' }, { label: 'ดีลจากพาร์ทเนอร์' }, { label: 'วิธีแลกพอยต์ส่วนลด' }].map(
                (item, idx) => (
                  <div key={idx} className="py-3 text-center text-sm md:text-base bg-white hover:bg-gray-50">
                    {item.label}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right flash sale panel */}
          <div className="rounded-xl border border-gray-200 bg-white p-3 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Flash Sale</div>
              <Link to="/products" className="text-xs text-primary hover:underline">
                ดูทั้งหมด
              </Link>
            </div>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <Link
                  key={i}
                  to={`/product/${i}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                >
                  <img
                    src="https://picsum.photos/seed/promo${i}/120/90"
                    alt={`flash-${i}`}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-medium line-clamp-2">สินค้าโปรโมชันพิเศษ {i}</div>
                    <div className="text-xs text-rose-600 font-semibold">฿1,980</div>
                  </div>
                </Link>
              ))}
            </div>
            <Button asChild size="sm" className="mt-3">
              <Link to="/products">ช้อป Flash Sale</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePromoRail;


