import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Search, MoreHorizontal, Shield, Trash2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@scc.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Somchai', email: 'somchai@example.com', role: 'customer', status: 'active' },
  { id: 3, name: 'Suda', email: 'suda@example.com', role: 'customer', status: 'banned' },
];

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  }, [users, query]);

  const toggleRole = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: u.role === 'admin' ? 'customer' : 'admin' } : u));
    toast({ title: 'อัปเดตสิทธิ์ผู้ใช้แล้ว' });
  };

  const toggleBan = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u));
    toast({ title: 'อัปเดตสถานะผู้ใช้แล้ว' });
  };

  const addDummyUser = () => {
    const id = Date.now();
    setUsers(prev => [{ id, name: `User ${id}`, email: `user${id}@example.com`, role: 'customer', status: 'active' }, ...prev]);
    toast({ title: 'เพิ่มผู้ใช้ชั่วคราวแล้ว' });
  };

  return (
    <>
      <Helmet>
        <title>จัดการผู้ใช้ - SCC Admin</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">ผู้ใช้</h1>
        <Button size="sm" className="h-8 gap-1" onClick={addDummyUser}>
          <UserPlus className="h-3.5 w-3.5" /> เพิ่มผู้ใช้
        </Button>
      </div>
      <Card className="mt-2">
        <CardHeader>
          <CardTitle>รายการผู้ใช้</CardTitle>
          <CardDescription>ค้นหา เปลี่ยนสิทธิ์ และแบน/ปลดแบน ผู้ใช้</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="ค้นหาชื่อ อีเมล หรือสิทธิ์" className="pl-8" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ชื่อ</TableHead>
                <TableHead>อีเมล</TableHead>
                <TableHead>สิทธิ์</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(u => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>{u.status}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => toggleRole(u.id)}>
                        <Shield className="h-3.5 w-3.5" /> สลับสิทธิ์
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8" onClick={() => toggleBan(u.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default AdminUsers;


