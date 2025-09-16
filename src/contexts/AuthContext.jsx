
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('paintShopUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('paintShopUser');
    }
  }, []);

  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('paintShopUsers') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        const userData = { email: foundUser.email, username: foundUser.name };
        localStorage.setItem('paintShopUser', JSON.stringify(userData));
        setUser(userData);
        toast({
          title: 'เข้าสู่ระบบสำเร็จ!',
          description: `ยินดีต้อนรับกลับมา, ${userData.username}!`,
        });
        setAuthModalOpen(false);
        return true;
      } else {
        toast({
          title: 'เข้าสู่ระบบล้มเหลว',
          description: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error("Login failed", error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถเข้าสู่ระบบได้ในขณะนี้',
        variant: 'destructive',
      });
      return false;
    }
  };

  const register = (name, email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('paintShopUsers') || '[]');
      const existingUser = users.find(u => u.email === email);

      if (existingUser) {
        toast({
          title: 'สมัครสมาชิกล้มเหลว',
          description: 'อีเมลนี้ถูกใช้งานแล้ว',
          variant: 'destructive',
        });
        return false;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('paintShopUsers', JSON.stringify(users));
      
      const userData = { email: newUser.email, username: newUser.name };
      localStorage.setItem('paintShopUser', JSON.stringify(userData));
      setUser(userData);

      toast({
        title: 'สมัครสมาชิกสำเร็จ!',
        description: `ยินดีต้อนรับ, ${name}! คุณได้เข้าสู่ระบบแล้ว`,
      });
      setAuthModalOpen(false);
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถสมัครสมาชิกได้ในขณะนี้',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('paintShopUser');
    setUser(null);
    toast({
      title: 'ออกจากระบบสำเร็จ',
      description: 'แล้วพบกันใหม่นะ!',
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isAuthModalOpen,
    setAuthModalOpen,
    openAuthModal: () => setAuthModalOpen(true),
    closeAuthModal: () => setAuthModalOpen(false),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
