
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { CreditCard, Truck, Banknote, QrCode, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = getCartTotal();
  const shippingCost = total >= 1000 ? 0 : 50;
  const grandTotal = total + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast({
        title: "ตะกร้าสินค้าว่างเปล่า",
        description: "กรุณาเพิ่มสินค้าลงในตะกร้าก่อนทำการสั่งซื้อ"
      });
      return;
    }

    const order = {
      customerName: formData.name,
      customerEmail: formData.email,
      shippingAddress: formData.address,
      phone: formData.phone,
      items: cartItems,
      total: grandTotal,
      paymentMethod: paymentMethod
    };

    addOrder(order);
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-lg shadow-lg"
        >
          <CheckCircle className="w-24 h-24 mx-auto text-green-500 mb-6 success-checkmark" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            สั่งซื้อสำเร็จ!
          </h1>
          <p className="text-gray-600 mb-8">
            ขอบคุณที่สั่งซื้อสินค้ากับเรา! เราจะดำเนินการจัดส่งให้เร็วที่สุด
          </p>
          <Button asChild>
            <Link to="/">กลับไปหน้าแรก</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>ชำระเงิน - สีทาบ้านคุณภาพ</title>
        <meta name="description" content="กรอกข้อมูลการจัดส่งและเลือกวิธีการชำระเงิน" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              ชำระเงิน
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Shipping Info */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">ข้อมูลการจัดส่ง</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ที่อยู่</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">อีเมล</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-6">วิธีการชำระเงิน</h2>
                <div className="space-y-4">
                  <div
                    onClick={() => setPaymentMethod('bank-transfer')}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      paymentMethod === 'bank-transfer' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <Banknote className="w-6 h-6 mr-3 text-blue-600" />
                      <span className="font-medium">โอนผ่านธนาคาร</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod('qr-code')}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      paymentMethod === 'qr-code' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <QrCode className="w-6 h-6 mr-3 text-blue-600" />
                      <span className="font-medium">QR Code</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      paymentMethod === 'cod' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <Truck className="w-6 h-6 mr-3 text-blue-600" />
                      <span className="font-medium">เก็บเงินปลายทาง</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-6">สรุปคำสั่งซื้อ</h2>
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3" />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gray-500">x {item.quantity}</p>
                          </div>
                        </div>
                        <p>฿{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-6 pt-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ราคารวม</span>
                      <span className="font-medium">฿{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ค่าจัดส่ง</span>
                      <span className="font-medium text-green-600">
                        {shippingCost === 0 ? 'ฟรี' : `฿${shippingCost}`}
                      </span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold text-lg">
                      <span>ยอดรวมสุทธิ</span>
                      <span>฿{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-8">
                    <CreditCard className="w-5 h-5 mr-2" />
                    ยืนยันการสั่งซื้อ
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
