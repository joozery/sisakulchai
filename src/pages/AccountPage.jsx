
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, ListOrdered, ShoppingBag, FileText, Gift } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const AccountPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const quickLinks = [
    { to: '/profile', icon: User, title: t('edit_profile'), description: t('edit_profile_desc') },
    { to: '/order-history', icon: ListOrdered, title: t('view_orders'), description: t('view_orders_desc') },
    { to: '/products', icon: ShoppingBag, title: t('start_shopping'), description: t('start_shopping_desc') },
  ];
  
  const recentOrders = []; // Placeholder

  return (
    <>
      <Helmet>
        <title>{t('dashboard')} - SCC สีสกุลไชย จำกัด</title>
        <meta name="description" content={t('account_page_meta_desc')} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900">
                {t('welcome_back')}, <span className="gradient-text">{user?.username || 'User'}</span>!
            </h1>
            <p className="mt-2 text-gray-600">{t('account_dashboard_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.to}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link to={link.to} className="block h-full">
                  <div className="bg-white rounded-xl shadow-md p-6 h-full flex items-start gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <link.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 mb-1">{link.title}</h2>
                        <p className="text-sm text-gray-600">{link.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>

        <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">{t('recent_orders')}</h2>
            </div>
            <div className="p-6">
                {recentOrders.length === 0 ? (
                    <div className="text-center py-8">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-800">{t('no_recent_orders')}</h3>
                        <p className="mt-1 text-sm text-gray-600">{t('no_recent_orders_desc')}</p>
                        <Button asChild size="sm" className="mt-4">
                            <Link to="/products">{t('start_shopping')}</Link>
                        </Button>
                    </div>
                ) : (
                    <div>{/* Recent orders list would go here */}</div>
                )}
            </div>
        </div>

      </motion.div>
    </>
  );
};

export default AccountPage;
