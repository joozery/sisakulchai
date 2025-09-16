import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const STORAGE_KEY = 'scc_admin_payment_settings';

const banks = [
  { code: 'SCB', name: 'ไทยพาณิชย์ (SCB)', color: '#4E2E7F', initials: 'SCB' },
  { code: 'KBANK', name: 'กสิกรไทย (KBank)', color: '#138F2D', initials: 'KB' },
  { code: 'BBL', name: 'กรุงเทพ (BBL)', color: '#1E4598', initials: 'BBL' },
  { code: 'KTB', name: 'กรุงไทย (KTB)', color: '#1BA5E1', initials: 'KTB' },
  { code: 'BAY', name: 'กรุงศรีอยุธยา (BAY)', color: '#fec10d', initials: 'BAY' },
  { code: 'GSB', name: 'ออมสิน (GSB)', color: '#E61E6E', initials: 'GSB' },
  { code: 'TTB', name: 'ทีทีบี (TTB)', color: '#2F318B', initials: 'TTB' },
  { code: 'UOB', name: 'UOB', color: '#0F2973', initials: 'UOB' },
  { code: 'CIMB', name: 'CIMB Thai', color: '#8B0000', initials: 'CIMB' },
  { code: 'BAAC', name: 'ธ.ก.ส. (BAAC)', color: '#0F8F61', initials: 'BAAC' },
];

const defaultSettings = {
  bankName: '',
  bankAccountName: '',
  bankAccountNumber: '',
  promptpayType: 'phone', // phone | id
  promptpayValue: '', // phone number or national id
};

const AdminPayment = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...defaultSettings, ...JSON.parse(raw) });
    } catch {}
  }, []);

  const onChange = (e) => setSettings((s) => ({ ...s, [e.target.name]: e.target.value }));

  const save = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    toast({ title: 'บันทึกการตั้งค่าชำระเงินแล้ว' });
  };

  return (
    <>
      <Helmet>
        <title>ตั้งค่า Payment Gateway - SCC Admin</title>
      </Helmet>
      <h1 className="text-lg font-semibold md:text-2xl">ตั้งค่าชำระเงิน</h1>
      <Card className="admin-card mt-2 max-w-2xl">
        <CardHeader>
          <CardTitle>บัญชีธนาคาร</CardTitle>
          <CardDescription>กำหนดข้อมูลบัญชีสำหรับโอนเงิน</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={save} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="bankName">ธนาคาร</Label>
              <div className="flex items-center gap-3">
                <select id="bankName" name="bankName" value={settings.bankName} onChange={onChange} className="h-10 rounded-md border border-input bg-background px-3 text-sm w-full">
                  <option value="">-- เลือกธนาคาร --</option>
                  {banks.map(b => (
                    <option key={b.code} value={b.name}>{b.name}</option>
                  ))}
                </select>
                {settings.bankName && (
                  (() => {
                    const bank = banks.find(b => b.name === settings.bankName);
                    if (!bank) return null;
                    return (
                      <div title={bank.name} className="flex items-center gap-2">
                        <div style={{ backgroundColor: bank.color }} className="h-8 w-8 rounded-full grid place-items-center text-white text-[10px] font-bold">
                          {bank.initials}
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bankAccountName">ชื่อบัญชี</Label>
              <Input id="bankAccountName" name="bankAccountName" value={settings.bankAccountName} onChange={onChange} placeholder="ชื่อ-นามสกุล" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bankAccountNumber">เลขที่บัญชี</Label>
              <Input id="bankAccountNumber" name="bankAccountNumber" value={settings.bankAccountNumber} onChange={onChange} placeholder="เลขที่บัญชี" />
            </div>

            <div className="grid gap-2 mt-4">
              <Label>PromptPay</Label>
              <div className="flex items-center gap-2">
                <select name="promptpayType" value={settings.promptpayType} onChange={onChange} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="phone">เบอร์โทรศัพท์</option>
                  <option value="id">เลขบัตรประชาชน</option>
                </select>
                <Input name="promptpayValue" value={settings.promptpayValue} onChange={onChange} placeholder={settings.promptpayType === 'phone' ? 'เช่น 0812345678' : 'เลขบัตรประชาชน 13 หลัก'} />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit">บันทึกการตั้งค่า</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminPayment;


