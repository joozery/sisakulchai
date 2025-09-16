import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AdminBlog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', slug: '', description: '' });

  const addPost = (e) => {
    e.preventDefault();
    const slug = form.slug || form.title.trim().toLowerCase().replace(/\s+/g, '-');
    const newPost = { id: Date.now(), ...form, slug };
    setPosts((prev) => [newPost, ...prev]);
    setForm({ title: '', slug: '', description: '' });
    toast({ title: 'สร้างโพสต์แล้ว', description: 'เหมาะสำหรับ SEO' });
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: 'ลบโพสต์แล้ว', variant: 'destructive' });
  };

  return (
    <>
      <Helmet>
        <title>จัดการบล็อก/SEO - SCC Admin</title>
      </Helmet>
      <h1 className="text-lg font-semibold md:text-2xl">บล็อก / SEO</h1>
      <Card className="mt-2">
        <CardHeader>
          <CardTitle>โพสต์บล็อก</CardTitle>
          <CardDescription>เขียนเนื้อหาเพื่อ SEO และอัปเดตข่าวสาร</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addPost} className="grid gap-3 md:grid-cols-3">
            <div>
              <Label htmlFor="title">หัวข้อ</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="slug">Slug (อัตโนมัติถ้าเว้นว่าง)</Label>
              <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="description">คำอธิบายสั้น</Label>
              <Input id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="md:col-span-3">
              <Button type="submit" className="gap-2"><PlusCircle className="h-4 w-4" /> สร้างโพสต์</Button>
            </div>
          </form>

          <div className="mt-6 grid gap-4">
            {posts.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-muted-foreground">/{p.slug}</div>
                  {p.description && <div className="text-sm">{p.description}</div>}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="gap-1"><Pencil className="h-3.5 w-3.5" /> แก้ไข</Button>
                  <Button size="sm" variant="ghost" onClick={() => deletePost(p.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminBlog;


