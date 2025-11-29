import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useSiteSettings } from "@/lib/hooks/useSiteSettings";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 mt-16 sm:mt-20 md:mt-24">
      {/* Main Footer - Mobile Optimized */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Company Info - Mobile Optimized */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <div className="w-40 h-14 sm:w-48 sm:h-16 md:w-56 md:h-20">
                <img src="/Refurbest.png" alt="Refurbest" className="w-full h-full object-contain object-left" />
              </div>
            </div>
            <p className="text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed text-gray-300">
              Thiết bị công nghệ tân trang đáng tin cậy - Tiết kiệm thông minh, bảo hành 12 tháng.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-11 sm:h-11 bg-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-11 sm:h-11 bg-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-pink-600 transition-all hover:scale-110">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
              {settings.youtubeUrl && (
                <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-11 sm:h-11 bg-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110">
                  <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
              {settings.zaloUrl && (
                <a href={settings.zaloUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-11 sm:h-11 bg-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all hover:scale-110">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links - Mobile Optimized */}
          <div>
            <h3 className="font-bold text-white mb-4 sm:mb-6 text-base sm:text-lg">Điều hướng nhanh</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/product" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Bảo hành & Đổi trả
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Giới thiệu
                </Link>
              </li>
              <li className="hidden sm:list-item">
                <Link href="/quy-trinh-kiem-dinh" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Quy trình kiểm định
                </Link>
              </li>
              <li className="hidden sm:list-item">
                <Link href="/faq" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* About - Mobile Optimized */}
          <div>
            <h3 className="font-bold text-white mb-4 sm:mb-6 text-base sm:text-lg">Về chúng tôi</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <Link href="/gioi-thieu" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Giới thiệu Refurbest
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Tin tức & Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Hệ thống cửa hàng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Liên hệ</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-600/30 transition-colors">
                  <Phone className="w-5 h-5 text-green-300" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Hotline</div>
                  <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-green-400 transition-colors font-bold">{settings.phone}</a>
                  <div className="text-xs text-green-300 mt-1">Hỗ trợ 7h30 - 22h00</div>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-600/30 transition-colors">
                  <Mail className="w-5 h-5 text-green-300" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Email</div>
                  <a href={`mailto:${settings.email}`} className="hover:text-green-400 transition-colors">{settings.email}</a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-600/30 transition-colors">
                  <MapPin className="w-5 h-5 text-green-300" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Địa chỉ</div>
                  <p className="text-green-200">{settings.address || 'Giao hàng toàn quốc'}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterForm />

      {/* Copyright */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-400">
            © 2025 <span className="text-white font-semibold">Refurbest</span>. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
