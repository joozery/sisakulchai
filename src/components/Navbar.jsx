
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, User, ChevronDown, LogOut, Home, ListOrdered } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import CategorySlider from '@/components/CategorySlider';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: 'th', name: 'ไทย', flag: 'https://flagcdn.com/w20/th.png' },
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/us.png' }
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user, logout, isAuthModalOpen, setAuthModalOpen } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const TopBarLink = ({ href, children, translationKey }) => (
    <a href={href} onClick={(e) => { e.preventDefault(); toast({ title: t("feature_not_implemented_toast") }); }} className="text-xs text-gray-500 hover:text-blue-600 transition-colors">{t(translationKey)}</a>
  );

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="bg-gray-50/50 border-b border-gray-200">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end items-center h-8 space-x-6">
              <TopBarLink href="#" translationKey="download_app" />
              <TopBarLink href="#" translationKey="articles" />
              <TopBarLink href="#" translationKey="about_us" />
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="https://res.cloudinary.com/dvwcxskzi/image/upload/fl_preserve_transparency/v1757761474/542498598_1425856761842661_315301680058860045_n_no7dzm.jpg?_s=public-apps"
                  alt="SCC สีสกุลไชย จำกัด Logo"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span className="text-2xl font-bold text-black">SCC สีสกุลไชย จำกัด</span>
              </Link>
            </div>

            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </form>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{user.username}</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>{t('my_account')}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => navigate('/account')}>
                        <Home className="mr-2 h-4 w-4" />
                        <span>{t('my_account')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => navigate('/profile')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>{t('profile')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => navigate('/order-history')}>
                        <ListOrdered className="mr-2 h-4 w-4" />
                        <span>{t('order_history')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={logout} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{t('logout')}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="outline" onClick={() => setAuthModalOpen(true)} className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{t('login')}</span>
                  </Button>
                )}
              </div>
              
              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <motion.span
                    key={cartItemsCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 cart-badge text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-2 hidden sm:flex items-center space-x-1">
                    <img className="w-6 h-6 rounded-full object-cover" alt={currentLanguage.name} src={currentLanguage.flag} />
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {languages.map((lang) => (
                    <DropdownMenuItem key={lang.code} onSelect={() => changeLanguage(lang.code)} className="flex items-center gap-2">
                      <img src={lang.flag} alt={lang.name} className="w-5 h-5 rounded-full object-cover" />
                      <span>{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <CategorySlider />

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mobile-menu border-t"
            >
              <div className="px-4 pt-4 pb-3 space-y-1">
                <div className="mb-4">
                  {isAuthenticated ? (
                     <div className="flex flex-col space-y-2">
                        <p className="text-center font-medium">สวัสดี, {user.username}</p>
                        <Button onClick={() => { navigate('/account'); setIsMenuOpen(false); }}>{t('my_account')}</Button>
                        <Button variant="destructive" className="w-full" onClick={() => { logout(); setIsMenuOpen(false); }}>{t('logout')}</Button>
                     </div>
                  ) : (
                    <Button className="w-full flex items-center justify-center space-x-2" onClick={() => { setAuthModalOpen(true); setIsMenuOpen(false); }}>
                      <User className="w-4 h-4" />
                      <span>{t('login')} / สมัครสมาชิก</span>
                    </Button>
                  )}
                </div>
                
                <div className="px-4 py-4">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder="ค้นหาสินค้า..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <AuthModal />
    </>
  );
};

export default Navbar;
