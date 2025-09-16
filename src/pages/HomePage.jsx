import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowRight, Star, Truck, Shield, Award, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/contexts/ProductContext';
import HeroSlider from '@/components/HeroSlider';
import PromoModal from '@/components/PromoModal';
import HomePromoRail from '@/components/HomePromoRail';
import BlogSection from '@/components/BlogSection';

const HomePage = () => {
  const { products } = useProducts();
  
  const featuredProducts = [
    {
      id: 1,
      name: 'สีทาบ้านภายนอก สีขาว',
      price: 990,
      rating: 4.5,
      reviews: 120,
      stock: 30,
      image: 'https://www.thaiwatsadu.com/_next/image?url=https%3A%2F%2Fpim.thaiwatsadu.com%2FTWDPIM%2Fweb%2FThumbnail%2FImage%2F0203%2F60243294r2.jpg&w=640&q=75',
    },
    {
      id: 2,
      name: 'สีทาบ้านภายในสีครีม',
      price: 850,
      rating: 4.7,
      reviews: 95,
      stock: 50,
      image: 'https://www.thaiwatsadu.com/_next/image?url=https%3A%2F%2Fpim.thaiwatsadu.com%2FTWDPIM%2Fweb%2FThumbnail%2FImage%2F0203%2F60000312.jpg&w=640&q=75',
    },
    {
      id: 3,
      name: 'สีรถยนต์ สีแดงเมทัลลิค',
      price: 1500,
      rating: 4.8,
      reviews: 78,
      stock: 25,
      image: 'https://image.made-in-china.com/202f0j00EsyYpjhMHPca/High-Quality-Carmine-Color-Auto-Paint-Supplies-Performance-Automotive-Refinish-Paint-for-Car.webp',
    },
    {
      id: 4,
      name: 'สีทาไม้',
      price: 450,
      rating: 4.6,
      reviews: 65,
      stock: 40,
      image: 'https://www.thaiwatsadu.com/_next/image?url=https%3A%2F%2Fpim.thaiwatsadu.com%2FTWDPIM%2Fweb%2FThumbnail%2FImage%2F0203%2F60106831r.jpg&w=640&q=75',
    }
  ];

  const categories = [
    {
      name: 'สีทาบ้าน',
      path: '/products/house-paint',
      description: 'สีทาบ้านคุณภาพสูง ทนทานต่อสภาพอากาศ',
      imageDescription: 'ห้องนั่งเล่นทันสมัยที่ทาสีใหม่',
      image: 'https://captaincoating.com/wp-content/uploads/2021/06/shutterstock_1265596666.jpg'
    },
    {
      name: 'สีรถยนต์',
      path: '/products/car-paint',
      description: 'สีรถยนต์เมทัลลิค เงาสวย ทนทาน',
      imageDescription: 'ช่างกำลังพ่นสีรถยนต์ในอู่',
      image: 'https://www.prakantidloh.com/wp-content/uploads/tidlor/media/tidlor-image/article/before-changing-car-color-report/noti-change-color.webp'
    },
    {
      name: 'สีทอง',
      path: '/products/gold-paint',
      description: 'สีทองแท้ สำหรับงานศิลปะและตกแต่ง',
      imageDescription: 'รูปปั้นที่เคลือบด้วยสีทองอร่าม',
      image: 'https://inwfile.com/s-gc/gp722w.jpg'
    },
    {
      name: 'สีไม้',
      path: '/products/wood-paint',
      description: 'สีทาไม้ ป้องกันปลวกและแมลง',
      imageDescription: 'เฟอร์นิเจอร์ไม้ที่ถูกทาด้วยสีย้อมไม้',
      image: 'https://www.wazzadu.com/thumbs/article/resize/760/article_ab6445d0-98ec-11e9-af85-edfcf0d90410.jpg'
    }
  ];

  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'จัดส่งฟรี',
      description: 'จัดส่งฟรีทั่วประเทศ สำหรับคำสั่งซื้อตั้งแต่ 1,000 บาท'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'รับประกันคุณภาพ',
      description: 'รับประกันคุณภาพสินค้า หากไม่พอใจสามารถคืนได้'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'สีคุณภาพสูง',
      description: 'สีคุณภาพพรีเมียม จากแบรนด์ชั้นนำ'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'สีหลากหลาย',
      description: 'มีสีให้เลือกมากมาย ตรงตามความต้องการ'
    }
  ];

  return (
    <>
      <Helmet>
        <title>หน้าแรก - สีทาบ้านคุณภาพ ร้านสีออนไลน์ชั้นนำ</title>
        <meta name="description" content="ร้านขายสีทาบ้านออนไลน์ชั้นนำ มีสีคุณภาพสูงให้เลือกหลากหลาย พร้อมบริการจัดส่งทั่วประเทศ ราคาดี คุณภาพเยี่ยม สั่งซื้อง่าย ปลอดภัย" />
      </Helmet>

      {/* Hero Slider Section */}
      <HeroSlider />
      <HomePromoRail />
      <PromoModal />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ทำไมต้องเลือกเรา?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              เราให้บริการที่ดีที่สุด พร้อมสินค้าคุณภาพสูง
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card p-6 rounded-xl text-center hover-lift"
              >
                <div className="paint-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              หมวดหมู่สินค้า
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              เลือกสีที่เหมาะสมกับความต้องการของคุณ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0 }}
                    viewport={{ once: true }}
                >
                    <Link to={categories[0].path} className="block group">
                    <div className="category-card rounded-xl overflow-hidden hover-lift">
                        <div className="relative h-48">
                          <img alt={categories[0].imageDescription} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" src={categories[0].image} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold mb-1">{categories[0].name}</h3>
                            <p className="text-sm text-white/90">{categories[0].description}</p>
                          </div>
                        </div>
                    </div>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <Link to={categories[1].path} className="block group">
                    <div className="category-card rounded-xl overflow-hidden hover-lift">
                        <div className="relative h-48">
                          <img alt={categories[1].imageDescription} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" src={categories[1].image} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold mb-1">{categories[1].name}</h3>
                            <p className="text-sm text-white/90">{categories[1].description}</p>
                          </div>
                        </div>
                    </div>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Link to={categories[2].path} className="block group">
                    <div className="category-card rounded-xl overflow-hidden hover-lift">
                        <div className="relative h-48">
                          <img alt={categories[2].imageDescription} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" src={categories[2].image} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold mb-1">{categories[2].name}</h3>
                            <p className="text-sm text-white/90">{categories[2].description}</p>
                          </div>
                        </div>
                    </div>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <Link to={categories[3].path} className="block group">
                    <div className="category-card rounded-xl overflow-hidden hover-lift">
                        <div className="relative h-48">
                          <img alt={categories[3].imageDescription} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" src={categories[3].image} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold mb-1">{categories[3].name}</h3>
                            <p className="text-sm text-white/90">{categories[3].description}</p>
                          </div>
                        </div>
                    </div>
                    </Link>
                </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              สินค้าแนะนำ
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              สินค้าขายดีและได้รับความนิยมสูงสุด
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/product/${product.id}`} className="block group">
                  <div className="paint-card rounded-xl overflow-hidden hover-lift">
                    <div className="relative h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.stock < 10 && (
                        <span className="product-badge">
                          เหลือน้อย
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="price-highlight text-lg">
                          ฿{product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          คงเหลือ {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/products">
                ดูสินค้าทั้งหมด
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="promotion-banner py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold">
              โปรโมชั่นพิเศษ!
            </h2>
            <p className="text-xl md:text-2xl">
              ซื้อสีทาบ้าน 2 กระป๋อง ลด 20%
            </p>
            <p className="text-lg">
              *เฉพาะสินค้าในหมวดสีทาบ้าน วันนี้ - 31 ธันวาคม 2025
            </p>
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-white/90">
              <Link to="/products/house-paint">
                เลือกซื้อเลย!
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ความคิดเห็นจากลูกค้า
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ลูกค้าของเราพอใจในคุณภาพสินค้าและบริการ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'คุณสมชาย',
                rating: 5,
                comment: 'สีคุณภาพดีมาก ทาแล้วสวย ทนทาน ราคาดีด้วย แนะนำเลยครับ',
                product: 'สีทาบ้านภายนอก สีขาว'
              },
              {
                name: 'คุณมาลี',
                rating: 5,
                comment: 'บริการดีมาก จัดส่งเร็ว สีสวยตรงตามที่ต้องการ จะซื้อใหม่แน่นอน',
                product: 'สีทาบ้านภายใน สีครีม'
              },
              {
                name: 'คุณวิชัย',
                rating: 4,
                comment: 'สีรถยนต์เงาสวยมาก ทาง่าย คุณภาพดี ราคาเหมาะสม',
                product: 'สีรถยนต์ สีแดงเมทัลลิค'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="testimonial-card p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.product}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
