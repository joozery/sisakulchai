
import React, { useMemo, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import {
  PlusCircle,
  File,
  MoreHorizontal,
  Upload,
  Image as ImageIcon,
  X,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Eye,
  Package,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Camera,
  FileImage,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts } from '@/contexts/ProductContext';
import { useToast } from '@/components/ui/use-toast';
import Swal from 'sweetalert2';

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: 'house-paint',
    description: '',
    stock: '',
    image: '',
    imageFile: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        stock: product.stock,
        image: product.image,
        imageFile: null
      });
      setImagePreview(product.image);
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        price: '',
        category: 'house-paint',
        description: '',
        stock: '',
        image: '',
        imageFile: null
      });
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const handleModalClose = async () => {
    // Check if there are unsaved changes
    const hasChanges = productForm.name || productForm.price || productForm.description || productForm.stock || productForm.imageFile;
    
    if (hasChanges) {
      const result = await Swal.fire({
        title: 'ยืนยันการปิด',
        text: 'คุณมีข้อมูลที่ยังไม่ได้บันทึก คุณต้องการปิดหน้าต่างนี้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'ใช่, ปิดเลย!',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        setIsModalOpen(false);
        setImagePreview(null);
      }
    } else {
      setIsModalOpen(false);
      setImagePreview(null);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        await Swal.fire({
          title: 'ไฟล์ไม่ถูกต้อง!',
          text: 'กรุณาเลือกไฟล์รูปภาพเท่านั้น (PNG, JPG, GIF)',
          icon: 'error',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#ef4444'
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        await Swal.fire({
          title: 'ไฟล์ใหญ่เกินไป!',
          text: 'กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 5MB',
          icon: 'warning',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#f59e0b'
        });
        return;
      }

      setProductForm(prev => ({ ...prev, imageFile: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        // Show success message for successful upload
        Swal.fire({
          title: 'อัปโหลดสำเร็จ!',
          text: 'รูปภาพถูกอัปโหลดเรียบร้อยแล้ว',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#10b981',
          timer: 1500,
          timerProgressBar: true,
          toast: true,
          position: 'top-end'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = async () => {
    const result = await Swal.fire({
      title: 'ยืนยันการลบรูปภาพ',
      text: 'คุณต้องการลบรูปภาพนี้หรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      setProductForm(prev => ({ ...prev, imageFile: null, image: '' }));
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      await Swal.fire({
        title: 'ลบสำเร็จ!',
        text: 'รูปภาพถูกลบเรียบร้อยแล้ว',
        icon: 'success',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#10b981',
        timer: 1500,
        timerProgressBar: true,
        toast: true,
        position: 'top-end'
      });
    }
  };

  const simulateImageUpload = async (file) => {
    // Show loading dialog
    Swal.fire({
      title: 'กำลังอัปโหลด...',
      text: 'กรุณารอสักครู่',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Simulate upload process
    setIsUploading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, you would upload to your server here
        // For now, we'll use a data URL
        const reader = new FileReader();
        reader.onload = (e) => {
          setIsUploading(false);
          Swal.close();
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      }, 2000);
    });
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageUrl = productForm.image;
      
      // Handle file upload if there's a new image file
      if (productForm.imageFile) {
        imageUrl = await simulateImageUpload(productForm.imageFile);
      }
      
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock),
        image: imageUrl
      };
      
      // Remove imageFile from the data before saving
      delete productData.imageFile;
  
      if (editingProduct) {
        updateProduct(editingProduct.id, productData);
        await Swal.fire({
          title: 'สำเร็จ!',
          text: 'ข้อมูลสินค้าถูกอัปเดตเรียบร้อยแล้ว',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#10b981',
          timer: 2000,
          timerProgressBar: true
        });
      } else {
        addProduct(productData);
        await Swal.fire({
          title: 'สำเร็จ!',
          text: 'สินค้าใหม่ถูกเพิ่มเรียบร้อยแล้ว',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#10b981',
          timer: 2000,
          timerProgressBar: true
        });
      }
      
      setIsModalOpen(false);
      setImagePreview(null);
    } catch (error) {
      await Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
        icon: 'error',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#ef4444'
      });
    }
  };
  
  const handleDeleteProduct = async (id) => {
    const product = products.find(p => p.id === id);
    
    const result = await Swal.fire({
      title: 'ยืนยันการลบสินค้า',
      text: `คุณต้องการลบสินค้า "${product?.name}" หรือไม่?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      deleteProduct(id);
      await Swal.fire({
        title: 'ลบสำเร็จ!',
        text: 'สินค้าถูกลบเรียบร้อยแล้ว',
        icon: 'success',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#10b981',
        timer: 2000,
        timerProgressBar: true
      });
    }
  };

  const filteredProducts = useMemo(() => {
    let list = products;
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        String(p.price).includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      list = list.filter(p => (statusFilter === 'in' ? p.stock > 0 : p.stock <= 0));
    }
    if (categoryFilter !== 'all') {
      list = list.filter(p => p.category === categoryFilter);
    }
    return list;
  }, [products, query, statusFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  const toggleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(new Set(paginated.map(p => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelect = (id, checked) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (checked) next.add(id); else next.delete(id);
      return next;
    });
  };

  const bulkDelete = async () => {
    if (selectedIds.size === 0) return;
    
    const result = await Swal.fire({
      title: 'ยืนยันการลบสินค้า',
      text: `คุณต้องการลบสินค้าที่เลือก ${selectedIds.size} รายการหรือไม่?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'ใช่, ลบทั้งหมด!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      [...selectedIds].forEach(id => deleteProduct(id));
      setSelectedIds(new Set());
      await Swal.fire({
        title: 'ลบสำเร็จ!',
        text: `ลบสินค้า ${selectedIds.size} รายการเรียบร้อยแล้ว`,
        icon: 'success',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#10b981',
        timer: 2000,
        timerProgressBar: true
      });
    }
  };
  
  return (
    <>
      <Helmet>
        <title>จัดการสินค้า - SCC Admin</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">จัดการสินค้า</h1>
            <p className="text-muted-foreground">จัดการสินค้าทั้งหมดในร้านของคุณ</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              {products.length} สินค้า
            </Badge>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => openModal()} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              เพิ่มสินค้า
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">สินค้าทั้งหมด</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">รายการสินค้า</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">มีในสต็อก</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.filter(p => p.stock > 0).length}</div>
              <p className="text-xs text-muted-foreground">สินค้าพร้อมขาย</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">หมดสต็อก</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.filter(p => p.stock <= 0).length}</div>
              <p className="text-xs text-muted-foreground">ต้องเติมสต็อก</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">มูลค่ารวม</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ฿{products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">มูลค่าสต็อก</p>
            </CardContent>
          </Card>
        </div>
        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              ค้นหาและกรองสินค้า
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="ค้นหาสินค้า..." 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="สถานะสต็อก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="in">มีในสต็อก</SelectItem>
                  <SelectItem value="out">หมดสต็อก</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="หมวดหมู่" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="house-paint">สีทาบ้าน</SelectItem>
                  <SelectItem value="car-paint">สีรถยนต์</SelectItem>
                  <SelectItem value="gold-paint">สีทอง</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={selectedIds.size === 0} 
                  onClick={bulkDelete}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  ลบที่เลือก ({selectedIds.size})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>รายการสินค้า</CardTitle>
            <CardDescription>
              แสดง {paginated.length} จาก {filteredProducts.length} รายการ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300" 
                      onChange={(e) => toggleSelectAll(e.target.checked)} 
                      checked={paginated.length > 0 && selectedIds.size === paginated.length} 
                      aria-label="Select all" 
                    />
                  </TableHead>
                  <TableHead className="w-[120px]">รูปภาพ</TableHead>
                  <TableHead>ชื่อสินค้า</TableHead>
                  <TableHead>หมวดหมู่</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">ราคา</TableHead>
                  <TableHead className="text-right">สต็อก</TableHead>
                  <TableHead className="w-[100px]">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/50">
                    <TableCell>
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300" 
                        checked={selectedIds.has(product.id)} 
                        onChange={(e) => toggleSelect(product.id, e.target.checked)} 
                        aria-label={`Select ${product.name}`} 
                      />
                    </TableCell>
                    <TableCell>
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <img 
                          alt={product.name} 
                          className="w-full h-full object-cover" 
                          src={product.image || '/placeholder-image.png'} 
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyNEg0MFY0MEgyNFYyNFoiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTI4IDI4SDM2VjM2SDI4VjI4WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        {product.description && (
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {product.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {product.category === 'house-paint' && 'สีทาบ้าน'}
                        {product.category === 'car-paint' && 'สีรถยนต์'}
                        {product.category === 'gold-paint' && 'สีทอง'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                        {product.stock > 0 ? 'มีในสต็อก' : 'หมดสต็อก'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ฿{product.price.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={product.stock <= 5 ? 'text-red-500 font-medium' : ''}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">เปิดเมนู</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>การดำเนินการ</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openModal(product)} className="gap-2">
                            <Edit className="h-4 w-4" />
                            แก้ไขสินค้า
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600 gap-2" 
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            ลบสินค้า
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              แสดง <strong>{paginated.length}</strong> จาก <strong>{filteredProducts.length}</strong> รายการ
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => Math.max(1, p-1))} 
                disabled={currentPage === 1}
              >
                ก่อนหน้า
              </Button>
              <div className="flex items-center gap-1">
                <span className="text-sm">หน้า</span>
                <span className="font-medium">{currentPage}</span>
                <span className="text-sm">จาก</span>
                <span className="font-medium">{totalPages}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => Math.min(totalPages, p+1))} 
                disabled={currentPage === totalPages}
              >
                ถัดไป
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Product Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {editingProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
            </DialogTitle>
            <DialogDescription>
              กรอกข้อมูลสินค้าให้ครบถ้วนเพื่อเพิ่มลงในระบบ
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <Label className="text-base font-medium">รูปภาพสินค้า</Label>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative">
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-muted border-2 border-dashed border-muted-foreground/25">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="w-full h-48 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:border-muted-foreground/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-center">
                      <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm font-medium">คลิกเพื่ออัปโหลดรูปภาพ</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF สูงสุด 5MB</p>
                    </div>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {imagePreview ? 'เปลี่ยนรูปภาพ' : 'เลือกไฟล์'}
                  </Button>
                  {imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4 mr-2" />
                      ลบรูปภาพ
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อสินค้า *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={productForm.name} 
                  onChange={handleFormChange} 
                  placeholder="กรอกชื่อสินค้า"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">หมวดหมู่ *</Label>
                <Select value={productForm.category} onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกหมวดหมู่" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house-paint">สีทาบ้าน</SelectItem>
                    <SelectItem value="car-paint">สีรถยนต์</SelectItem>
                    <SelectItem value="gold-paint">สีทอง</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">ราคา (บาท) *</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  value={productForm.price} 
                  onChange={handleFormChange} 
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stock">จำนวนในสต็อก *</Label>
                <Input 
                  id="stock" 
                  name="stock" 
                  type="number" 
                  value={productForm.stock} 
                  onChange={handleFormChange} 
                  placeholder="0"
                  min="0"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">รายละเอียดสินค้า</Label>
              <textarea
                id="description"
                name="description"
                value={productForm.description}
                onChange={handleFormChange}
                placeholder="อธิบายรายละเอียดของสินค้า..."
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleModalClose}
              >
                ยกเลิก
              </Button>
              <Button 
                type="submit" 
                disabled={isUploading}
                className="gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    กำลังอัปโหลด...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    {editingProduct ? 'บันทึกการเปลี่ยนแปลง' : 'เพิ่มสินค้า'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminProducts;
