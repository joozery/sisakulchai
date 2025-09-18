
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';

const AdminContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.seesakulchai.com';
const STORAGE_KEYS = {
  token: 'scc_admin_token',
  refresh: 'scc_admin_refresh',
  profile: 'scc_admin_profile',
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    // Restore session from localStorage and validate token via /me
    const token = localStorage.getItem(STORAGE_KEYS.token);
    const profileStr = localStorage.getItem(STORAGE_KEYS.profile);
    if (token) {
      setIsAdmin(true);
      if (profileStr) {
        try { setAdminProfile(JSON.parse(profileStr)); } catch {/* ignore */}
      }
      // Best-effort validation
      api.get('/api/admin/auth/me')
        .then(res => res?.data)
        .then(data => {
          if (data?.ok && data?.admin) {
            setAdminProfile(data.admin);
            localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(data.admin));
          } else {
            setIsAdmin(false);
          }
        })
        .catch(() => setIsAdmin(false));
    }
  }, []);

  const adminLogin = async (email, password) => {
    try {
      const { data } = await api.post('/api/admin/auth/login', { email, password });
      if (!data?.ok) throw new Error('Login failed');

      const token = data.token;
      const refreshToken = data.refreshToken; // may be undefined if backend not returning yet
      const profile = data.admin || null;

      if (token) localStorage.setItem(STORAGE_KEYS.token, token);
      if (refreshToken) localStorage.setItem(STORAGE_KEYS.refresh, refreshToken);
      if (profile) localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));

      setIsAdmin(true);
      setAdminProfile(profile);

      toast({
        title: 'เข้าสู่ระบบ Admin สำเร็จ',
        description: 'ยินดีต้อนรับสู่ระบบจัดการหลังร้าน',
      });
      return true;
    } catch (error) {
      toast({
        title: 'เข้าสู่ระบบล้มเหลว',
        description: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        variant: 'destructive',
      });
      return false;
    }
  };

  const adminLogout = () => {
    const refresh = localStorage.getItem(STORAGE_KEYS.refresh);
    if (refresh) {
      api.post('/api/admin/auth/logout', { refreshToken: refresh }).catch(() => undefined);
    }
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.refresh);
    localStorage.removeItem(STORAGE_KEYS.profile);
    setIsAdmin(false);
    setAdminProfile(null);
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
    adminProfile,
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
