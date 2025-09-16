
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, UserPlus } from 'lucide-react';

const AuthModal = () => {
  const { isAuthModalOpen, setAuthModalOpen, login, register } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(loginEmail, loginPassword);
    if (success) {
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const success = register(registerName, registerEmail, registerPassword);
    if (success) {
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
    }
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={setAuthModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue="login" className="w-full">
          <DialogHeader>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">
                <LogIn className="w-4 h-4 mr-2" />
                เข้าสู่ระบบ
              </TabsTrigger>
              <TabsTrigger value="register">
                <UserPlus className="w-4 h-4 mr-2" />
                สมัครสมาชิก
              </TabsTrigger>
            </TabsList>
          </DialogHeader>
          <TabsContent value="login">
            <DialogTitle className="text-center mb-2">ยินดีต้อนรับกลับมา</DialogTitle>
            <DialogDescription className="text-center mb-4">
              เข้าสู่ระบบเพื่อดูประวัติการสั่งซื้อและจัดการบัญชีของคุณ
            </DialogDescription>
            <form onSubmit={handleLogin}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="login-email" className="text-right">
                    อีเมล
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="col-span-3"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="login-password" className="text-right">
                    รหัสผ่าน
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="col-span-3"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                เข้าสู่ระบบ
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <DialogTitle className="text-center mb-2">สร้างบัญชีใหม่</DialogTitle>
            <DialogDescription className="text-center mb-4">
              สมัครสมาชิกเพื่อรับสิทธิพิเศษและโปรโมชั่นก่อนใคร
            </DialogDescription>
            <form onSubmit={handleRegister}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="register-name" className="text-right">
                    ชื่อ
                  </Label>
                  <Input
                    id="register-name"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="col-span-3"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="register-email" className="text-right">
                    อีเมล
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="col-span-3"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="register-password"  className="text-right">
                    รหัสผ่าน
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="col-span-3"
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                สมัครสมาชิก
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
