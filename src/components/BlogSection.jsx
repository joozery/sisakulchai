import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'เทคนิคการเลือกสีทาบ้านให้เหมาะกับสภาพอากาศ',
      excerpt: 'เรียนรู้วิธีการเลือกสีทาบ้านที่เหมาะสมกับสภาพอากาศในประเทศไทย เพื่อความทนทานและสวยงามยาวนาน',
      image: 'https://picsum.photos/seed/blog1/400/250',
      author: 'ทีมงาน SCC',
      date: '15 กันยายน 2024',
      category: 'เคล็ดลับ',
      readTime: '5 นาที'
    },
    {
      id: 2,
      title: 'สีรถยนต์แบบไหนที่เหมาะกับรถของคุณ',
      excerpt: 'คู่มือการเลือกสีรถยนต์ตามประเภทของรถและสไตล์การใช้งาน พร้อมเทคนิคการดูแลรักษา',
      image: 'https://picsum.photos/seed/blog2/400/250',
      author: 'ช่างสีมืออาชีพ',
      date: '12 กันยายน 2024',
      category: 'รถยนต์',
      readTime: '7 นาที'
    },
    {
      id: 3,
      title: 'การเตรียมพื้นผิวก่อนทาสีให้ได้ผลลัพธ์ที่ดี',
      excerpt: 'ขั้นตอนการเตรียมพื้นผิวที่สำคัญก่อนทาสี เพื่อให้สีติดทนและสวยงามอย่างที่ต้องการ',
      image: 'https://picsum.photos/seed/blog3/400/250',
      author: 'ผู้เชี่ยวชาญ',
      date: '10 กันยายน 2024',
      category: 'เทคนิค',
      readTime: '6 นาที'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            บทความและเคล็ดลับ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            เรียนรู้เทคนิคและเคล็ดลับการใช้งานสีจากผู้เชี่ยวชาญ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {post.readTime}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
                  <Link to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={`/blog/${post.id}`}>
                    อ่านต่อ
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline">
            <Link to="/blog">
              ดูบทความทั้งหมด
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
