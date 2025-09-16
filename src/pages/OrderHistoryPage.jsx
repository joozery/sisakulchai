
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Package, Calendar, DollarSign, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const orders = []; // Placeholder for orders

  const handleViewDetails = () => {
    toast({
      title: t("feature_not_implemented_toast"),
    });
  };

  return (
    <>
      <Helmet>
        <title>{t('order_history')} - SCC สีสกุลไชย จำกัด</title>
        <meta name="description" content={t('order_history_page_meta_desc')} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b">
                <h1 className="text-xl font-bold text-gray-900">{t('order_history')}</h1>
                <p className="mt-1 text-sm text-gray-600">{t('order_history_subtitle')}</p>
            </div>
            <div className="p-6">
            {orders.length === 0 ? (
                <div className="text-center py-16">
                <FileText className="mx-auto h-16 w-16 text-gray-400" />
                <h2 className="mt-4 text-2xl font-bold text-gray-800">{t('no_orders_yet')}</h2>
                <p className="mt-2 text-gray-600">{t('no_orders_yet_desc')}</p>
                <Button asChild className="mt-6">
                    <Link to="/products">{t('start_shopping')}</Link>
                </Button>
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                {/* Map through orders here */}
                </ul>
            )}
            </div>
        </div>
      </motion.div>
    </>
  );
};

export default OrderHistoryPage;
