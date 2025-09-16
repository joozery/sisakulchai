
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Phone, Mail, MapPin, Facebook, MessageCircle, Instagram, Twitter, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "ส่งข้อความสำเร็จ!",
      description: "ขอบคุณสำหรับข้อความของคุณ เราจะติดต่อกลับโดยเร็วที่สุด"
    });
    e.target.reset();
  };

  const handleSocialClick = () => {
    toast({
      title: "🚧 ฟีเจอร์นี้ยังไม่พร้อมใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไปได้! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>ติดต่อเรา - สีทาบ้านคุณภาพ</title>
        <meta name="description" content="ติดต่อสอบถามข้อมูลเพิ่มเติมเกี่ยวกับสินค้าและบริการของเรา" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ติดต่อเรา
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              เราพร้อมให้ความช่วยเหลือและตอบทุกคำถามของคุณ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="contact-form p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6">ส่งข้อความถึงเรา</h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ชื่อของคุณ</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">อีเมล</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">หัวข้อ</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ข้อความ</label>
                  <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-5 h-5 mr-2" />
                  ส่งข้อความ
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">ข้อมูลติดต่อ</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">เบอร์โทรศัพท์</p>
                      <p className="text-gray-600">02-123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">อีเมล</p>
                      <p className="text-gray-600">info@paintstore.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">ที่อยู่</p>
                      <p className="text-gray-600">
                        123 ถนนสีสวย แขวงสีใส<br />
                        เขตสีสด กรุงเทพฯ 10110
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">ติดตามเรา</h2>
                <div className="flex space-x-4">
                  <button onClick={handleSocialClick} className="social-icon p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                    <Facebook className="w-6 h-6" />
                  </button>
                  <button onClick={handleSocialClick} className="social-icon p-3 bg-green-500 text-white rounded-full hover:bg-green-600">
                    <MessageCircle className="w-6 h-6" />
                  </button>
                  <button onClick={handleSocialClick} className="social-icon p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600">
                    <Instagram className="w-6 h-6" />
                  </button>
                  <button onClick={handleSocialClick} className="social-icon p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                    <Twitter className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">แผนที่ร้าน</h2>
            <div className="map-container">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=100.5231,13.7367,100.5431,13.7567&layer=mapnik"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
