"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
// import Button from "@/components/ui/Button"

// const SIDEBAR_COOKIE_NAME = "sidebar:state"
// const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem";
// const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
const SidebarProvider = React.forwardRef(({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}, ref) => {
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(value => {
    const openState = typeof value === "function" ? value(open) : value;
    if (setOpenProp) {
      setOpenProp(openState);
    } else {
      _setOpen(openState);
    }
  }, [open, setOpenProp]);

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return setOpen(open => !open);
  }, [setOpen]);

  // Helper to open the sidebar.
  // const openSidebar = React.useCallback(() => {
  //   return setOpen(true)
  // }, [setOpen])

  // Helper to close the sidebar.
  // const closeSidebar = React.useCallback(() => {
  //   return setOpen(false)
  // }, [setOpen])

  // Close mobile sidebar when route changes.
  React.useEffect(() => {
    setOpenMobile(false);
  }, []);

  // Handle keyboard shortcut.
  React.useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(() => ({
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile: false,
    // You can implement mobile detection here
    toggleSidebar
  }), [state, open, setOpen, openMobile, setOpenMobile, toggleSidebar]);
  return <SidebarContext.Provider value={contextValue}>
        <div style={{
      "--sidebar-width": SIDEBAR_WIDTH,
      "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
      ...style
    }} className={cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className)} ref={ref} {...props}>
          {children}
        </div>
      </SidebarContext.Provider>;
});
SidebarProvider.displayName = "SidebarProvider";
const Sidebar = React.forwardRef(({
  side = "left",
  // variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}, ref) => {
  const {
    isMobile,
    state,
    openMobile,
    setOpenMobile
  } = useSidebar();
  if (collapsible === "none") {
    return <div className={cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className)} ref={ref} {...props}>
          {children}
        </div>;
  }
  if (isMobile) {
    return <div className={cn("group/sidebar fixed inset-0 z-50 hidden data-[state=open]:flex", className)} data-state={openMobile ? "open" : "closed"} ref={ref} {...props}>
          <div className="fixed inset-0 z-50 bg-sidebar/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" data-state={openMobile ? "open" : "closed"} onClick={() => setOpenMobile(false)} />
          <div className={cn("fixed z-50 flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground shadow-lg", side === "left" ? "left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left" : "right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right")} data-state={openMobile ? "open" : "closed"}>
            {children}
          </div>
        </div>;
  }
  return <div className={cn("group/sidebar flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:fixed group-data-[collapsible=offcanvas]:inset-y-0 group-data-[collapsible=offcanvas]:z-50", side === "left" ? "group-data-[collapsible=offcanvas]:left-0" : "group-data-[collapsible=offcanvas]:right-0", state === "collapsed" && "group-data-[collapsible=icon]:w-[--sidebar-width-icon]", state === "collapsed" && "group-data-[collapsible=offcanvas]:w-0 group-data-[collapsible=offcanvas]:overflow-hidden group-data-[collapsible=offcanvas]:border-0 group-data-[collapsible=offcanvas]:p-0", className)} ref={ref} data-state={state} data-collapsible={state === "collapsed" ? collapsible : ""} {...props}>
        {children}
      </div>;
});
Sidebar.displayName = "Sidebar";
const SidebarTrigger = React.forwardRef(({
  className,
  onClick,
  ...props
}, ref) => {
  const {
    toggleSidebar
  } = useSidebar();
  return <button ref={ref} data-sidebar="trigger" className={cn("inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed btn-glow", "text-primary-gray hover:text-primary-blue hover:bg-primary-blue/10 focus:ring-primary-blue", "px-4 py-2 text-sm rounded-lg", "h-7 w-7 p-0", className)} onClick={event => {
    onClick?.(event);
    toggleSidebar();
  }} {...props}>
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </button>;
});
SidebarTrigger.displayName = "SidebarTrigger";
const SidebarRail = React.forwardRef(({
  className,
  ...props
}, ref) => {
  const {
    toggleSidebar
  } = useSidebar();
  return <button ref={ref} data-sidebar="rail" aria-label="Toggle Sidebar" tabIndex={-1} onClick={toggleSidebar} title="Toggle Sidebar" className={cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] after:-translate-x-1/2 after:transition-all after:duration-200 hover:after:bg-sidebar-border group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[side=right]:translate-x-1/2 group-data-[side=right]:group-data-[collapsible=offcanvas]:after:left-0 group-data-[side=right]:group-data-[collapsible=offcanvas]:after:right-full sm:flex", "[[data-side=left]_&]:left-0 [[data-side=right]_&]:right-0", "[[data-side=left][data-state=collapsed]_&]:left-0 [[data-side=right][data-state=collapsed]_&]:right-0", "group-data-[collapsible=offcanvas]:left-0", className)} {...props} />;
});
SidebarRail.displayName = "SidebarRail";
const SidebarInset = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <div ref={ref} className={cn("flex flex-1 flex-col gap-2 p-4 pt-0", "group-data-[variant=inset]:min-h-svh", className)} {...props} />;
});
SidebarInset.displayName = "SidebarInset";
const SidebarInput = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <input ref={ref} data-sidebar="input" className={cn("h-8 w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />;
});
SidebarInput.displayName = "SidebarInput";
const SidebarHeader = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <div ref={ref} data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarHeader.displayName = "SidebarHeader";
const SidebarFooter = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarFooter.displayName = "SidebarFooter";
const SidebarSeparator = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <hr ref={ref} data-sidebar="separator" className={cn("mx-2 w-auto bg-sidebar-border", className)} {...props} />;
});
SidebarSeparator.displayName = "SidebarSeparator";
const SidebarContent = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <div ref={ref} data-sidebar="content" className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className)} {...props} />;
});
SidebarContent.displayName = "SidebarContent";
const SidebarGroup = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <div ref={ref} data-sidebar="group" className={cn("relative flex w-full min-w-0 flex-col p-2", className)} {...props} />;
});
SidebarGroup.displayName = "SidebarGroup";
const SidebarGroupLabel = React.forwardRef(({
  className,
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "div";
  return <Comp ref={ref} data-sidebar="group-label" className={cn("duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className)} {...props} />;
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
const SidebarGroupAction = React.forwardRef(({
  className,
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} data-sidebar="group-action" className={cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-[margin,opa] ease-linear hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className)} {...props} />;
});
SidebarGroupAction.displayName = "SidebarGroupAction";
const SidebarGroupContent = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <div ref={ref} data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />;
});
SidebarGroupContent.displayName = "SidebarGroupContent";
const SidebarMenu = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <ul ref={ref} data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />;
});
SidebarMenu.displayName = "SidebarMenu";
const SidebarMenuItem = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />;
});
SidebarMenuItem.displayName = "SidebarMenuItem";
const sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
  variants: {
    variant: {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
    },
    size: {
      default: "h-8 text-sm",
      sm: "h-7 text-xs",
      lg: "h-12 text-sm group-data-[collapsible=icon]:!size-8"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
const SidebarMenuButton = React.forwardRef(({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  return <SidebarMenuTooltip content={tooltip}>
        <Comp ref={ref} data-sidebar="menu-button" data-size={size} data-active={isActive} className={cn(sidebarMenuButtonVariants({
      variant,
      size
    }), className)} {...props} />
      </SidebarMenuTooltip>;
});
SidebarMenuButton.displayName = "SidebarMenuButton";
const SidebarMenuAction = React.forwardRef(({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} data-sidebar="menu-action" className={cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring peer-hover/menu-button:bg-sidebar-accent peer-hover/menu-button:text-sidebar-accent-foreground peer-focus-visible/menu-button:bg-sidebar-accent peer-focus-visible/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:bg-sidebar-accent peer-data-[active=true]/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:opacity-100 md:opacity-0", className)} {...props} />;
});
SidebarMenuAction.displayName = "SidebarMenuAction";
const SidebarMenuBadge = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <div ref={ref} data-sidebar="menu-badge" className={cn("absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none", "peer-hover/menu-button:bg-sidebar-accent peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:bg-sidebar-accent peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className)} {...props} />;
});
SidebarMenuBadge.displayName = "SidebarMenuBadge";
const SidebarMenuSkeleton = React.forwardRef(({
  className,
  showIcon = false,
  ...props
}, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return <div ref={ref} data-sidebar="menu-skeleton" className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)} {...props}>
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton className="h-4 flex-1 max-w-[--skeleton-width]" data-sidebar="menu-skeleton-text" style={{
      "--skeleton-width": width
    }} />
    </div>;
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
const SidebarMenuSub = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <ul ref={ref} data-sidebar="menu-sub" className={cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className)} {...props} />;
});
SidebarMenuSub.displayName = "SidebarMenuSub";
const SidebarMenuSubItem = React.forwardRef(({
  ...props
}, ref) => {
  return <li ref={ref} {...props} />;
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
const SidebarMenuSubButton = React.forwardRef(({
  asChild = false,
  size = "md",
  isActive,
  className,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "a";
  return <Comp ref={ref} data-sidebar="menu-sub-button" data-size={size} data-active={isActive} className={cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-foreground/50", size === "sm" && "text-xs", size === "md" && "text-sm", isActive && "bg-sidebar-accent font-medium text-sidebar-accent-foreground", className)} {...props} />;
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
const SidebarMenuTooltip = React.forwardRef(({
  content,
  children,
  ...props
}, ref) => {
  if (!content) {
    return <>{children}</>;
  }
  return <SidebarMenuTooltipProvider>
      <SidebarMenuTooltipTrigger asChild>
        {children}
      </SidebarMenuTooltipTrigger>
      <SidebarMenuTooltipContent>
        {content}
      </SidebarMenuTooltipContent>
    </SidebarMenuTooltipProvider>;
});
SidebarMenuTooltip.displayName = "SidebarMenuTooltip";
const SidebarMenuTooltipProvider = React.forwardRef(({
  ...props
}, ref) => {
  return <div ref={ref} {...props} />;
});
SidebarMenuTooltipProvider.displayName = "SidebarMenuTooltipProvider";
const SidebarMenuTooltipTrigger = React.forwardRef(({
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} {...props} />;
});
SidebarMenuTooltipTrigger.displayName = "SidebarMenuTooltipTrigger";
const SidebarMenuTooltipContent = React.forwardRef(({
  className,
  side = "right",
  ...props
}, ref) => {
  return <div ref={ref} data-sidebar="menu-tooltip" className={cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", "hidden group-data-[collapsible=icon]:block", className)} data-side={side} {...props} />;
});
SidebarMenuTooltipContent.displayName = "SidebarMenuTooltipContent";

// Skeleton component for loading states
const Skeleton = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <div ref={ref} className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
});
Skeleton.displayName = "Skeleton";
export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarMenuTooltip, SidebarMenuTooltipContent, SidebarMenuTooltipProvider, SidebarMenuTooltipTrigger, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar };