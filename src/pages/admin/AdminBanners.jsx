import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { PlusCircle, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AdminBanners = () => {
  const { toast } = useToast();
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({ title: '', image: '', link: '' });

  const addBanner = (e) => {
    e.preventDefault();
    const newBanner = { id: Date.now(), ...form };
    setBanners((prev) => [newBanner, ...prev]);
    setForm({ title: '', image: '', link: '' });
    toast({ title: 'เพิ่มแบนเนอร์สำเร็จ' });
  };

  const deleteBanner = (id) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    toast({ title: 'ลบแบนเนอร์แล้ว', variant: 'destructive' });
  };

  return (
    <>
      <Helmet>
        <title>จัดการแบนเนอร์ - SCC Admin</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">แบนเนอร์</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>รายการแบนเนอร์</CardTitle>
          <CardDescription>เพิ่ม/แก้ไข/ลบ แบนเนอร์ในหน้าเว็บ</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addBanner} className="grid gap-3 md:grid-cols-3">
            <div>
              <Label htmlFor="title">ชื่อ</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="image">รูปภาพ (URL)</Label>
              <Input id="image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="link">ลิงก์</Label>
              <Input id="link" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
            </div>
            <div className="md:col-span-3">
              <Button type="submit" className="gap-2"><PlusCircle className="h-4 w-4" /> เพิ่มแบนเนอร์</Button>
            </div>
          </form>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {banners.map((b) => (
              <div key={b.id} className="group relative overflow-hidden rounded-xl border bg-card">
                {b.image ? (
                  <img src={b.image} alt={b.title} className="h-40 w-full object-cover" />
                ) : (
                  <div className="h-40 w-full grid place-items-center text-muted-foreground">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                )}
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{b.title}</div>
                    {b.link && <a href={b.link} className="text-xs text-primary hover:underline">{b.link}</a>}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteBanner(b.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminBanners;


