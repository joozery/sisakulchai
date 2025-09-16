
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, Award, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { getProductById, getProductReviews, addReview } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = getProductById(parseInt(id));
  const reviews = getProductReviews(parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    name: ''
  });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบสินค้า</h2>
          <Button asChild>
            <Link to="/products">กลับไปหน้าสินค้า</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "เพิ่มสินค้าในตะกร้าแล้ว!",
      description: `${product.name} จำนวน ${quantity} ชิ้น ถูกเพิ่มในตะกร้าสินค้าแล้ว`
    });
  };

  const handleWishlist = () => {
    toast({
      title: "🚧 ฟีเจอร์นี้ยังไม่พร้อมใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไปได้! 🚀"
    });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "กรุณากรอกชื่อและความคิดเห็น"
      });
      return;
    }

    addReview(product.id, newReview);
    setNewReview({ rating: 5, comment: '', name: '' });
    setShowReviewForm(false);
    toast({
      title: "ขอบคุณสำหรับรีวิว!",
      description: "รีวิวของคุณถูกเพิ่มเรียบร้อยแล้ว"
    });
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - สีทาบ้านคุณภาพ</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} - สีทาบ้านคุณภาพ`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-blue-600 hover:text-blue-800">หน้าแรก</Link>
              <span className="breadcrumb-separator">/</span>
              <Link to="/products" className="text-blue-600 hover:text-blue-800">สินค้าทั้งหมด</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="text-gray-500">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                {product.stock < 10 && (
                  <span className="product-badge">
                    เหลือน้อย
                  </span>
                )}
              </div>
              
              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex space-x-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`color-swatch ${
                        selectedColor === index ? 'selected' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">
                    {product.rating.toFixed(1)} ({product.reviews} รีวิว)
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold price-highlight">
                    ฿{product.price.toLocaleString()}
                  </span>
                  <div className="flex items-center text-sm">
                    <span className={`stock-indicator ${
                      product.stock > 20 ? 'in-stock' : 
                      product.stock > 5 ? 'low-stock' : 'out-of-stock'
                    }`} />
                    <span className="text-gray-500">
                      คงเหลือ {product.stock} ชิ้น
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">รายละเอียดสินค้า</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              {product.features && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">คุณสมบัติ</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">ข้อมูลจำเพาะ</h3>
                  <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    จำนวน
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                      className="quantity-input w-20 text-center py-2 rounded-md"
                      min="1"
                      max={product.stock}
                    />
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {product.stock === 0 ? 'สินค้าหมด' : 'เพิ่มในตะกร้า'}
                  </Button>
                  <Button
                    onClick={handleWishlist}
                    variant="outline"
                    size="lg"
                    className="px-4"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-center space-x-3">
                  <Truck className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">จัดส่งฟรี</p>
                    <p className="text-xs text-gray-500">สั่งซื้อขั้นต่ำ 1,000 บาท</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">รับประกันคุณภาพ</p>
                    <p className="text-xs text-gray-500">คืนเงิน 100%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-yellow-600" />
                  <div>
                    <p className="font-medium text-sm">สินค้าแท้</p>
                    <p className="text-xs text-gray-500">ตรวจสอบได้</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">รีวิวสินค้า</h2>
                <Button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  variant="outline"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  เขียนรีวิว
                </Button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 border border-gray-200 rounded-lg"
                >
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ชื่อของคุณ
                      </label>
                      <input
                        type="text"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        คะแนน
                      </label>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 cursor-pointer ${
                              i < newReview.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                            onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ความคิดเห็น
                      </label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowReviewForm(false)}
                      >
                        ยกเลิก
                      </Button>
                      <Button type="submit">ส่งรีวิว</Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Existing Reviews */}
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="review-card p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="font-semibold text-gray-900 ml-3">{review.name}</p>
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.date).toLocaleDateString('th-TH')}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">ยังไม่มีรีวิวสำหรับสินค้านี้</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
