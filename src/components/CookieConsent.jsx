import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'cookie_consent_v1';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ necessary: true, analytics: true, marketing: true }));
    setVisible(false);
  };

  const settings = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ necessary: true, analytics: false, marketing: false }));
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto max-w-screen-lg rounded-xl border bg-white/95 backdrop-blur p-4 shadow-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground md:max-w-[70%]">
            เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพการใช้งานและการวัดผล ดูรายละเอียดได้ที่{' '}
            <Link to="/cookie-policy" className="text-primary underline">นโยบายการใช้คุกกี้</Link>
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={settings}>การตั้งค่าคุกกี้</Button>
            <Button size="sm" onClick={acceptAll}>ยอมรับทั้งหมด</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;


