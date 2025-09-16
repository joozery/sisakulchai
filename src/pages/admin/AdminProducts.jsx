
import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  PlusCircle,
  File,
  MoreHorizontal,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/contexts/ProductContext';
import { useToast } from '@/components/ui/use-toast';

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { toast } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: 'house-paint',
    description: '',
    stock: '',
    image: 'https://images.unsplash.com/photo-1572071886795-f4e2d361cb23?w=500&q=80'
  });

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        stock: product.stock,
        image: product.image
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        price: '',
        category: 'house-paint',
        description: '',
        stock: '',
        image: 'https://images.unsplash.com/photo-1572071886795-f4e2d361cb23?w=500&q=80'
      });
    }
    setIsModalOpen(true);
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...productForm,
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock)
    };
  
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast({ title: "อัปเดตสินค้าสำเร็จ" });
    } else {
      addProduct(productData);
      toast({ title: "เพิ่มสินค้าสำเร็จ" });
    }
    setIsModalOpen(false);
  };
  
  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    toast({ title: "ลบสินค้าสำเร็จ", variant: "destructive" });
  };

  const filteredProducts = useMemo(() => {
    let list = products;
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        String(p.price).includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      list = list.filter(p => (statusFilter === 'in' ? p.stock > 0 : p.stock <= 0));
    }
    return list;
  }, [products, query, statusFilter]);

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

  const bulkDelete = () => {
    if (selectedIds.size === 0) return;
    [...selectedIds].forEach(id => deleteProduct(id));
    setSelectedIds(new Set());
    toast({ title: `ลบ ${selectedIds.size} รายการแล้ว`, variant: 'destructive' });
  };
  
  return (
    <>
      <Helmet>
        <title>จัดการสินค้า - SCC Admin</title>
      </Helmet>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold md:text-2xl">สินค้า</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={() => openModal()}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              เพิ่มสินค้า
            </span>
          </Button>
        </div>
      </div>
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>รายการสินค้า</CardTitle>
          <CardDescription>
            จัดการสินค้าทั้งหมดในร้านของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid gap-3 md:grid-cols-3">
            <div className="md:col-span-1">
              <Input placeholder="ค้นหาชื่อ/หมวดหมู่/ราคา" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">สถานะ:</Label>
              <select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">ทั้งหมด</option>
                <option value="in">มีในสต็อก</option>
                <option value="out">หมดสต็อก</option>
              </select>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <Button variant="outline" size="sm" disabled={selectedIds.size === 0} onClick={bulkDelete}>ลบที่เลือก ({selectedIds.size})</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">
                  <input type="checkbox" className="h-4 w-4" onChange={(e) => toggleSelectAll(e.target.checked)} checked={paginated.length>0 && selectedIds.size === paginated.length} aria-label="Select all" />
                </TableHead>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>ชื่อ</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead className="hidden md:table-cell">ราคา</TableHead>
                <TableHead className="hidden md:table-cell">
                  จำนวนในสต็อก
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4" checked={selectedIds.has(product.id)} onChange={(e) => toggleSelect(product.id, e.target.checked)} aria-label={`Select ${product.name}`} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <img alt={product.name} className="aspect-square rounded-md object-cover" src={product.image || 'https://images.unsplash.com/photo-1646193186132-7976c1670e81'} />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                      {product.stock > 0 ? 'มีในสต็อก' : 'หมด'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    ฿{product.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.stock}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openModal(product)}>แก้ไข</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteProduct(product.id)}>ลบ</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            แสดง <strong>{paginated.length}</strong> จาก <strong>{filteredProducts.length}</strong> รายการ
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>ก่อนหน้า</Button>
            <div className="text-sm">หน้า {currentPage} / {totalPages}</div>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}>ถัดไป</Button>
          </div>
        </CardFooter>
      </Card>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลสินค้าให้ครบถ้วน
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  ชื่อสินค้า
                </Label>
                <Input id="name" name="name" value={productForm.name} onChange={handleFormChange} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  ราคา
                </Label>
                <Input id="price" name="price" type="number" value={productForm.price} onChange={handleFormChange} className="col-span-3" required />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  สต็อก
                </Label>
                <Input id="stock" name="stock" type="number" value={productForm.stock} onChange={handleFormChange} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">หมวดหมู่</Label>
                <select id="category" name="category" value={productForm.category} onChange={handleFormChange} className="col-span-3 h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="house-paint">สีทาบ้าน</option>
                  <option value="car-paint">สีรถยนต์</option>
                  <option value="gold-paint">สีทอง</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  รายละเอียด
                </Label>
                <Input id="description" name="description" value={productForm.description} onChange={handleFormChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">รูปภาพ (URL)</Label>
                <Input id="image" name="image" value={productForm.image} onChange={handleFormChange} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editingProduct ? 'บันทึก' : 'เพิ่มสินค้า'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminProducts;
