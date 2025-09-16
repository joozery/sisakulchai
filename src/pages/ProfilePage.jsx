
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfilePage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast({
      title: t("feature_not_implemented_toast"),
    });
  };
  
  const handleChangePassword = (e) => {
    e.preventDefault();
    toast({
      title: t("feature_not_implemented_toast"),
    });
  };

  return (
    <>
      <Helmet>
        <title>{t('profile')} - SCC สีสกุลไชย จำกัด</title>
        <meta name="description" content={t('profile_page_meta_desc')} />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="bg-white rounded-xl shadow-md">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">{t('profile_settings')}</h1>
            <p className="mt-1 text-sm text-gray-600">{t('profile_settings_subtitle')}</p>
          </div>
          <form onSubmit={handleUpdateProfile} className="p-6 space-y-6">
            <div className="space-y-2">
                <Label htmlFor="username">{t('username')}</Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input id="username" defaultValue={user?.username} className="pl-10" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">{t('email_address')}</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input id="email" type="email" defaultValue={user?.email} className="pl-10 bg-gray-100" disabled />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">{t('phone_number')}</Label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input id="phone" placeholder="081-234-5678" className="pl-10" />
                </div>
            </div>
            <div className="flex justify-end pt-2">
                <Button type="submit">{t('update_profile')}</Button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">{t('change_password')}</h2>
             <p className="mt-1 text-sm text-gray-600">{t('change_password_desc')}</p>
          </div>
          <form onSubmit={handleChangePassword} className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-password">{t('current_password')}</Label>
              <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input id="current-password" type="password" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">{t('new_password')}</Label>
               <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input id="new-password" type="password" className="pl-10" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="secondary">{t('update_password')}</Button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default ProfilePage;
