'use client';

import { useState } from 'react';
import { SidebarProvider, useSidebar } from "../ui/sidebar";
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { AdminContent } from './AdminContent';
import { cn } from "@/lib/utils";

function AdminLayoutInner({ activeTab, setActiveTab, handleSave }) {
  const { open } = useSidebar();

  const marginLeftClass = open ? "ml-64" : "ml-16";
  const headerLeftClass = open ? "left-64" : "left-16";

  return (
    <div className="h-screen flex w-full overflow-hidden bg-background">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-40">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      {/* Main Content Area */}
      <div className={cn("flex-1 flex flex-col min-w-0 w-full transition-all duration-300", marginLeftClass)}>
        {/* Fixed Header */}
        <div className={cn("fixed top-0 right-0 z-30 transition-all duration-300", headerLeftClass)}>
          <AdminTopbar onSave={handleSave} />
        </div>
        
        {/* Scrollable Main Content */}
        <main className="flex-1 p-6 overflow-auto mt-16 min-w-0">
          <AdminContent key={activeTab} activeTab={activeTab} onTabChange={setActiveTab} />
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ active }) {
  const [activeTab, setActiveTab] = useState(active || 'dashboard');
  const handleSave = () => {
    console.log('Saving changes...');
  };

  return (
    <SidebarProvider>
      <AdminLayoutInner activeTab={activeTab} setActiveTab={setActiveTab} handleSave={handleSave} />
    </SidebarProvider>
  );
}
