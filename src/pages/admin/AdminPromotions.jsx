import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Calendar,
  Clock,
  Image as ImageIcon,
  Link as LinkIcon,
  Target,
  BarChart3
} from 'lucide-react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import Swal from 'sweetalert2';

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    linkUrl: '',
    startDate: '',
    endDate: '',
    isActive: true,
    targetAudience: 'all',
    priority: 1
  });
  const { toast } = useToast();

  // Load promotions from localStorage
  useEffect(() => {
    const savedPromotions = localStorage.getItem('scc_promotions');
    if (savedPromotions) {
      try {
        setPromotions(JSON.parse(savedPromotions));
      } catch (error) {
        console.error('Error loading promotions:', error);
      }
    }
  }, []);

  // Save promotions to localStorage
  const savePromotions = (newPromotions) => {
    setPromotions(newPromotions);
    localStorage.setItem('scc_promotions', JSON.stringify(newPromotions));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast({
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        description: 'ชื่อและคำอธิบายเป็นข้อมูลที่จำเป็น',
        variant: 'destructive',
      });
      return;
    }

    const promotionData = {
      ...formData,
      id: editingPromotion ? editingPromotion.id : Date.now(),
      createdAt: editingPromotion ? editingPromotion.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let newPromotions;
    if (editingPromotion) {
      newPromotions = promotions.map(p => 
        p.id === editingPromotion.id ? promotionData : p
      );
      toast({
        title: 'อัปเดต Promotion สำเร็จ',
        description: 'ข้อมูล Promotion ได้รับการอัปเดตแล้ว',
      });
    } else {
      newPromotions = [...promotions, promotionData];
      toast({
        title: 'สร้าง Promotion สำเร็จ',
        description: 'Promotion ใหม่ถูกสร้างแล้ว',
      });
    }

    savePromotions(newPromotions);
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (promotion) => {
    setEditingPromotion(promotion);
    setFormData({
      title: promotion.title,
      description: promotion.description,
      imageUrl: promotion.imageUrl,
      linkUrl: promotion.linkUrl,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      isActive: promotion.isActive,
      targetAudience: promotion.targetAudience,
      priority: promotion.priority
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (promotion) => {
    const result = await Swal.fire({
      title: 'ยืนยันการลบ',
      text: `คุณต้องการลบ Promotion "${promotion.title}" หรือไม่?`,
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
      const newPromotions = promotions.filter(p => p.id !== promotion.id);
      savePromotions(newPromotions);
      toast({
        title: 'ลบ Promotion สำเร็จ',
        description: 'Promotion ถูกลบออกจากระบบแล้ว',
      });
    }
  };

  const toggleActive = (promotion) => {
    const newPromotions = promotions.map(p => 
      p.id === promotion.id ? { ...p, isActive: !p.isActive } : p
    );
    savePromotions(newPromotions);
    toast({
      title: promotion.isActive ? 'ปิดใช้งาน Promotion' : 'เปิดใช้งาน Promotion',
      description: `Promotion "${promotion.title}" ${promotion.isActive ? 'ถูกปิดใช้งาน' : 'ถูกเปิดใช้งาน'} แล้ว`,
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      linkUrl: '',
      startDate: '',
      endDate: '',
      isActive: true,
      targetAudience: 'all',
      priority: 1
    });
    setEditingPromotion(null);
  };

  const getStatusBadge = (promotion) => {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);

    if (!promotion.isActive) {
      return <Badge variant="secondary">ปิดใช้งาน</Badge>;
    }
    if (now < startDate) {
      return <Badge variant="outline">รอเริ่ม</Badge>;
    }
    if (now > endDate) {
      return <Badge variant="destructive">หมดอายุ</Badge>;
    }
    return <Badge variant="default">ใช้งานอยู่</Badge>;
  };

  return (
    <>
      <Helmet>
        <title>จัดการ Promotion - SCC Admin</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">จัดการ Promotion</h1>
            <p className="text-muted-foreground">
              จัดการ popup promotion และโปรโมชั่นต่างๆ
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                สร้าง Promotion
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingPromotion ? 'แก้ไข Promotion' : 'สร้าง Promotion ใหม่'}
                </DialogTitle>
                <DialogDescription>
                  {editingPromotion ? 'แก้ไขข้อมูล Promotion' : 'กรอกข้อมูลเพื่อสร้าง Promotion ใหม่'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">ชื่อ Promotion *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="ชื่อ Promotion"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">ลำดับความสำคัญ</Label>
                    <Input
                      id="priority"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">คำอธิบาย *</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="คำอธิบาย Promotion"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">URL รูปภาพ</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkUrl">URL ลิงก์</Label>
                    <Input
                      id="linkUrl"
                      value={formData.linkUrl}
                      onChange={(e) => setFormData({...formData, linkUrl: e.target.value})}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">วันที่เริ่มต้น</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">วันที่สิ้นสุด</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience">กลุ่มเป้าหมาย</Label>
                  <select
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="all">ทุกคน</option>
                    <option value="new">ลูกค้าใหม่</option>
                    <option value="existing">ลูกค้าเก่า</option>
                    <option value="vip">ลูกค้า VIP</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="rounded border-input"
                  />
                  <Label htmlFor="isActive">เปิดใช้งาน</Label>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    ยกเลิก
                  </Button>
                  <Button type="submit">
                    {editingPromotion ? 'อัปเดต' : 'สร้าง'}
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
              <CardTitle className="text-sm font-medium">ทั้งหมด</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{promotions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ใช้งานอยู่</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {promotions.filter(p => p.isActive).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">รอเริ่ม</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {promotions.filter(p => {
                  const now = new Date();
                  const startDate = new Date(p.startDate);
                  return p.isActive && now < startDate;
                }).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">หมดอายุ</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {promotions.filter(p => {
                  const now = new Date();
                  const endDate = new Date(p.endDate);
                  return now > endDate;
                }).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Promotions Table */}
        <Card>
          <CardHeader>
            <CardTitle>รายการ Promotion</CardTitle>
            <CardDescription>
              จัดการ Promotion ทั้งหมดในระบบ
            </CardDescription>
          </CardHeader>
          <CardContent>
            {promotions.length === 0 ? (
              <div className="text-center py-8">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">ไม่มี Promotion</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  เริ่มต้นด้วยการสร้าง Promotion ใหม่
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ชื่อ</TableHead>
                    <TableHead>คำอธิบาย</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>วันที่เริ่ม</TableHead>
                    <TableHead>วันที่สิ้นสุด</TableHead>
                    <TableHead>กลุ่มเป้าหมาย</TableHead>
                    <TableHead>การจัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map((promotion) => (
                    <TableRow key={promotion.id}>
                      <TableCell className="font-medium">{promotion.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{promotion.description}</TableCell>
                      <TableCell>{getStatusBadge(promotion)}</TableCell>
                      <TableCell>
                        {promotion.startDate ? new Date(promotion.startDate).toLocaleDateString('th-TH') : '-'}
                      </TableCell>
                      <TableCell>
                        {promotion.endDate ? new Date(promotion.endDate).toLocaleDateString('th-TH') : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{promotion.targetAudience}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleActive(promotion)}
                          >
                            {promotion.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(promotion)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(promotion)}
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

export default AdminPromotions;
