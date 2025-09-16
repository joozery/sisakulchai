
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { LayoutDashboard, Package, ShoppingCart, Users, DollarSign, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/contexts/ProductContext';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/components/ui/use-toast';

const AdminPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { orders, analytics, updateOrderStatus } = useAdmin();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: 'house-paint',
    description: '',
    stock: '',
    image: 'https://images.unsplash.com/photo-1572071886795-f4e2d361cb23?w=500'
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        stock: product.stock,
        image: product.image
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        price: '',
        category: 'house-paint',
        description: '',
        stock: '',
        image: 'https://images.unsplash.com/photo-1572071886795-f4e2d361cb23?w=500'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...productForm,
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast({ title: "อัปเดตสินค้าสำเร็จ" });
    } else {
      addProduct(productData);
      toast({ title: "เพิ่มสินค้าสำเร็จ" });
    }
    closeModal();
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?')) {
      deleteProduct(id);
      toast({ title: "ลบสินค้าสำเร็จ" });
    }
  };

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status);
    toast({ title: "อัปเดตสถานะคำสั่งซื้อสำเร็จ" });
  };

  const stats = [
    { title: 'ยอดขายทั้งหมด', value: `฿${analytics.totalSales.toLocaleString()}`, icon: <DollarSign /> },
    { title: 'คำสั่งซื้อทั้งหมด', value: analytics.totalOrders, icon: <ShoppingCart /> },
    { title: 'สินค้าทั้งหมด', value: products.length, icon: <Package /> },
    { title: 'ลูกค้าทั้งหมด', value: analytics.totalCustomers, icon: <Users /> }
  ];

  return (
    <>
      <Helmet>
        <title>จัดการร้าน - สีทาบ้านคุณภาพ</title>
        <meta name="description" content="จัดการสินค้า คำสั่งซื้อ และดูข้อมูลสรุปของร้าน" />
      </Helmet>

      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-md h-screen sticky top-0">
            <div className="p-6">
              <h2 className="text-2xl font-bold gradient-text">จัดการร้าน</h2>
            </div>
            <nav className="mt-6">
              <button
                onClick={() => handleTabChange('dashboard')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                แดชบอร์ด
              </button>
              <button
                onClick={() => handleTabChange('products')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === 'products' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5 mr-3" />
                จัดการสินค้า
              </button>
              <button
                onClick={() => handleTabChange('orders')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ShoppingCart className="w-5 h-5 mr-3" />
                จัดการคำสั่งซื้อ
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === 'dashboard' && (
                <div>
                  <h1 className="text-3xl font-bold mb-8">แดชบอร์ด</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="admin-card p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                          </div>
                          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                            {stat.icon}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">คำสั่งซื้อล่าสุด</h2>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600">ลูกค้า</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600">ยอดรวม</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600">สถานะ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 5).map(order => (
                            <tr key={order.id} className="border-b">
                              <td className="p-4 text-sm">{order.id}</td>
                              <td className="p-4 text-sm">{order.customerName}</td>
                              <td className="p-4 text-sm">฿{order.total.toLocaleString()}</td>
                              <td className="p-4 text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">จัดการสินค้า</h1>
                    <Button onClick={() => openModal()}>
                      <PlusCircle className="w-5 h-5 mr-2" />
                      เพิ่มสินค้า
                    </Button>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">สินค้า</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">ราคา</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">สต็อก</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">หมวดหมู่</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">จัดการ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id} className="border-b">
                            <td className="p-4 text-sm flex items-center">
                              <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md mr-4" />
                              {product.name}
                            </td>
                            <td className="p-4 text-sm">฿{product.price.toLocaleString()}</td>
                            <td className="p-4 text-sm">{product.stock}</td>
                            <td className="p-4 text-sm">{product.category}</td>
                            <td className="p-4 text-sm">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={() => openModal(product)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h1 className="text-3xl font-bold mb-8">จัดการคำสั่งซื้อ</h1>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">ID</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">ลูกค้า</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">ยอดรวม</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">สถานะ</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-600">จัดการ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id} className="border-b">
                            <td className="p-4 text-sm">{order.id}</td>
                            <td className="p-4 text-sm">{order.customerName}</td>
                            <td className="p-4 text-sm">฿{order.total.toLocaleString()}</td>
                            <td className="p-4 text-sm">
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className="px-2 py-1 border border-gray-300 rounded-md"
                              >
                                <option value="pending">รอดำเนินการ</option>
                                <option value="completed">สำเร็จ</option>
                                <option value="cancelled">ยกเลิก</option>
                              </select>
                            </td>
                            <td className="p-4 text-sm">
                              <Button variant="outline" size="sm">
                                ดูรายละเอียด
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">
              {editingProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">ชื่อสินค้า</label>
                <input type="text" name="name" value={productForm.name} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">ราคา</label>
                  <input type="number" name="price" value={productForm.price} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-md" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">สต็อก</label>
                  <input type="number" name="stock" value={productForm.stock} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-md" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">หมวดหมู่</label>
                <select name="category" value={productForm.category} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-md">
                  <option value="house-paint">สีทาบ้าน</option>
                  <option value="car-paint">สีรถยนต์</option>
                  <option value="gold-paint">สีทอง</option>
                  <option value="wood-paint">สีไม้</option>
                  <option value="rust-paint">สีกันสนิม</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">รายละเอียด</label>
                <textarea name="description" value={productForm.description} onChange={handleFormChange} rows="3" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={closeModal}>
                  ยกเลิก
                </Button>
                <Button type="submit">
                  {editingProduct ? 'บันทึกการเปลี่ยนแปลง' : 'เพิ่มสินค้า'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
