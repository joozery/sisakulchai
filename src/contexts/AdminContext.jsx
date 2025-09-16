
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const AdminContext = createContext();

const ADMIN_EMAIL = 'admin@scc.com';
const ADMIN_PASSWORD = 'password123';

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem('paintShopAdmin');
      if (storedAdmin) {
        setIsAdmin(JSON.parse(storedAdmin));
      }
    } catch (error) {
      console.error("Failed to parse admin from localStorage", error);
      localStorage.removeItem('paintShopAdmin');
    }
  }, []);

  const adminLogin = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('paintShopAdmin', JSON.stringify(true));
      setIsAdmin(true);
      toast({
        title: 'เข้าสู่ระบบ Admin สำเร็จ',
        description: 'ยินดีต้อนรับสู่ระบบจัดการหลังร้าน',
      });
      return true;
    } else {
      toast({
        title: 'เข้าสู่ระบบล้มเหลว',
        description: 'ข้อมูล Admin ไม่ถูกต้อง',
        variant: 'destructive',
      });
      return false;
    }
  };

  const adminLogout = () => {
    localStorage.removeItem('paintShopAdmin');
    setIsAdmin(false);
    toast({
      title: 'ออกจากระบบ Admin สำเร็จ',
    });
  };

  useEffect(() => {
    const savedOrders = localStorage.getItem('paintstore_orders');
    if (savedOrders) {
      try {
        const ordersData = JSON.parse(savedOrders);
        setOrders(ordersData);
        updateAnalytics(ordersData);
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('paintstore_orders', JSON.stringify(orders));
      updateAnalytics(orders);
    }
  }, [orders]);

  const updateAnalytics = (ordersData) => {
    const totalSales = ordersData.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = ordersData.length;
    const uniqueCustomers = new Set(ordersData.map(order => order.customerEmail)).size;
    
    const savedProducts = JSON.parse(localStorage.getItem('paintShopProducts') || '[]');

    setAnalytics({
      totalSales,
      totalOrders,
      totalProducts: savedProducts.length,
      totalCustomers: uniqueCustomers
    });
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'pending'
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const value = {
    isAdminAuthenticated: isAdmin,
    adminLogin,
    adminLogout,
    orders,
    analytics,
    addOrder,
    updateOrderStatus,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
