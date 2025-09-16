
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, Phone, Mail, MapPin, Facebook, MessageCircle, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast({
      title: t("feature_not_implemented_toast")
    });
  };

  const handleSocialClick = () => {
    toast({
      title: t("feature_not_implemented_toast")
    });
  };

  return (
    <footer className="bg-white text-gray-700 py-12">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://res.cloudinary.com/dvwcxskzi/image/upload/fl_preserve_transparency/v1757761474/542498598_1425856761842661_315301680058860045_n_no7dzm.jpg?_s=public-apps"
                alt="SCC สีสกุลไชย จำกัด Logo"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-black">SCC สีสกุลไชย จำกัด</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              {t('footer_company_description')}
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.1, color: '#3b82f6' }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSocialClick}
                className="text-gray-500 hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, color: '#22c55e' }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSocialClick}
                className="text-gray-500 hover:text-green-500 transition-colors"
                aria-label="Line"
              >
                <MessageCircle className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, color: '#ec4899' }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSocialClick}
                className="text-gray-500 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, color: '#38bdf8' }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSocialClick}
                className="text-gray-500 hover:text-sky-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-gray-900">{t('quick_links')}</span>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {t('home')}
              </Link>
              <Link to="/products" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {t('all_products')}
              </Link>
              <Link to="/products/house-paint" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {t('house_paint')}
              </Link>
              <Link to="/products/car-paint" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {t('car_paint')}
              </Link>
              <Link to="/contact" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {t('contact_us')}
              </Link>
              <Link to="/admin" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {t('manage_store')}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-gray-900">{t('contact_us')}</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">02-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">@paintstore</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-600">info@paintstore.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span className="text-sm text-gray-600">
                  123 {t('address_street')}<br />
                  {t('address_city_zip')}
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-gray-900">{t('newsletter_signup')}</span>
            <p className="text-sm text-gray-600">
              {t('newsletter_description')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder={t('your_email_placeholder')}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                {t('subscribe')}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © 2024 SCC สีสกุลไชย จำกัด. {t('all_rights_reserved')}
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6">
              <button onClick={handleSocialClick} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                {t('privacy_policy')}
              </button>
              <button onClick={handleSocialClick} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                {t('terms_of_service')}
              </button>
              <button onClick={handleSocialClick} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                {t('return_policy')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
