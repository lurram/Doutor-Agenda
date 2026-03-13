"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider open={open}>
      <AppSidebar onOpenChange={setOpen} />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
