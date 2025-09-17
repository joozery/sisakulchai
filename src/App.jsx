
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import CookieConsent from '@/components/CookieConsent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import ContactPage from '@/pages/ContactPage';
import CookiePolicy from '@/pages/CookiePolicy';
import AccountPage from '@/pages/AccountPage';
import ProfilePage from '@/pages/ProfilePage';
import OrderHistoryPage from '@/pages/OrderHistoryPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import { CartProvider } from '@/contexts/CartContext';
import { ProductProvider } from '@/contexts/ProductContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { AuthProvider } from '@/contexts/AuthContext';
import UserPortalLayout from '@/layouts/UserPortalLayout';

import AdminLayout from '@/layouts/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminBanners from '@/pages/admin/AdminBanners';
import AdminHeroSlides from '@/pages/admin/AdminHeroSlides';
import AdminPromotions from '@/pages/admin/AdminPromotions';
import AdminBlog from '@/pages/admin/AdminBlog';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminCustomers from '@/pages/admin/AdminCustomers';
import AdminProfile from '@/pages/admin/AdminProfile';
import AdminReviews from '@/pages/admin/AdminReviews';
import AdminPayment from '@/pages/admin/AdminPayment';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';

const AppContent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          <Route element={<ProtectedRoute><UserPortalLayout /></ProtectedRoute>}>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <AdminProvider>
              <Router>
                <Helmet>
                  <title>สีทาบ้านคุณภาพ - ร้านสีออนไลน์ชั้นนำ</title>
                  <meta name="description" content="ร้านขายสีทาบ้านออนไลน์ คุณภาพสูง ราคาดี มีสีให้เลือกหลากหลาย พร้อมบริการจัดส่งทั่วประเทศ สั่งซื้อง่าย ปลอดภัย" />
                  <meta name="keywords" content="สีทาบ้าน, สีรถยนต์, สีทอง, ร้านสี, สีออนไลน์, ทาบ้าน, สีคุณภาพ" />
                  <meta property="og:title" content="สีทาบ้านคุณภาพ - ร้านสีออนไลน์ชั้นนำ" />
                  <meta property="og:description" content="ร้านขายสีทาบ้านออนไลน์ คุณภาพสูง ราคาดี มีสีให้เลือกหลากหลาย พร้อมบริการจัดส่งทั่วประเทศ" />
                  <meta property="og:type" content="website" />
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap" rel="stylesheet" />
                </Helmet>
                
                <Routes>
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/admin/*" element={
                    <AdminProtectedRoute>
                      <AdminLayout>
                        <Routes>
                          <Route path="/" element={<AdminDashboard />} />
                          <Route path="/products" element={<AdminProducts />} />
                          <Route path="/orders" element={<AdminOrders />} />
                          <Route path="/banners" element={<AdminBanners />} />
                          <Route path="/hero-slides" element={<AdminHeroSlides />} />
                          <Route path="/promotions" element={<AdminPromotions />} />
                          <Route path="/blog" element={<AdminBlog />} />
                          <Route path="/profile" element={<AdminProfile />} />
                          <Route path="/users" element={<AdminUsers />} />
                          <Route path="/customers" element={<AdminCustomers />} />
                          <Route path="/reviews" element={<AdminReviews />} />
                          <Route path="/payment" element={<AdminPayment />} />
                        </Routes>
                      </AdminLayout>
                    </AdminProtectedRoute>
                  } />
                  <Route path="/*" element={<AppContent />} />
                </Routes>
                
                <Toaster />
              </Router>
            </AdminProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
