import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { PaintBucket, ShieldCheck, Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';
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
        navigate('/admin');
      }
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_30%_80%,rgba(59,130,246,0.10),transparent_40%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="p-4 rounded-2xl bg-white/70 backdrop-blur border shadow-sm mb-6">
                  <PaintBucket className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">SCC Admin Portal</h2>
                <p className="text-muted-foreground max-w-md">จัดการสินค้า ออเดอร์ และข้อมูลการขายของคุณได้อย่างมั่นใจ ด้วยแผงควบคุมที่ออกแบบมาเพื่อประสิทธิภาพ</p>
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
                    <a href="#" className="text-primary hover:underline">ลืมรหัสผ่าน?</a>
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
