"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  FileText,
  Gift,
  LogOut,
  Menu,
  X,
  Settings,
  MessageCircle,
  FolderTree,
  Newspaper,
  Bot,
  Images,
  Mail
} from "lucide-react";
import { useState, useEffect } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Tổng quan", path: "/admin/dashboard" },
  { icon: FolderTree, label: "Danh mục", path: "/admin/categories" },
  { icon: Package, label: "Sản phẩm", path: "/admin/products" },
  { icon: ShoppingBag, label: "Đơn hàng", path: "/admin/orders" },
  { icon: Users, label: "Người dùng", path: "/admin/users" },
  { icon: Gift, label: "Mã giảm giá", path: "/admin/coupons" },
  { icon: Newspaper, label: "Tin tức", path: "/admin/news" },
  { icon: Images, label: "Banner", path: "/admin/banners" },
  { icon: FileText, label: "Hỏi đáp", path: "/admin/contacts" },
  { icon: MessageCircle, label: "CSKH", path: "/admin/customer-service" },
  { icon: Bot, label: "AI Chatbot", path: "/admin/chatbot/settings" },
  { icon: Mail, label: "Bản tin", path: "/admin/newsletters" },
  { icon: Settings, label: "Cài đặt Website", path: "/admin/site-settings" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Wait for auth to be loaded before checking
    if (!mounted) return;
    
    // Redirect non-admin users away from admin pages
    if (user && user.role !== 'admin' && pathname.startsWith('/admin')) {
      router.push('/home');
    }
    // Redirect unauthenticated users away from admin pages (but wait a bit for auth to load)
    const timer = setTimeout(() => {
      if (!user && pathname.startsWith('/admin')) {
        router.push('/home');
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [user, router, pathname, mounted]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/home');
  };

  if (!mounted) {
    return null;
  }

  // Don't render admin pages if user is not admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className={`bg-white border-r border-green-100 shadow-lg transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-20'
        } fixed inset-y-0 z-30`}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-green-100 flex items-center justify-between bg-gradient-to-r from-green-50 to-white">
              <div className="flex items-center gap-3">
                {sidebarOpen ? (
                  <div className="w-44 h-14 flex items-center justify-center">
                    <img
                      src="/Refurbest.png"
                      alt="Refurbest"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img
                      src="/Refurbest.png"
                      alt="Refurbest"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-green-50 rounded-lg transition-colors text-gray-600 hover:text-green-600"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <motion.button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                  </motion.button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-green-100">
              <motion.button
                onClick={handleSignOut}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span className="font-medium">Đăng xuất</span>}
              </motion.button>
            </div>
          </div>
        </aside>

        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

