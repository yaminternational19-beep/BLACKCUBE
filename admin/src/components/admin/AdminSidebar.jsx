'use client';

import { useState, useEffect } from "react";
import { LayoutDashboard, FileText, Settings, ChevronRight, Users } from "lucide-react";
import { notificationsApi } from "@/api";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
// SidebarGroupLabel,
SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
// import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
const sidebarItems = [{
  id: "dashboard",
  title: "Dashboard",
  icon: LayoutDashboard,
  description: "Overview & Analytics"
}, {
  id: "home-cms",
  title: "Home Page",
  icon: FileText,
  description: "Edit Home Page Content"
}, {
  id: "about-cms",
  title: "About Page",
  icon: FileText,
  description: "Edit About Page Content"
}, {
  id: "services-cms",
  title: "Services Page",
  icon: FileText,
  description: "Edit Services Page Content"
},  {
  id: "portfolio-cms",
  title: "Portfolio Page",
  icon: FileText,
  description: "Edit Portfolio Page Content"
}, {
  id: "career-cms",
  title: "Career Page",
  icon: FileText,
  description: "Edit Career Page Content"
},{
  id: "contact-cms",
  title: "Contact Page",
  icon: FileText,
  description: "Edit Contact Page Content"
}, {
  id: "users",
  title: "Contact Submissions",
  icon: Users,
  description: "Manage Contact Submissions"
}, {
  id: "job-applications",
  title: "Job Applications",
  icon: FileText,
  description: "Manage Job Applications"
}, {
  id: "footer-cms",
  title: "Footer Settings",
  icon: Settings,
  description: "Manage Footer Information"
}];
export function AdminSidebar({
  activeTab,
  onTabChange
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  const [unreadCounts, setUnreadCounts] = useState({ users: 0, 'job-applications': 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await notificationsApi.getUnreadCounts();
        if (res.success) {
          setUnreadCounts({
            users: res.data.contact_submissions,
            'job-applications': res.data.job_applications
          });
        }
      } catch (err) {
        console.error('Failed to fetch unread counts', err);
      }
    };
    fetchCounts();
    const interval = setInterval(fetchCounts, 5 * 60 * 1000); // Poll every 5 minutes
    return () => clearInterval(interval);
  }, []);
  return <Sidebar className={cn("border-r border-border transition-all duration-300 h-screen flex flex-col", isCollapsed ? "w-16" : "w-64")} collapsible="icon">
      {/* Fixed Header */}
      <div className="p-4 border-b border-sidebar-border flex-shrink-0">
        {!isCollapsed ? <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary">Admin</h3>
              {/* <p className="text-xs text-sidebar-foreground/60">Content Management</p> */}
            </div>
          </div> : <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center ">
            <Settings className="w-4 h-4 text-primary-foreground" />
          </div>}
      </div>

      {/* Scrollable Content */}
      <SidebarContent className="bg-sidebar flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarItems.map(item => <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild 
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-6 rounded-xl transition-all duration-200 cursor-pointer mb-2", 
                      "hover:bg-primary-blue/10 hover:text-white", 
                      activeTab === item.id ? "bg-primary-blue/15 text-primary-blue font-semibold shadow-sm border border-primary-blue/20" : "text-primary-gray"
                    )}
                  >
                    <button onClick={() => {
                      console.log('Changing tab to:', item.id);
                      onTabChange(item.id);
                    }}>
                      <div className="flex items-center gap-4 relative">
                        <div className="relative">
                          <item.icon className={cn("h-5 w-5 flex-shrink-0 transition-colors", activeTab === item.id ? "text-primary-blue" : "text-primary-gray")} />
                          {isCollapsed && unreadCounts[item.id] > 0 && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-background shadow-sm" />
                          )}
                        </div>
                        {!isCollapsed && (
                          <div className="flex items-center gap-2">
                            <span className="text-[15px]">{item.title}</span>
                            {unreadCounts[item.id] > 0 && (
                              <span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm" />
                            )}
                          </div>
                        )}
                      </div>
                      {!isCollapsed && activeTab === item.id && <ChevronRight className="h-5 w-5 text-primary-blue ml-auto" />}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}
