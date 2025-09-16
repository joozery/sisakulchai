import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AdminHeroSlides = () => {
  const { toast } = useToast();
  const [slides, setSlides] = useState([]);
  const [form, setForm] = useState({ title: '', subtitle: '', image: '' });

  const addSlide = (e) => {
    e.preventDefault();
    const newSlide = { id: Date.now(), ...form };
    setSlides((prev) => [newSlide, ...prev]);
    setForm({ title: '', subtitle: '', image: '' });
    toast({ title: 'เพิ่มสไลด์สำเร็จ' });
  };

  const deleteSlide = (id) => {
    setSlides((prev) => prev.filter((s) => s.id !== id));
    toast({ title: 'ลบสไลด์แล้ว', variant: 'destructive' });
  };

  return (
    <>
      <Helmet>
        <title>จัดการสไลด์หน้าแรก - SCC Admin</title>
      </Helmet>
      <h1 className="text-lg font-semibold md:text-2xl">สไลด์หน้าแรก</h1>
      <Card className="mt-2">
        <CardHeader>
          <CardTitle>รายการสไลด์</CardTitle>
          <CardDescription>เพิ่ม/เรียง/ลบ สไลด์สำหรับ Hero</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addSlide} className="grid gap-3 md:grid-cols-3">
            <div>
              <Label htmlFor="title">หัวเรื่อง</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="subtitle">คำโปรย</Label>
              <Input id="subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="image">รูปภาพ (URL)</Label>
              <Input id="image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
            </div>
            <div className="md:col-span-3">
              <Button type="submit" className="gap-2"><PlusCircle className="h-4 w-4" /> เพิ่มสไลด์</Button>
            </div>
          </form>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {slides.map((s) => (
              <div key={s.id} className="overflow-hidden rounded-xl border">
                {s.image && <img src={s.image} alt={s.title} className="h-40 w-full object-cover" />}
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{s.title}</div>
                    {s.subtitle && <div className="text-xs text-muted-foreground">{s.subtitle}</div>}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteSlide(s.id)}>
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

export default AdminHeroSlides;


