"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  ChevronDown,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  QrCode,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Tables",
      icon: QrCode,
      href: "/dashboard/tables",
      active: pathname === "/dashboard/tables",
    },
    {
      label: "Staff",
      icon: Users,
      href: "/dashboard/staff",
      active: pathname === "/dashboard/staff",
    },
    {
      label: "Orders",
      icon: ShoppingBag,
      href: "/dashboard/orders",
      active: pathname === "/dashboard/orders",
    },
    {
      label: "Income",
      icon: CreditCard,
      href: "/dashboard/income",
      active: pathname === "/dashboard/income",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <SheetContent side="left" className="pr-0">
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                <span className="text-lg font-bold text-white">Z</span>
              </div>
              <span className="text-lg font-bold text-orange-500">Zplit</span>
            </div>
            <div className="mt-8 px-2">
              <nav className="grid gap-2">
                {routes.map((route, i) => (
                  <Link
                    key={i}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                      route.active ? "bg-orange-50 text-orange-500" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 md:h-9 md:w-9">
            <span className="text-lg font-bold text-white">Z</span>
          </div>
          <span className="text-lg font-bold text-orange-500 md:text-xl">Zplit</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full border-gray-200 px-2">
                <span className="mr-2 h-7 w-7 rounded-full bg-gray-100 p-1">
                  <span className="sr-only">User menu</span>
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                    JD
                  </span>
                </span>
                <span className="hidden text-sm font-medium md:inline">John Doe</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-white md:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {routes.map((route, i) => (
                  <Link
                    key={i}
                    href={route.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      route.active ? "bg-orange-50 text-orange-500" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center gap-3 rounded-lg bg-orange-50 px-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Zplit Pro</div>
                  <div className="text-xs text-gray-500">Get more features</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
