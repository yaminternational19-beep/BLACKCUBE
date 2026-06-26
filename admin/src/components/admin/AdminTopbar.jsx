'use client';

import Button from "@/components/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
export function AdminTopbar({}) {
  return <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 w-full">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8" />
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-primary">CMS Admin Panel</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* <Button onClick={onSave} className="btn-gold">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
         </Button> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/about_hero_secction.jpg" alt="Admin" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-popover" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem className="hover:bg-muted cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
             </DropdownMenuItem>
             <DropdownMenuItem className="hover:bg-muted cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
             </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-muted cursor-pointer text-destructive" onClick={() => {
            localStorage.removeItem('admin_token');
            window.location.href = '/admin/login';
          }}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>;
}
