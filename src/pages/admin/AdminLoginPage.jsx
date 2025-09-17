import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { PaintBucket, ShieldCheck, Eye, EyeOff, Lock, ArrowLeft, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/contexts/AdminContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { adminLogin, isAdminAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      title: "ข้อมูลเข้าสู่ระบบ",
      content: "Email: admin@scc.com\nPassword: password123",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-green-800"
    },
    {
      icon: <Info className="h-8 w-8 text-blue-500" />,
      title: "ระบบจัดการหลังร้าน",
      content: "จัดการสินค้า ออเดอร์ ผู้ใช้ และการตั้งค่าต่างๆ ได้อย่างครบถ้วน",
      bgColor: "from-blue-50 to-cyan-50",
      textColor: "text-blue-800"
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-orange-500" />,
      title: "ความปลอดภัย",
      content: "ระบบมีการรักษาความปลอดภัยสูง ข้อมูลทั้งหมดได้รับการปกป้อง",
      bgColor: "from-orange-50 to-amber-50",
      textColor: "text-orange-800"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const success = adminLogin(email, password);
      if (success) {
        // Success SweetAlert
        await Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ!',
          text: 'ยินดีต้อนรับสู่ระบบจัดการหลังร้าน SCC',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#3b82f6',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
          allowOutsideClick: false,
          customClass: {
            popup: 'swal-popup-custom',
            title: 'swal-title-custom',
            content: 'swal-content-custom'
          }
        });
        navigate('/admin');
      } else {
        // Error SweetAlert
        await Swal.fire({
          title: 'เข้าสู่ระบบล้มเหลว!',
          text: 'ข้อมูล Admin ไม่ถูกต้อง กรุณาตรวจสอบ Email และ Password',
          icon: 'error',
          confirmButtonText: 'ลองใหม่',
          confirmButtonColor: '#ef4444',
          showConfirmButton: true,
          customClass: {
            popup: 'swal-popup-custom',
            title: 'swal-title-custom',
            content: 'swal-content-custom'
          }
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const showLoginInfo = () => {
    Swal.fire({
      title: 'ข้อมูลเข้าสู่ระบบ',
      html: `
        <div style="text-align: left; font-size: 16px;">
          <p><strong>Email:</strong> admin@scc.com</p>
          <p><strong>Password:</strong> password123</p>
          <hr style="margin: 15px 0;">
          <p style="color: #666; font-size: 14px;">
            💡 <strong>คำแนะนำ:</strong> ใช้ข้อมูลนี้เพื่อเข้าสู่ระบบจัดการหลังร้าน
          </p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'เข้าใจแล้ว',
      confirmButtonColor: '#3b82f6',
      showConfirmButton: true,
      customClass: {
        popup: 'swal-popup-custom',
        title: 'swal-title-custom',
        content: 'swal-content-custom'
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - SCC</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-stretch justify-center p-0">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-screen md:min-h-[78vh]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center justify-center p-10"
          >
            <div className="relative w-full h-[480px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Sweararet Background */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgColor}`}
              />
              
              {/* Original Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_30%_80%,rgba(59,130,246,0.10),transparent_40%)]" />
              
              {/* Sweararet Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <motion.div
                  key={currentSlide}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-2xl bg-white/70 backdrop-blur border shadow-sm mb-6"
                >
                  {slides[currentSlide].icon}
                </motion.div>
                
                <motion.h2
                  key={`title-${currentSlide}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-3xl font-bold tracking-tight mb-2 ${slides[currentSlide].textColor}`}
                >
                  {slides[currentSlide].title}
                </motion.h2>
                
                <motion.p
                  key={`content-${currentSlide}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className={`text-sm max-w-md whitespace-pre-line ${slides[currentSlide].textColor}`}
                >
                  {slides[currentSlide].content}
                </motion.p>
              </div>
              
              {/* Sweararet Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white shadow-lg scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center p-6 md:p-10"
          >
            <Card className="w-full max-w-md shadow-xl border-0">
              <CardHeader className="text-center pb-2">
                <div className="inline-flex items-center justify-center mx-auto p-3 bg-primary/10 rounded-2xl mb-4">
                  <PaintBucket className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Admin Login</CardTitle>
                <CardDescription>เข้าสู่ระบบเพื่อจัดการหลังร้าน</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@scc.com"
                        required
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pr-10"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground/60">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute inset-y-0 right-2 flex items-center px-2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <a href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                      <ArrowLeft className="h-3.5 w-3.5 mr-1" /> กลับหน้าแรก
                    </a>
                    <button 
                      type="button"
                      onClick={showLoginInfo}
                      className="text-primary hover:underline cursor-pointer"
                    >
                      ข้อมูลเข้าสู่ระบบ
                    </button>
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        กำลังเข้าสู่ระบบ...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" /> Login
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
