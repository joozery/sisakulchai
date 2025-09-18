import React, { useState, useMemo, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Search, 
  MoreHorizontal, 
  Shield, 
  Trash2, 
  UserPlus, 
  Edit, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  User,
  Users,
  UserCheck,
  UserX,
  Crown,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Swal from 'sweetalert2';
import { api } from '@/lib/api';

const initialUsers = [];

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'staff',
    status: 'active',
    address: '',
    password: '',
    confirmPassword: ''
  });

  // Load users from API (only admin/staff)
  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/api/admin/users');
      if (data?.ok) setUsers(data.users || []);
    } catch (e) {
      console.error(e);
      toast({ title: 'โหลดผู้ใช้ล้มเหลว', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone?.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.address?.toLowerCase().includes(q)
    );
  }, [users, query]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast({
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        description: 'ชื่อและอีเมลเป็นข้อมูลที่จำเป็น',
        variant: 'destructive',
      });
      return;
    }

    // Password validations
    if (!editingUser) {
      if (formData.password && formData.password.length < 8) {
        toast({ title: 'รหัสผ่านต้องอย่างน้อย 8 ตัวอักษร', variant: 'destructive' });
        return;
      }
      if (formData.password && formData.password !== formData.confirmPassword) {
        toast({ title: 'รหัสผ่านไม่ตรงกัน', variant: 'destructive' });
        return;
      }
    } else {
      if (formData.password) {
        if (formData.password.length < 8) {
          toast({ title: 'รหัสผ่านใหม่ต้องอย่างน้อย 8 ตัวอักษร', variant: 'destructive' });
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          toast({ title: 'รหัสผ่านใหม่ไม่ตรงกัน', variant: 'destructive' });
          return;
        }
      }
    }

    try {
      if (editingUser) {
        await api.patch(`/api/admin/users/${editingUser.id}`, {
          name: formData.name,
          phone: formData.phone || null,
          role: formData.role,
          status: formData.status,
          address: formData.address || null,
          ...(formData.password ? { password: formData.password } : {}),
        });
        toast({ title: 'อัปเดตผู้ใช้สำเร็จ' });
      } else {
        const password = formData.password || (Math.random().toString(36).slice(-10) + '!');
        await api.post('/api/admin/users', {
          name: formData.name,
          email: formData.email,
          password,
          phone: formData.phone || null,
          role: formData.role,
          status: formData.status,
          address: formData.address || null,
        });
        await Swal.fire({
          title: 'เพิ่มผู้ใช้สำเร็จ',
          html: `
            <div style="text-align:left;font-size:14px;line-height:1.6">
              <div><strong>ชื่อ:</strong> ${formData.name}</div>
              <div><strong>อีเมล:</strong> ${formData.email}</div>
              <div style="margin-top:8px;padding:10px;border:1px dashed #ddd;border-radius:8px;background:#fafafa">
                <div style="font-size:12px;color:#666;margin-bottom:6px">รหัสผ่านชั่วคราว</div>
                <div style="display:flex;gap:8px;align-items:center">
                  <code id="tmp-pass" style="padding:4px 8px;background:#fff;border:1px solid #eee;border-radius:6px">${password}</code>
                  <button id="copy-pass" style="padding:6px 10px;border:1px solid #e5e7eb;border-radius:6px;background:#f3f4f6;cursor:pointer">คัดลอก</button>
                </div>
              </div>
              <div style="margin-top:10px;color:#64748b;font-size:12px">กรุณาส่งรหัสนี้ให้ผู้ใช้ และแนะนำให้เปลี่ยนรหัสผ่านทันทีหลังเข้าสู่ระบบ</div>
            </div>
          `,
          focusConfirm: false,
          showCancelButton: false,
          confirmButtonText: 'ปิด',
          didOpen: () => {
            const btn = document.getElementById('copy-pass');
            if (btn) {
              btn.addEventListener('click', async () => {
                try { await navigator.clipboard.writeText(password); btn.textContent = 'คัดลอกแล้ว'; } catch {}
              });
            }
          }
        });
      }
      resetForm();
      setIsDialogOpen(false);
      loadUsers();
    } catch (error) {
      console.error(error);
      toast({ title: 'บันทึกไม่สำเร็จ', variant: 'destructive' });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      status: user.status,
      address: user.address || '',
      password: '',
      confirmPassword: ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (user) => {
    const result = await Swal.fire({
      title: 'ยืนยันการลบ',
      text: `คุณต้องการลบผู้ใช้ "${user.name}" หรือไม่?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
      customClass: {
        popup: 'swal-popup-custom',
        title: 'swal-title-custom',
        content: 'swal-content-custom'
      }
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/admin/users/${user.id}`);
        toast({ title: 'ลบผู้ใช้สำเร็จ' });
        loadUsers();
      } catch (e) {
        toast({ title: 'ลบไม่สำเร็จ', variant: 'destructive' });
      }
    }
  };

  const toggleRole = async (user) => {
    const newRole = user.role === 'admin' ? 'customer' : 'admin';
    const result = await Swal.fire({
      title: 'เปลี่ยนสิทธิ์ผู้ใช้',
      text: `คุณต้องการเปลี่ยนสิทธิ์ "${user.name}" เป็น ${newRole === 'admin' ? 'ผู้ดูแลระบบ' : 'ลูกค้า'} หรือไม่?`,
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
      try {
        await api.patch(`/api/admin/users/${user.id}`, { role: newRole });
        toast({ title: 'เปลี่ยนสิทธิ์สำเร็จ' });
        loadUsers();
      } catch (e) {
        toast({ title: 'เปลี่ยนสิทธิ์ไม่สำเร็จ', variant: 'destructive' });
      }
    }
  };

  const toggleStatus = async (user) => {
    const newStatus = user.status === 'active' ? 'banned' : 'active';
    const result = await Swal.fire({
      title: newStatus === 'banned' ? 'ระงับผู้ใช้' : 'เปิดใช้งานผู้ใช้',
      text: `คุณต้องการ${newStatus === 'banned' ? 'ระงับ' : 'เปิดใช้งาน'} "${user.name}" หรือไม่?`,
      icon: newStatus === 'banned' ? 'warning' : 'success',
      showCancelButton: true,
      confirmButtonColor: newStatus === 'banned' ? '#ef4444' : '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: newStatus === 'banned' ? 'ระงับ' : 'เปิดใช้งาน',
      cancelButtonText: 'ยกเลิก',
      customClass: {
        popup: 'swal-popup-custom',
        title: 'swal-title-custom',
        content: 'swal-content-custom'
      }
    });

    if (result.isConfirmed) {
      try {
        await api.patch(`/api/admin/users/${user.id}`, { status: newStatus });
        toast({ title: newStatus === 'banned' ? 'ระงับผู้ใช้สำเร็จ' : 'เปิดใช้งานผู้ใช้สำเร็จ' });
        loadUsers();
      } catch (e) {
        toast({ title: 'อัปเดตสถานะไม่สำเร็จ', variant: 'destructive' });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'staff',
      status: 'active',
      address: '',
      password: '',
      confirmPassword: ''
    });
    setEditingUser(null);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <Badge variant="default" className="bg-red-100 text-red-800"><Crown className="w-3 h-3 mr-1" />Admin</Badge>;
      case 'customer':
        return <Badge variant="secondary"><User className="w-3 h-3 mr-1" />ลูกค้า</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800"><UserCheck className="w-3 h-3 mr-1" />ใช้งาน</Badge>;
      case 'banned':
        return <Badge variant="destructive"><UserX className="w-3 h-3 mr-1" />ระงับ</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>จัดการผู้ใช้ - SCC Admin</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">จัดการผู้ใช้</h1>
            <p className="text-muted-foreground">
              จัดการข้อมูลผู้ใช้ สิทธิ์ และสถานะการใช้งาน
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <UserPlus className="mr-2 h-4 w-4" />
                เพิ่มผู้ใช้
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingUser ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}
                </DialogTitle>
                <DialogDescription>
                  {editingUser ? 'แก้ไขข้อมูลผู้ใช้' : 'กรอกข้อมูลเพื่อเพิ่มผู้ใช้ใหม่'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="ชื่อ-นามสกุล"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">อีเมล *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="081-234-5678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">สิทธิ์</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">ลูกค้า</SelectItem>
                        <SelectItem value="admin">ผู้ดูแลระบบ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">ที่อยู่</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="ที่อยู่"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">สถานะ</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">ใช้งาน</SelectItem>
                      <SelectItem value="banned">ระงับ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Password fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">{editingUser ? 'ตั้งรหัสใหม่ (ไม่บังคับ)' : 'รหัสผ่าน'}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={editingUser ? 'ใส่เฉพาะกรณีต้องการเปลี่ยน' : 'อย่างน้อย 8 ตัวอักษร (เว้นว่างให้ระบบสุ่ม)'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="พิมพ์รหัสผ่านซ้ำ"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    ยกเลิก
                  </Button>
                  <Button type="submit">
                    {editingUser ? 'อัปเดต' : 'เพิ่มผู้ใช้'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ผู้ใช้ทั้งหมด</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ใช้งานอยู่</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ผู้ดูแลระบบ</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.role === 'admin').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ลูกค้า</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.role === 'customer').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>รายการผู้ใช้</CardTitle>
            <CardDescription>
              จัดการข้อมูลผู้ใช้ สิทธิ์ และสถานะการใช้งาน
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="ค้นหาชื่อ อีเมล เบอร์โทร หรือที่อยู่" 
                  className="pl-8" 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                />
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <ReactLoading type="spin" color="#10b981" height={36} width={36} />
                <span className="ml-3 text-sm text-muted-foreground">กำลังโหลดข้อมูลผู้ใช้...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">ไม่พบผู้ใช้</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  ลองค้นหาด้วยคำอื่น หรือเพิ่มผู้ใช้ใหม่
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ผู้ใช้</TableHead>
                    <TableHead>ข้อมูลติดต่อ</TableHead>
                    <TableHead>สิทธิ์</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>วันที่เข้าร่วม</TableHead>
                    <TableHead>ออเดอร์</TableHead>
                    <TableHead>การจัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          {user.address && (
                            <div className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {user.address}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="h-3 w-3 mr-1" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          {new Date(user.joinDate).toLocaleDateString('th-TH')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{user.totalOrders} ออเดอร์</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStatus(user)}
                            title={user.status === 'active' ? 'ระงับผู้ใช้' : 'เปิดใช้งานผู้ใช้'}
                          >
                            {user.status === 'active' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRole(user)}
                            title="เปลี่ยนสิทธิ์"
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(user)}
                            title="แก้ไขข้อมูล"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(user)}
                            title="ลบผู้ใช้"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminUsers;


