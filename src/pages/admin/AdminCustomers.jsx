import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
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
  ShoppingBag,
  CreditCard,
  Star,
  TrendingUp,
  Filter,
  Download,
  MoreHorizontal
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

const initialCustomers = [
  { 
    id: 1, 
    name: 'สมชาย ใจดี', 
    email: 'somchai@example.com', 
    phone: '082-345-6789',
    status: 'active',
    joinDate: '2024-01-05',
    lastLogin: '2024-01-14',
    address: '123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพมหานคร 10110',
    totalOrders: 5,
    totalSpent: 15750,
    averageOrder: 3150,
    loyaltyPoints: 1575,
    preferredCategory: 'สีทาบ้าน',
    lastOrderDate: '2024-01-12',
    customerType: 'regular'
  },
  { 
    id: 2, 
    name: 'สุดา รักดี', 
    email: 'suda@example.com', 
    phone: '083-456-7890',
    status: 'active',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-13',
    address: '456 ถนนราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร 10330',
    totalOrders: 2,
    totalSpent: 4200,
    averageOrder: 2100,
    loyaltyPoints: 420,
    preferredCategory: 'สีรถยนต์',
    lastOrderDate: '2024-01-11',
    customerType: 'new'
  },
  { 
    id: 3, 
    name: 'วิชัย เก่งมาก', 
    email: 'wichai@example.com', 
    phone: '084-567-8901',
    status: 'inactive',
    joinDate: '2023-12-15',
    lastLogin: '2024-01-05',
    address: '789 ถนนพหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900',
    totalOrders: 8,
    totalSpent: 25600,
    averageOrder: 3200,
    loyaltyPoints: 2560,
    preferredCategory: 'สีทาบ้าน',
    lastOrderDate: '2024-01-05',
    customerType: 'vip'
  },
  { 
    id: 4, 
    name: 'มาลี สวยงาม', 
    email: 'malee@example.com', 
    phone: '085-678-9012',
    status: 'active',
    joinDate: '2024-01-08',
    lastLogin: '2024-01-15',
    address: '321 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพมหานคร 10110',
    totalOrders: 3,
    totalSpent: 8900,
    averageOrder: 2967,
    loyaltyPoints: 890,
    preferredCategory: 'สีตกแต่ง',
    lastOrderDate: '2024-01-14',
    customerType: 'regular'
  },
  { 
    id: 5, 
    name: 'ประเสริฐ ดีมาก', 
    email: 'prasert@example.com', 
    phone: '086-789-0123',
    status: 'banned',
    joinDate: '2023-11-20',
    lastLogin: '2024-01-02',
    address: '654 ถนนรัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310',
    totalOrders: 1,
    totalSpent: 1500,
    averageOrder: 1500,
    loyaltyPoints: 150,
    preferredCategory: 'สีทาบ้าน',
    lastOrderDate: '2024-01-02',
    customerType: 'new'
  }
];

const AdminCustomers = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState(initialCustomers);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active',
    address: '',
    customerType: 'regular'
  });

  // Load customers from localStorage
  useEffect(() => {
    const savedCustomers = localStorage.getItem('scc_customers');
    if (savedCustomers) {
      try {
        setCustomers(JSON.parse(savedCustomers));
      } catch (error) {
        console.error('Error loading customers:', error);
      }
    }
  }, []);

  // Save customers to localStorage
  const saveCustomers = (newCustomers) => {
    setCustomers(newCustomers);
    localStorage.setItem('scc_customers', JSON.stringify(newCustomers));
  };

  const filtered = useMemo(() => {
    let filteredCustomers = customers;

    // Search filter
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.name.toLowerCase().includes(q) ||
        customer.email.toLowerCase().includes(q) ||
        customer.phone?.toLowerCase().includes(q) ||
        customer.address?.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filteredCustomers = filteredCustomers.filter(customer => customer.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filteredCustomers = filteredCustomers.filter(customer => customer.customerType === typeFilter);
    }

    return filteredCustomers;
  }, [customers, query, statusFilter, typeFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        description: 'ชื่อและอีเมลเป็นข้อมูลที่จำเป็น',
        variant: 'destructive',
      });
      return;
    }

    const customerData = {
      ...formData,
      id: editingCustomer ? editingCustomer.id : Date.now(),
      joinDate: editingCustomer ? editingCustomer.joinDate : new Date().toISOString().split('T')[0],
      lastLogin: editingCustomer ? editingCustomer.lastLogin : new Date().toISOString().split('T')[0],
      totalOrders: editingCustomer ? editingCustomer.totalOrders : 0,
      totalSpent: editingCustomer ? editingCustomer.totalSpent : 0,
      averageOrder: editingCustomer ? editingCustomer.averageOrder : 0,
      loyaltyPoints: editingCustomer ? editingCustomer.loyaltyPoints : 0,
      preferredCategory: editingCustomer ? editingCustomer.preferredCategory : 'สีทาบ้าน',
      lastOrderDate: editingCustomer ? editingCustomer.lastOrderDate : null
    };

    let newCustomers;
    if (editingCustomer) {
      newCustomers = customers.map(c => c.id === editingCustomer.id ? customerData : c);
      toast({
        title: 'อัปเดตข้อมูลลูกค้าสำเร็จ',
        description: 'ข้อมูลลูกค้าได้รับการอัปเดตแล้ว',
      });
    } else {
      newCustomers = [...customers, customerData];
      toast({
        title: 'เพิ่มลูกค้าสำเร็จ',
        description: 'ลูกค้าใหม่ถูกเพิ่มเข้าสู่ระบบแล้ว',
      });
    }

    saveCustomers(newCustomers);
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      status: customer.status,
      address: customer.address || '',
      customerType: customer.customerType
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (customer) => {
    const result = await Swal.fire({
      title: 'ยืนยันการลบ',
      text: `คุณต้องการลบลูกค้า "${customer.name}" หรือไม่?`,
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
      const newCustomers = customers.filter(c => c.id !== customer.id);
      saveCustomers(newCustomers);
      toast({
        title: 'ลบลูกค้าสำเร็จ',
        description: 'ลูกค้าถูกลบออกจากระบบแล้ว',
      });
    }
  };

  const toggleStatus = async (customer) => {
    const newStatus = customer.status === 'active' ? 'inactive' : 'active';
    const result = await Swal.fire({
      title: newStatus === 'inactive' ? 'ระงับลูกค้า' : 'เปิดใช้งานลูกค้า',
      text: `คุณต้องการ${newStatus === 'inactive' ? 'ระงับ' : 'เปิดใช้งาน'} "${customer.name}" หรือไม่?`,
      icon: newStatus === 'inactive' ? 'warning' : 'success',
      showCancelButton: true,
      confirmButtonColor: newStatus === 'inactive' ? '#ef4444' : '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: newStatus === 'inactive' ? 'ระงับ' : 'เปิดใช้งาน',
      cancelButtonText: 'ยกเลิก',
      customClass: {
        popup: 'swal-popup-custom',
        title: 'swal-title-custom',
        content: 'swal-content-custom'
      }
    });

    if (result.isConfirmed) {
      const newCustomers = customers.map(c => c.id === customer.id ? { ...c, status: newStatus } : c);
      saveCustomers(newCustomers);
      toast({
        title: newStatus === 'inactive' ? 'ระงับลูกค้าสำเร็จ' : 'เปิดใช้งานลูกค้าสำเร็จ',
        description: `ลูกค้า "${customer.name}" ${newStatus === 'inactive' ? 'ถูกระงับ' : 'ถูกเปิดใช้งาน'} แล้ว`,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'active',
      address: '',
      customerType: 'regular'
    });
    setEditingCustomer(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800"><UserCheck className="w-3 h-3 mr-1" />ใช้งาน</Badge>;
      case 'inactive':
        return <Badge variant="secondary"><UserX className="w-3 h-3 mr-1" />ไม่ใช้งาน</Badge>;
      case 'banned':
        return <Badge variant="destructive"><UserX className="w-3 h-3 mr-1" />ระงับ</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'vip':
        return <Badge variant="default" className="bg-purple-100 text-purple-800"><Star className="w-3 h-3 mr-1" />VIP</Badge>;
      case 'regular':
        return <Badge variant="secondary"><User className="w-3 h-3 mr-1" />ลูกค้าปกติ</Badge>;
      case 'new':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800"><TrendingUp className="w-3 h-3 mr-1" />ลูกค้าใหม่</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>จัดการลูกค้า - SCC Admin</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">จัดการลูกค้า</h1>
            <p className="text-muted-foreground">
              จัดการข้อมูลลูกค้า สถิติการซื้อ และการติดต่อ
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              ส่งออกข้อมูล
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="mr-2 h-4 w-4" />
                  เพิ่มลูกค้า
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingCustomer ? 'แก้ไขข้อมูลลูกค้า' : 'เพิ่มลูกค้าใหม่'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingCustomer ? 'แก้ไขข้อมูลลูกค้า' : 'กรอกข้อมูลเพื่อเพิ่มลูกค้าใหม่'}
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
                      <Label htmlFor="customerType">ประเภทลูกค้า</Label>
                      <Select value={formData.customerType} onValueChange={(value) => setFormData({...formData, customerType: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">ลูกค้าใหม่</SelectItem>
                          <SelectItem value="regular">ลูกค้าปกติ</SelectItem>
                          <SelectItem value="vip">ลูกค้า VIP</SelectItem>
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
                        <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                        <SelectItem value="banned">ระงับ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      ยกเลิก
                    </Button>
                    <Button type="submit">
                      {editingCustomer ? 'อัปเดต' : 'เพิ่มลูกค้า'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ลูกค้าทั้งหมด</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ลูกค้าใช้งาน</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => c.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ลูกค้า VIP</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => c.customerType === 'vip').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ยอดขายรวม</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>ค้นหาและกรอง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="ค้นหาชื่อ อีเมล เบอร์โทร หรือที่อยู่" 
                  className="pl-8" 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="สถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกสถานะ</SelectItem>
                  <SelectItem value="active">ใช้งาน</SelectItem>
                  <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                  <SelectItem value="banned">ระงับ</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="ประเภทลูกค้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกประเภท</SelectItem>
                  <SelectItem value="new">ลูกค้าใหม่</SelectItem>
                  <SelectItem value="regular">ลูกค้าปกติ</SelectItem>
                  <SelectItem value="vip">ลูกค้า VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>รายการลูกค้า</CardTitle>
            <CardDescription>
              จัดการข้อมูลลูกค้า สถิติการซื้อ และการติดต่อ
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">ไม่พบลูกค้า</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  ลองค้นหาด้วยคำอื่น หรือเพิ่มลูกค้าใหม่
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ลูกค้า</TableHead>
                    <TableHead>ข้อมูลติดต่อ</TableHead>
                    <TableHead>ประเภท</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>สถิติการซื้อ</TableHead>
                    <TableHead>วันที่เข้าร่วม</TableHead>
                    <TableHead>การจัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(customer => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          {customer.address && (
                            <div className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {customer.address.length > 50 
                                ? `${customer.address.substring(0, 50)}...` 
                                : customer.address}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                            {customer.email}
                          </div>
                          {customer.phone && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="h-3 w-3 mr-1" />
                              {customer.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(customer.customerType)}</TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {customer.totalOrders} ออเดอร์
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatCurrency(customer.totalSpent)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            เฉลี่ย {formatCurrency(customer.averageOrder)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          {new Date(customer.joinDate).toLocaleDateString('th-TH')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStatus(customer)}
                            title={customer.status === 'active' ? 'ระงับลูกค้า' : 'เปิดใช้งานลูกค้า'}
                          >
                            {customer.status === 'active' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(customer)}
                            title="แก้ไขข้อมูล"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(customer)}
                            title="ลบลูกค้า"
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

export default AdminCustomers;
