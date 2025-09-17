import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, Building2, CheckCircle, AlertCircle, Copy, Eye, EyeOff } from 'lucide-react';

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
  // Bank Transfer Settings
  bankName: '',
  bankAccountName: '',
  bankAccountNumber: '',
  bankBranch: '',
  
  // PromptPay Settings
  promptpayType: 'phone', // phone | id
  promptpayValue: '', // phone number or national id
  promptpayEnabled: true,
  
  // Credit Card Settings
  creditCardEnabled: false,
  creditCardProvider: '', // stripe | paypal | omise
  
  // General Settings
  paymentInstructions: '',
  autoConfirmPayment: false,
  paymentTimeout: 24, // hours
};

const AdminPayment = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState(defaultSettings);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [activeTab, setActiveTab] = useState('bank');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...defaultSettings, ...JSON.parse(raw) });
    } catch {}
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((s) => ({ 
      ...s, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const onSelectChange = (name, value) => {
    setSettings((s) => ({ ...s, [name]: value }));
  };

  const save = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    toast({ 
      title: 'บันทึกการตั้งค่าชำระเงินแล้ว',
      description: 'การตั้งค่าถูกบันทึกเรียบร้อยแล้ว'
    });
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `คัดลอก${label}แล้ว`,
      description: `${label}ถูกคัดลอกไปยังคลิปบอร์ด`
    });
  };

  const formatAccountNumber = (number) => {
    if (!number) return '';
    return number.replace(/(\d{4})(?=\d)/g, '$1-');
  };

  const getBankInfo = () => {
    return banks.find(b => b.name === settings.bankName);
  };

  const isFormValid = () => {
    if (activeTab === 'bank') {
      return settings.bankName && settings.bankAccountName && settings.bankAccountNumber;
    }
    if (activeTab === 'promptpay') {
      return settings.promptpayValue;
    }
    return true;
  };

  return (
    <>
      <Helmet>
        <title>ตั้งค่าชำระเงิน - SCC Admin</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ตั้งค่าชำระเงิน</h1>
            <p className="text-muted-foreground">จัดการวิธีการชำระเงินและข้อมูลบัญชีธนาคาร</p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            ระบบชำระเงิน
          </Badge>
        </div>

        {/* Payment Methods Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bank" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              โอนเงินผ่านธนาคาร
            </TabsTrigger>
            <TabsTrigger value="promptpay" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              PromptPay
            </TabsTrigger>
            <TabsTrigger value="credit" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              บัตรเครดิต
            </TabsTrigger>
          </TabsList>

          {/* Bank Transfer Tab */}
          <TabsContent value="bank" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Bank Settings Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    ข้อมูลบัญชีธนาคาร
                  </CardTitle>
                  <CardDescription>
                    กำหนดข้อมูลบัญชีสำหรับรับการโอนเงิน
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">ธนาคาร</Label>
                    <Select value={settings.bankName} onValueChange={(value) => onSelectChange('bankName', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกธนาคาร" />
                      </SelectTrigger>
                      <SelectContent>
                        {banks.map(bank => (
                          <SelectItem key={bank.code} value={bank.name}>
                            <div className="flex items-center gap-3">
                              <div 
                                style={{ backgroundColor: bank.color }} 
                                className="h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                              >
                                {bank.initials}
                              </div>
                              {bank.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankAccountName">ชื่อบัญชี</Label>
                    <Input 
                      id="bankAccountName" 
                      name="bankAccountName" 
                      value={settings.bankAccountName} 
                      onChange={onChange} 
                      placeholder="ชื่อ-นามสกุล" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankAccountNumber">เลขที่บัญชี</Label>
                    <div className="relative">
                      <Input 
                        id="bankAccountNumber" 
                        name="bankAccountNumber" 
                        type={showAccountNumber ? "text" : "password"}
                        value={settings.bankAccountNumber} 
                        onChange={onChange} 
                        placeholder="เลขที่บัญชี" 
                        className="pr-20"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAccountNumber(!showAccountNumber)}
                          className="h-6 w-6 p-0"
                        >
                          {showAccountNumber ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                        {settings.bankAccountNumber && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(settings.bankAccountNumber, 'เลขที่บัญชี')}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankBranch">สาขา</Label>
                    <Input 
                      id="bankBranch" 
                      name="bankBranch" 
                      value={settings.bankBranch} 
                      onChange={onChange} 
                      placeholder="ชื่อสาขา (ไม่บังคับ)" 
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Bank Info Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>ตัวอย่างข้อมูลการโอนเงิน</CardTitle>
                  <CardDescription>ข้อมูลที่จะแสดงให้ลูกค้า</CardDescription>
                </CardHeader>
                <CardContent>
                  {settings.bankName && settings.bankAccountName && settings.bankAccountNumber ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        {getBankInfo() && (
                          <div 
                            style={{ backgroundColor: getBankInfo().color }} 
                            className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold"
                          >
                            {getBankInfo().initials}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{settings.bankName}</p>
                          <p className="text-sm text-muted-foreground">{settings.bankBranch}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span className="text-sm font-medium">ชื่อบัญชี:</span>
                          <span className="font-mono">{settings.bankAccountName}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span className="text-sm font-medium">เลขที่บัญชี:</span>
                          <span className="font-mono">{formatAccountNumber(settings.bankAccountNumber)}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>กรุณากรอกข้อมูลบัญชีธนาคาร</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* PromptPay Tab */}
          <TabsContent value="promptpay" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    ตั้งค่า PromptPay
                  </CardTitle>
                  <CardDescription>
                    กำหนดข้อมูลสำหรับการชำระเงินผ่าน PromptPay
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="promptpayEnabled"
                      name="promptpayEnabled"
                      checked={settings.promptpayEnabled}
                      onChange={onChange}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="promptpayEnabled">เปิดใช้งาน PromptPay</Label>
                  </div>

                  {settings.promptpayEnabled && (
                    <>
                      <div className="space-y-2">
                        <Label>ประเภทข้อมูล</Label>
                        <Select value={settings.promptpayType} onValueChange={(value) => onSelectChange('promptpayType', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phone">เบอร์โทรศัพท์</SelectItem>
                            <SelectItem value="id">เลขบัตรประชาชน</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="promptpayValue">
                          {settings.promptpayType === 'phone' ? 'เบอร์โทรศัพท์' : 'เลขบัตรประชาชน'}
                        </Label>
                        <Input 
                          id="promptpayValue" 
                          name="promptpayValue" 
                          value={settings.promptpayValue} 
                          onChange={onChange} 
                          placeholder={settings.promptpayType === 'phone' ? 'เช่น 0812345678' : 'เลขบัตรประชาชน 13 หลัก'} 
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ตัวอย่าง QR Code PromptPay</CardTitle>
                  <CardDescription>ข้อมูลที่จะแสดงใน QR Code</CardDescription>
                </CardHeader>
                <CardContent>
                  {settings.promptpayEnabled && settings.promptpayValue ? (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Smartphone className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">QR Code</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="font-mono text-lg">{settings.promptpayValue}</p>
                        <p className="text-sm text-muted-foreground">
                          {settings.promptpayType === 'phone' ? 'เบอร์โทรศัพท์' : 'เลขบัตรประชาชน'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Smartphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>กรุณากรอกข้อมูล PromptPay</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Credit Card Tab */}
          <TabsContent value="credit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  ตั้งค่าบัตรเครดิต
                </CardTitle>
                <CardDescription>
                  กำหนดการชำระเงินผ่านบัตรเครดิต
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="creditCardEnabled"
                    name="creditCardEnabled"
                    checked={settings.creditCardEnabled}
                    onChange={onChange}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="creditCardEnabled">เปิดใช้งานบัตรเครดิต</Label>
                </div>

                {settings.creditCardEnabled && (
                  <div className="space-y-2">
                    <Label>ผู้ให้บริการ</Label>
                    <Select value={settings.creditCardProvider} onValueChange={(value) => onSelectChange('creditCardProvider', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกผู้ให้บริการ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="omise">Omise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">หมายเหตุ</p>
                      <p className="text-sm text-yellow-700">
                        การชำระเงินผ่านบัตรเครดิตต้องมีการตั้งค่า API Key และ Webhook 
                        จากผู้ให้บริการที่เลือก
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>การตั้งค่าทั่วไป</CardTitle>
            <CardDescription>กำหนดการทำงานของระบบชำระเงิน</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="paymentInstructions">คำแนะนำการชำระเงิน</Label>
                <textarea
                  id="paymentInstructions"
                  name="paymentInstructions"
                  value={settings.paymentInstructions}
                  onChange={onChange}
                  placeholder="คำแนะนำสำหรับลูกค้า..."
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="autoConfirmPayment"
                    name="autoConfirmPayment"
                    checked={settings.autoConfirmPayment}
                    onChange={onChange}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="autoConfirmPayment">ยืนยันการชำระเงินอัตโนมัติ</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentTimeout">ระยะเวลารอการชำระเงิน (ชั่วโมง)</Label>
                  <Input 
                    id="paymentTimeout" 
                    name="paymentTimeout" 
                    type="number"
                    value={settings.paymentTimeout} 
                    onChange={onChange} 
                    min="1"
                    max="168"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={save} 
            disabled={!isFormValid()}
            className="min-w-[200px]"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            บันทึกการตั้งค่า
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminPayment;


