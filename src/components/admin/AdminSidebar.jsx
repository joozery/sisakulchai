import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSidebar } from '@/layouts/AdminLayout';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  PaintBucket, 
  Image as ImageIcon, 
  Layers, 
  FileText, 
  MessageSquare, 
  Phone, 
  Mail, 
  MessageCircle, 
  CreditCard, 
  Megaphone, 
  User,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Search,
  BarChart3,
  Shield,
  Palette,
  Star,
  Globe
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navigationGroups = [
  {
    title: 'หลัก',
    items: [
      { to: '/admin', label: 'แดชบอร์ด', icon: Home, badge: null },
    ]
  },
  {
    title: 'การจัดการ',
    items: [
      { to: '/admin/products', label: 'สินค้า', icon: Package, badge: null },
      { to: '/admin/orders', label: 'คำสั่งซื้อ', icon: ShoppingCart, badge: '3' },
      { to: '/admin/customers', label: 'ลูกค้า', icon: Users, badge: null },
      { to: '/admin/users', label: 'ผู้ใช้', icon: Shield, badge: null },
    ]
  },
  {
    title: 'เนื้อหา',
    items: [
      { to: '/admin/banners', label: 'แบนเนอร์', icon: ImageIcon, badge: null },
      { to: '/admin/hero-slides', label: 'สไลด์หน้าแรก', icon: Layers, badge: null },
      { to: '/admin/promotions', label: 'โปรโมชั่น', icon: Megaphone, badge: 'New' },
      { to: '/admin/blog', label: 'บล็อก / SEO', icon: FileText, badge: null },
      { to: '/admin/reviews', label: 'รีวิว', icon: Star, badge: '5' },
    ]
  },
  {
    title: 'การตั้งค่า',
    items: [
      { to: '/admin/payment', label: 'ชำระเงิน', icon: CreditCard, badge: null },
      { to: '/admin/profile', label: 'โปรไฟล์', icon: User, badge: null },
    ]
  }
];

const AdminSidebar = () => {
  const { isSidebarCollapsed: isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside className={`hidden md:flex flex-col h-screen bg-gradient-to-b from-background to-muted/20 border-r border-border/50 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        {!isCollapsed && (
          <NavLink to="/admin" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/assets/logo.png"
                alt="SCC Admin"
                className="h-8 w-8 object-contain rounded-lg bg-primary/10 p-1"
                onError={(e) => { 
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <PaintBucket className="h-8 w-8 text-primary p-1 rounded-lg bg-primary/10 hidden" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">SCC Admin</span>
              <span className="text-xs text-muted-foreground">ระบบจัดการร้านค้า</span>
            </div>
          </NavLink>
        )}
        {isCollapsed && (
          <NavLink to="/admin" className="flex items-center justify-center w-full group">
            <div className="relative">
              <img
                src="/assets/logo.png"
                alt="SCC Admin"
                className="h-8 w-8 object-contain rounded-lg bg-primary/10 p-1"
                onError={(e) => { 
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <PaintBucket className="h-8 w-8 text-primary p-1 rounded-lg bg-primary/10 hidden" />
            </div>
          </NavLink>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="h-8 w-8 p-0 hover:bg-primary/10"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="p-4 border-b border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="ค้นหาเมนู..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <div className="px-3 space-y-6">
          {navigationGroups.map((group, groupIndex) => (
            <div key={group.title}>
              {!isCollapsed && (
                <div className="px-3 mb-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {group.title}
                  </h3>
                </div>
              )}
              <nav className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.to === '/admin'}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 relative ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`
                    }
                    title={isCollapsed ? item.label : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon className={`h-4 w-4 shrink-0 ${isCollapsed ? 'mx-auto' : ''}`} />
                        {!isCollapsed && (
                          <>
                            <span className="truncate flex-1">{item.label}</span>
                            {item.badge && (
                              <Badge 
                                variant={item.badge === 'New' ? 'default' : 'secondary'} 
                                className="text-xs px-1.5 py-0.5 h-5"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
              {groupIndex < navigationGroups.length - 1 && !isCollapsed && (
                <div className="my-4 h-px bg-border/50" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="border-t border-border/50 p-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">ผู้ดูแลระบบ</p>
              <p className="text-xs text-muted-foreground truncate">admin@scc.com</p>
            </div>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-border/50 p-4">
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>เวอร์ชัน</span>
              <Badge variant="outline" className="text-xs">v1.0.0</Badge>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs">
                  <HelpCircle className="h-3 w-3" />
                  ต้องการความช่วยเหลือ?
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[440px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    ติดต่อทีมสนับสนุน
                  </DialogTitle>
                  <DialogDescription>
                    เลือกช่องทางที่สะดวกเพื่อพูดคุยกับทีมเรา
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                  <a href="tel:+6600000000" className="w-full">
                    <Button className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      โทรหาเรา
                    </Button>
                  </a>
                  <a href="mailto:info@wooyou-creative.com" className="w-full">
                    <Button variant="outline" className="w-full gap-2">
                      <Mail className="h-4 w-4" />
                      ส่งอีเมล
                    </Button>
                  </a>
                  <a href="https://line.me/R/ti/p/@yourlineid" target="_blank" rel="noreferrer" className="w-full">
                    <Button variant="outline" className="w-full gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Add Line
                    </Button>
                  </a>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-3 w-3" />
              ออกจากระบบ
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="ความช่วยเหลือ">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" title="ออกจากระบบ">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;


