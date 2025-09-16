
import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminLayout = ({ children }) => {
  

  return (
    <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-gradient-to-br from-[#99e9da1a] via-gray-50 to-[#b7de661a]">
      <AdminSidebar />
      <div className="flex flex-col min-h-0 overflow-hidden">
        <AdminHeader />
        <main className="admin-accent-scroll flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto overscroll-contain">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
