import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AdminProfile = () => {
  const { toast } = useToast();
  const STORAGE_KEY = 'scc_admin_profile';
  const [form, setForm] = useState({ name: 'Admin User', email: 'admin@scc.com', phone: '', avatar: '' });
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setForm(prev => ({ ...prev, ...data }));
      }
    } catch {}
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    toast({ title: 'บันทึกโปรไฟล์แล้ว' });
  };

  const onChangePassword = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });
  const submitPassword = (e) => {
    e.preventDefault();
    if (!passwords.next || passwords.next.length < 6) {
      toast({ title: 'รหัสผ่านใหม่ต้องอย่างน้อย 6 ตัวอักษร', variant: 'destructive' });
      return;
    }
    if (passwords.next !== passwords.confirm) {
      toast({ title: 'รหัสผ่านใหม่ไม่ตรงกัน', variant: 'destructive' });
      return;
    }
    // ในโปรเจ็กต์จริงควรตรวจรหัสผ่านเดิมฝั่งเซิร์ฟเวอร์
    setPasswords({ current: '', next: '', confirm: '' });
    toast({ title: 'เปลี่ยนรหัสผ่านเรียบร้อย' });
  };

  return (
    <>
      <Helmet>
        <title>โปรไฟล์แอดมิน - SCC Admin</title>
      </Helmet>
      <h1 className="text-lg font-semibold md:text-2xl">โปรไฟล์</h1>
      <Card className="admin-card mt-2">
        <CardHeader>
          <CardTitle>ข้อมูลส่วนตัว</CardTitle>
          <CardDescription>อัปเดตชื่อและอีเมลสำหรับบัญชีผู้ดูแล</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4 max-w-xl">
            <div className="grid grid-cols-1 md:grid-cols-[96px_1fr] gap-4 items-center">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-secondary grid place-items-center">
                {form.avatar ? (
                  <img src={form.avatar} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm text-muted-foreground">No image</span>
                )}
              </div>
              <div>
                <Label htmlFor="avatar">รูปโปรไฟล์ (URL)</Label>
                <Input id="avatar" name="avatar" value={form.avatar} onChange={onChange} placeholder="https://..." />
              </div>
            </div>
            <div>
              <Label htmlFor="name">ชื่อ</Label>
              <Input id="name" name="name" value={form.name} onChange={onChange} />
            </div>
            <div>
              <Label htmlFor="email">อีเมล</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={onChange} />
            </div>
            <div>
              <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
              <Input id="phone" name="phone" value={form.phone} onChange={onChange} placeholder="เช่น 0812345678" />
            </div>
            <div>
              <Button type="submit">บันทึก</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="admin-card mt-6 max-w-xl">
        <CardHeader>
          <CardTitle>เปลี่ยนรหัสผ่าน</CardTitle>
          <CardDescription>ตั้งรหัสผ่านใหม่เพื่อความปลอดภัย</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitPassword} className="grid gap-4">
            <div>
              <Label htmlFor="current">รหัสผ่านเดิม</Label>
              <Input id="current" name="current" type="password" value={passwords.current} onChange={onChangePassword} />
            </div>
            <div>
              <Label htmlFor="next">รหัสผ่านใหม่</Label>
              <Input id="next" name="next" type="password" value={passwords.next} onChange={onChangePassword} />
            </div>
            <div>
              <Label htmlFor="confirm">ยืนยันรหัสผ่านใหม่</Label>
              <Input id="confirm" name="confirm" type="password" value={passwords.confirm} onChange={onChangePassword} />
            </div>
            <div>
              <Button type="submit">เปลี่ยนรหัสผ่าน</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminProfile;


