import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const seed = [
  { id: 1, product: 'สีกันสนิม สีเทา', author: 'Somchai', rating: 5, content: 'ของดี คุณภาพเยี่ยม', status: 'pending' },
  { id: 2, product: 'สีทอง 24K', author: 'Suda', rating: 4, content: 'สวยงาม คุ้มราคา', status: 'approved' },
  { id: 3, product: 'สีบ้านภายใน สีครีม', author: 'Anan', rating: 2, content: 'กลิ่นแรงไปหน่อย', status: 'rejected' },
];

const Rating = ({ value }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < value ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
    ))}
  </div>
);

const AdminReviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState(seed);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    let list = reviews;
    if (filter !== 'all') list = list.filter(r => r.status === filter);
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter(r => r.product.toLowerCase().includes(s) || r.author.toLowerCase().includes(s) || r.content.toLowerCase().includes(s));
    }
    return list;
  }, [reviews, q, filter]);

  const setStatus = (id, status) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast({ title: status === 'approved' ? 'อนุมัติรีวิวแล้ว' : 'ปฏิเสธรีวิวแล้ว' });
  };

  return (
    <>
      <Helmet>
        <title>จัดการรีวิว - SCC Admin</title>
      </Helmet>
      <h1 className="text-lg font-semibold md:text-2xl">รีวิวสินค้า</h1>
      <Card className="admin-card mt-2">
        <CardHeader>
          <CardTitle>รายการรีวิว</CardTitle>
          <CardDescription>ตรวจสอบ อนุมัติ หรือปฏิเสธ รีวิวจากลูกค้า</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid gap-3 md:grid-cols-3">
            <Input placeholder="ค้นหาชื่อสินค้า/ผู้เขียน/ข้อความ" value={q} onChange={(e) => setQ(e.target.value)} />
            <div className="flex items-center gap-2">
              <Label className="text-sm">สถานะ:</Label>
              <select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">ทั้งหมด</option>
                <option value="pending">รอตรวจ</option>
                <option value="approved">อนุมัติ</option>
                <option value="rejected">ปฏิเสธ</option>
              </select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>สินค้า</TableHead>
                <TableHead>ผู้รีวิว</TableHead>
                <TableHead>คะแนน</TableHead>
                <TableHead>ข้อความ</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.product}</TableCell>
                  <TableCell>{r.author}</TableCell>
                  <TableCell><Rating value={r.rating} /></TableCell>
                  <TableCell className="max-w-[360px] truncate" title={r.content}>{r.content}</TableCell>
                  <TableCell>{r.status}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => setStatus(r.id, 'approved')}><ThumbsUp className="h-4 w-4 mr-1" /> อนุมัติ</Button>
                      <Button size="sm" variant="ghost" onClick={() => setStatus(r.id, 'rejected')}><ThumbsDown className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminReviews;


