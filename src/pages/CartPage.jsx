
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();

  const handleRemoveItem = (id, name) => {
    removeFromCart(id);
    toast({
      title: "ลบสินค้าแล้ว",
      description: `${name} ถูกลบออกจากตะกร้าแล้ว`
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "ล้างตะกร้าแล้ว",
      description: "สินค้าทั้งหมดถูกลบออกจากตะกร้าแล้ว"
    });
  };

  const incrementQuantity = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const total = getCartTotal();

  return (
    <>
      <Helmet>
        <title>ตะกร้าสินค้า - สีทาบ้านคุณภาพ</title>
        <meta name="description" content="ตรวจสอบสินค้าในตะกร้าของคุณและดำเนินการสั่งซื้อ" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-8">
              <ShoppingCart className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                ตะกร้าสินค้า
              </h1>
            </div>

            {/* Top promo/info banner */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="hidden md:block w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Star className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm md:text-base text-gray-700">
                    แอปใช้ง่าย ผ่อนสบาย ใช้บัตรได้หลายธนาคาร ยอดถึงสามารถผ่อนได้ และมีเลือกซื้อสินค้ามากมายคุณภาพดีค่ะ
                  </p>
                  <div className="mt-1 text-amber-500 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => { /* dismiss ephemeral, no state needed */ }}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  aria-label="dismiss"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  ตะกร้าสินค้าของคุณว่างเปล่า
                </h2>
                <p className="text-gray-600 mb-6">
                  ดูเหมือนว่าคุณยังไม่ได้เพิ่มสินค้าใดๆ ลงในตะกร้า
                </p>
                <Button asChild>
                  <Link to="/products">
                    เลือกซื้อสินค้า
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-xl font-semibold">สินค้า ({cartItems.length} รายการ)</h2>
                    <button onClick={handleClearCart} className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" /> ล้างตะกร้า
                    </button>
                  </div>

                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-4 py-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            ราคา: ฿{item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrementQuantity(item)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 grid place-items-center border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-9 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => incrementQuantity(item)}
                            className="w-8 h-8 grid place-items-center border border-gray-300 rounded-full hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-semibold w-24 text-right">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                    <h2 className="text-xl font-semibold mb-6">สรุปคำสั่งซื้อ</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ราคารวม</span>
                        <span className="font-medium">฿{total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ค่าจัดส่ง</span>
                        <span className="font-medium text-green-600">
                          {total >= 1000 ? 'ฟรี' : '฿50'}
                        </span>
                      </div>
                      <div className="border-t pt-4 flex justify-between font-bold text-lg">
                        <span>ยอดรวมสุทธิ</span>
                        <span>
                          ฿{(total + (total < 1000 ? 50 : 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button asChild size="lg" className="w-full mt-8">
                      <Link to="/checkout">
                        ดำเนินการสั่งซื้อ
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                    <div className="text-center mt-4">
                      <Link
                        to="/products"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        เลือกซื้อสินค้าต่อ
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
