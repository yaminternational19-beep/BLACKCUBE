'use client';

import { useState } from 'react';
import { SidebarProvider } from "../ui/sidebar";
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { AdminContent } from './AdminContent';
export default function AdminLayout({
  active
}) {
  const [activeTab, setActiveTab] = useState(active || 'dashboard');
  const handleSave = () => {
    // Handle save functionality
    console.log('Saving changes...');
  };
  return <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 h-screen z-40">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-64 min-w-0 w-full">
          {/* Fixed Header */}
          <div className="fixed top-0 right-0 left-64 z-30">
            <AdminTopbar onSave={handleSave} />
          </div>
          
          {/* Scrollable Main Content */}
          <main className="flex-1 p-6 overflow-auto mt-16 min-w-0">
            <AdminContent key={activeTab} activeTab={activeTab} onTabChange={setActiveTab} />
          </main>
        </div>
      </div>
    </SidebarProvider>;
}
