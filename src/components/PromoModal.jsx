import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import promoImage from '/assets/promotio.jpg';

const STORAGE_KEY = 'promo_modal_seen_v1';

const PromoModal = ({ imageUrl = promoImage, ctaHref = '/products', ctaText = 'ช้อปเลย' }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) setOpen(true);
  }, []);

  const onOpenChange = (v) => {
    setOpen(v);
    if (!v) localStorage.setItem(STORAGE_KEY, '1');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-[380px] md:max-w-[440px] overflow-hidden">
        <div className="relative">
          <img src={imageUrl} alt="promotion" className="w-full h-auto block" />
          <div className="absolute bottom-3 right-3">
            <a href={ctaHref}>
              <Button size="sm">{ctaText}</Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoModal;


