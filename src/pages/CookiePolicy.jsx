import React from 'react';
import { Helmet } from 'react-helmet';

const CookiePolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Helmet>
        <title>นโยบายการใช้คุกกี้ - SCC</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">นโยบายการใช้คุกกี้</h1>
      <p className="text-muted-foreground mb-6">
        เอกสารฉบับนี้อธิบายประเภทคุกกี้ที่เราใช้ จุดประสงค์ และวิธีจัดการคุกกี้บนเว็บไซต์ของเรา
      </p>
      <h2 className="text-lg font-semibold mt-6">คุกกี้ที่จำเป็น</h2>
      <p className="mb-4">คุกกี้ที่จำเป็นสำหรับการทำงานของเว็บไซต์ เช่น การจดจำตะกร้าสินค้า การเข้าสู่ระบบ</p>
      <h2 className="text-lg font-semibold mt-6">คุกกี้วิเคราะห์</h2>
      <p className="mb-4">ช่วยให้เราเข้าใจการใช้งานและปรับปรุงประสบการณ์ โดยข้อมูลจะถูกรวมและไม่ระบุตัวบุคคล</p>
      <h2 className="text-lg font-semibold mt-6">คุกกี้การตลาด</h2>
      <p className="mb-4">ใช้เพื่อวัดประสิทธิภาพแคมเปญและนำเสนอคอนเทนต์ที่เหมาะสม</p>
      <h2 className="text-lg font-semibold mt-6">การจัดการคุกกี้</h2>
      <p>คุณสามารถจัดการการยินยอมได้จากแถบแจ้งคุกกี้ด้านล่างของหน้า หรือเคลียร์ค่าที่บันทึกในเบราว์เซอร์</p>
    </div>
  );
};

export default CookiePolicy;


