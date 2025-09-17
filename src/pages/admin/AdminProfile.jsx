import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Key, 
  Camera, 
  Save, 
  Eye, 
  EyeOff,
  Settings,
  Bell,
  Lock,
  Globe,
  Clock,
  Activity,
  Award,
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Edit,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Swal from 'sweetalert2';

const AdminProfile = () => {
  const { toast } = useToast();
  const STORAGE_KEY = 'scc_admin_profile';
  const [form, setForm] = useState({ 
    name: 'Admin User', 
    email: 'admin@scc.com', 
    phone: '', 
    avatar: '',
    position: 'ผู้ดูแลระบบ',
    department: 'IT',
    address: '',
    bio: '',
    website: '',
    timezone: 'Asia/Bangkok',
    language: 'th',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, next: false, confirm: false });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setForm(prev => ({ ...prev, ...data }));
      }
    } catch {}
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('notifications.')) {
      const notificationType = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationType]: checked
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      
      await Swal.fire({
        title: 'บันทึกสำเร็จ!',
        text: 'ข้อมูลโปรไฟล์ได้รับการอัปเดตแล้ว',
        icon: 'success',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#3b82f6',
        customClass: {
          popup: 'swal-popup-custom',
          title: 'swal-title-custom',
          content: 'swal-content-custom'
        }
      });
      
      toast({ 
        title: 'บันทึกโปรไฟล์สำเร็จ',
        description: 'ข้อมูลโปรไฟล์ได้รับการอัปเดตแล้ว'
      });
    } catch (error) {
      toast({ 
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถบันทึกข้อมูลได้',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onChangePassword = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });
  
  const submitPassword = async (e) => {
    e.preventDefault();
    
    if (!passwords.current) {
      toast({ title: 'กรุณากรอกรหัสผ่านเดิม', variant: 'destructive' });
      return;
    }
    
    if (!passwords.next || passwords.next.length < 6) {
      toast({ title: 'รหัสผ่านใหม่ต้องอย่างน้อย 6 ตัวอักษร', variant: 'destructive' });
      return;
    }
    
    if (passwords.next !== passwords.confirm) {
      toast({ title: 'รหัสผ่านใหม่ไม่ตรงกัน', variant: 'destructive' });
      return;
    }

    const result = await Swal.fire({
      title: 'ยืนยันการเปลี่ยนรหัสผ่าน',
      text: 'คุณต้องการเปลี่ยนรหัสผ่านหรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      customClass: {
        popup: 'swal-popup-custom',
        title: 'swal-title-custom',
        content: 'swal-content-custom'
      }
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setPasswords({ current: '', next: '', confirm: '' });
        
        await Swal.fire({
          title: 'เปลี่ยนรหัสผ่านสำเร็จ!',
          text: 'รหัสผ่านของคุณได้รับการอัปเดตแล้ว',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#3b82f6',
          customClass: {
            popup: 'swal-popup-custom',
            title: 'swal-title-custom',
            content: 'swal-content-custom'
          }
        });
        
        toast({ 
          title: 'เปลี่ยนรหัสผ่านสำเร็จ',
          description: 'รหัสผ่านได้รับการอัปเดตแล้ว'
        });
      } catch (error) {
        toast({ 
          title: 'เกิดข้อผิดพลาด',
          description: 'ไม่สามารถเปลี่ยนรหัสผ่านได้',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm(prev => ({ ...prev, avatar: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock data for statistics
  const adminStats = {
    totalUsers: 1250,
    totalOrders: 3420,
    totalRevenue: 1250000,
    lastLogin: '2024-01-15T10:30:00Z',
    accountCreated: '2023-06-01T09:00:00Z',
    loginCount: 156,
    permissions: ['admin', 'user_management', 'order_management', 'product_management']
  };

  return (
    <>
      <Helmet>
        <title>โปรไฟล์แอดมิน - SCC Admin</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">โปรไฟล์แอดมิน</h1>
            <p className="text-muted-foreground">
              จัดการข้อมูลส่วนตัว การตั้งค่า และความปลอดภัย
            </p>
          </div>
          <Badge variant="default" className="bg-red-100 text-red-800">
            <Shield className="w-3 h-3 mr-1" />
            ผู้ดูแลระบบ
          </Badge>
        </div>

        {/* Profile Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border-4 border-white shadow-lg">
                  {form.avatar ? (
                    <img src={form.avatar} alt="avatar" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary/10">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
                  onClick={() => document.getElementById('avatar-upload').click()}
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{form.name}</h2>
                <p className="text-muted-foreground flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {form.email}
                </p>
                <p className="text-muted-foreground flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  {form.position} • {form.department}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    ออนไลน์
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    เข้าสู่ระบบล่าสุด: {new Date(adminStats.lastLogin).toLocaleDateString('th-TH')}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ผู้ใช้ทั้งหมด</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ออเดอร์ทั้งหมด</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalOrders.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ยอดขายรวม</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(adminStats.totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">การเข้าสู่ระบบ</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.loginCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">ข้อมูลส่วนตัว</TabsTrigger>
            <TabsTrigger value="security">ความปลอดภัย</TabsTrigger>
            <TabsTrigger value="settings">การตั้งค่า</TabsTrigger>
            <TabsTrigger value="activity">กิจกรรม</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลส่วนตัว</CardTitle>
                <CardDescription>อัปเดตข้อมูลส่วนตัวของคุณ</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="ชื่อ-นามสกุล"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">อีเมล *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="081-234-5678"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">ตำแหน่ง</Label>
                      <Input
                        id="position"
                        name="position"
                        value={form.position}
                        onChange={onChange}
                        placeholder="ตำแหน่งงาน"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">แผนก</Label>
                      <Input
                        id="department"
                        name="department"
                        value={form.department}
                        onChange={onChange}
                        placeholder="แผนก"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">เว็บไซต์</Label>
                      <Input
                        id="website"
                        name="website"
                        value={form.website}
                        onChange={onChange}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">ที่อยู่</Label>
                    <Input
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={onChange}
                      placeholder="ที่อยู่"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">ข้อมูลส่วนตัว</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={form.bio}
                      onChange={onChange}
                      placeholder="บอกเกี่ยวกับตัวคุณ..."
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm min-h-[100px] resize-none"
                    />
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        กำลังบันทึก...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        บันทึกข้อมูล
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>เปลี่ยนรหัสผ่าน</CardTitle>
                <CardDescription>ตั้งรหัสผ่านใหม่เพื่อความปลอดภัย</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={submitPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current">รหัสผ่านเดิม *</Label>
                    <div className="relative">
                      <Input
                        id="current"
                        name="current"
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwords.current}
                        onChange={onChangePassword}
                        placeholder="รหัสผ่านเดิม"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility('current')}
                      >
                        {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="next">รหัสผ่านใหม่ *</Label>
                    <div className="relative">
                      <Input
                        id="next"
                        name="next"
                        type={showPasswords.next ? 'text' : 'password'}
                        value={passwords.next}
                        onChange={onChangePassword}
                        placeholder="รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร)"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility('next')}
                      >
                        {showPasswords.next ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm">ยืนยันรหัสผ่านใหม่ *</Label>
                    <div className="relative">
                      <Input
                        id="confirm"
                        name="confirm"
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwords.confirm}
                        onChange={onChangePassword}
                        placeholder="ยืนยันรหัสผ่านใหม่"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility('confirm')}
                      >
                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        กำลังเปลี่ยนรหัสผ่าน...
                      </>
                    ) : (
                      <>
                        <Key className="mr-2 h-4 w-4" />
                        เปลี่ยนรหัสผ่าน
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>สิทธิ์การเข้าถึง</CardTitle>
                <CardDescription>สิทธิ์ที่คุณมีในระบบ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {adminStats.permissions.map((permission, index) => (
                    <Badge key={index} variant="secondary" className="justify-center">
                      <Shield className="w-3 h-3 mr-1" />
                      {permission.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>การตั้งค่าการแจ้งเตือน</CardTitle>
                <CardDescription>เลือกประเภทการแจ้งเตือนที่คุณต้องการรับ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>การแจ้งเตือนทางอีเมล</Label>
                    <p className="text-sm text-muted-foreground">รับการแจ้งเตือนผ่านอีเมล</p>
                  </div>
                  <input
                    type="checkbox"
                    name="notifications.email"
                    checked={form.notifications.email}
                    onChange={onChange}
                    className="rounded border-input"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>การแจ้งเตือนแบบ Push</Label>
                    <p className="text-sm text-muted-foreground">รับการแจ้งเตือนแบบ Push</p>
                  </div>
                  <input
                    type="checkbox"
                    name="notifications.push"
                    checked={form.notifications.push}
                    onChange={onChange}
                    className="rounded border-input"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>การแจ้งเตือนทาง SMS</Label>
                    <p className="text-sm text-muted-foreground">รับการแจ้งเตือนผ่าน SMS</p>
                  </div>
                  <input
                    type="checkbox"
                    name="notifications.sms"
                    checked={form.notifications.sms}
                    onChange={onChange}
                    className="rounded border-input"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>การตั้งค่าทั่วไป</CardTitle>
                <CardDescription>การตั้งค่าสำหรับบัญชีของคุณ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">เขตเวลา</Label>
                    <Input
                      id="timezone"
                      name="timezone"
                      value={form.timezone}
                      onChange={onChange}
                      placeholder="Asia/Bangkok"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">ภาษา</Label>
                    <Input
                      id="language"
                      name="language"
                      value={form.language}
                      onChange={onChange}
                      placeholder="th"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลบัญชี</CardTitle>
                <CardDescription>ข้อมูลเกี่ยวกับบัญชีของคุณ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">วันที่สร้างบัญชี</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(adminStats.accountCreated).toLocaleDateString('th-TH')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">เข้าสู่ระบบล่าสุด</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(adminStats.lastLogin).toLocaleString('th-TH')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">จำนวนการเข้าสู่ระบบ</p>
                      <p className="text-sm text-muted-foreground">{adminStats.loginCount} ครั้ง</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">สถานะบัญชี</p>
                      <p className="text-sm text-muted-foreground">ใช้งานปกติ</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminProfile;


