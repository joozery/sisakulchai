import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Package, ShoppingCart, Users, PaintBucket, Image as ImageIcon, Layers, FileText, MessageSquare, Phone, Mail, MessageCircle, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/admin', label: 'แดชบอร์ด', icon: Home },
  { to: '/admin/products', label: 'จัดการสินค้า', icon: Package },
  { to: '/admin/orders', label: 'จัดการคำสั่งซื้อ', icon: ShoppingCart },
  { to: '/admin/customers', label: 'ลูกค้า', icon: Users },
  { to: '/admin/users', label: 'ผู้ใช้', icon: Users },
  { to: '/admin/banners', label: 'แบนเนอร์', icon: ImageIcon },
  { to: '/admin/hero-slides', label: 'สไลด์หน้าแรก', icon: Layers },
  { to: '/admin/blog', label: 'บล็อก / SEO', icon: FileText },
  { to: '/admin/reviews', label: 'รีวิว', icon: MessageSquare },
  { to: '/admin/payment', label: 'ชำระเงิน', icon: CreditCard },
];

const AdminSidebar = () => {
  return (
    <aside className="hidden md:block border-r bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/70 h-screen">
      <div className="flex h-full min-h-0 flex-col">
        <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background/70 px-4 lg:h-[60px] lg:px-6 backdrop-blur">
          <NavLink to="/admin" className="flex items-center gap-2 font-semibold">
            <img
              src="/assets/logo.png"
              alt="SCC Admin"
              className="h-6 w-6 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <PaintBucket className="h-6 w-6 text-primary hidden" />
            <span>SCC Admin</span>
          </NavLink>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-4 pt-4 pb-2 admin-section-title">เมนูหลัก</div>
          <nav className="admin-accent-scroll px-2 pb-4 text-sm font-medium lg:px-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t p-4 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>เวอร์ชัน</span>
            <span className="font-medium text-foreground">1.0.0</span>
          </div>
          <div className="mt-2">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-primary hover:underline">ต้องการความช่วยเหลือ?</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[440px]">
                <DialogHeader>
                  <DialogTitle>ติดต่อบริษัท วูยู ครีเอทีฟ</DialogTitle>
                  <DialogDescription>เลือกช่องทางที่สะดวกเพื่อพูดคุยกับทีมเรา</DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                  <a href="tel:+6600000000" className="w-full">
                    <Button className="w-full gap-2"><Phone className="h-4 w-4" /> โทรหาเรา</Button>
                  </a>
                  <a href="mailto:info@wooyou-creative.com" className="w-full">
                    <Button variant="outline" className="w-full gap-2"><Mail className="h-4 w-4" /> ส่งอีเมล</Button>
                  </a>
                  <a href="https://line.me/R/ti/p/@yourlineid" target="_blank" rel="noreferrer" className="w-full">
                    <Button variant="outline" className="w-full gap-2"><MessageCircle className="h-4 w-4" /> Add Line</Button>
                  </a>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;


