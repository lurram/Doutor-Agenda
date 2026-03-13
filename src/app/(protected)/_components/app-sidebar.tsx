"use client";

import {
  CalendarDays,
  Gem,
  LayoutDashboard,
  LogOut,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Agendamentos",
    href: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Médicos",
    href: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Pacientes",
    href: "/patients",
    icon: UsersRound,
  },
];

export function AppSidebar({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const session = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/authentication");
        },
      },
    });
  };

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onOpenChange(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarHeader className="p-4 border-b">
        <Image src="/logo.svg" alt="Doutor Agenda" width={136} height={28} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Outros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/subscription"}
                >
                  <Link href="/subscription">
                    <Gem />
                    <span>Assinatura</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size={"lg"}>
                  <Avatar>
                    <AvatarFallback>L</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{session.data?.user.clinic?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.data?.user.email}
                    </p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
