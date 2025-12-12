"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandLogos from "@/components/sections/BrandLogos";
import CategoryTabs from "@/components/sections/CategoryTabs";
import InfoSection from "@/components/sections/InfoSection";
import FAQ from "@/components/sections/FAQ";
import UserQA from "@/components/sections/UserQA";
import Botchat from "@/components/Botchat";
import BannerSlider from "@/components/sections/BannerSlider";
import Testimonials from "@/components/sections/Testimonials";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface SiteSettings {
  hero_badge: string;
  hero_headlines: string[];
  hero_descriptions: string[];
  stats_products: number;
  stats_customers: number;
  stats_rating: number;
  stats_satisfaction: number;
  phone: string;
  email: string;
}

export default function HomePage() {
  const [textIndex, setTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [statsCount, setStatsCount] = useState({
    products: 0,
    customers: 0,
    rating: 0,
    efficiency: 0
  });
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  
  // Fetch settings from database
  useEffect(() => {
    const fetchSettings = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("hero_badge, hero_headlines, hero_descriptions, stats_products, stats_customers, stats_rating, stats_satisfaction, phone, email")
        .single();
      
      if (!error && data) {
        setSettings(data);
      }
    };
    
    fetchSettings();
  }, []);

  // Use settings from database or fallback to defaults
  const headlines = settings?.hero_headlines || [
    "Công nghệ chất lượng\nGiá trị bền vững",
    "Tiết kiệm thông minh\nBảo hành 12 tháng",
    "iPhone, Samsung, Laptop\nĐồng hồ, Tai nghe",
    "Thiết bị tân trang\nĐáng tin cậy"
  ];

  const descriptions = settings?.hero_descriptions || [
    "Thiết bị công nghệ 'như mới' với mức giá hợp lý. Tiết kiệm đến 50% mà vẫn đảm bảo chất lượng và trải nghiệm đáng tin cậy.",
    "Mỗi thiết bị được kiểm định kỹ lưỡng theo quy trình chuẩn. Bảo hành 12 tháng, đổi trả trong 30 ngày nếu lỗi kỹ thuật.",
    "Đa dạng sản phẩm: iPhone, Samsung, Laptop, Tablet, Đồng hồ thông minh, Tai nghe & loa. Phù hợp với mọi nhu cầu.",
    "Chọn thiết bị tân trang là bạn đang góp phần giảm rác thải điện tử, tiết kiệm tài nguyên và bảo vệ môi trường."
  ];

  const heroBadge = settings?.hero_badge || "THIẾT BỊ TÂN TRANG CHẤT LƯỢNG";
  const phoneNumber = settings?.phone || "1800 2097";
  const email = settings?.email || "info@refurbest.vn";

  // Change text every 6 seconds with smooth fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % headlines.length);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle hash navigation when page loads or hash changes
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1); // Remove #
        // Use multiple attempts to ensure element is rendered
        const attemptScroll = (attempts = 0) => {
          if (attempts > 10) return; // Max 10 attempts (1 second)
          
          const el = document.getElementById(sectionId);
          if (el) {
            const headerOffset = 110;
            const rect = el.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const y = rect.top + scrollTop - headerOffset;
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
          } else {
            setTimeout(() => attemptScroll(attempts + 1), 100);
          }
        };
        
        setTimeout(() => attemptScroll(), 100);
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  // Counter animation for stats
  useEffect(() => {
    if (!settings) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      products: settings.stats_products || 500,
      customers: settings.stats_customers || 50000,
      rating: settings.stats_rating || 4.9,
      efficiency: settings.stats_satisfaction || 100
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setStatsCount({
        products: Math.floor(targets.products * progress),
        customers: Math.floor(targets.customers * progress),
        rating: parseFloat((targets.rating * progress).toFixed(1)),
        efficiency: parseFloat((targets.efficiency * progress).toFixed(2))
      });

      if (step >= steps) {
        clearInterval(timer);
        setStatsCount(targets); // Ensure final values are exact
      }
    }, interval);

    return () => clearInterval(timer);
  }, [settings]);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="overflow-x-hidden">
        <div className="relative">
          <BannerSlider />
          <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
            <div className="container mx-auto px-3 sm:px-4 md:px-6">
              <div className="max-w-4xl pointer-events-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Badge */}
                  <div className="inline-block mb-3 sm:mb-4 md:mb-6">
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white tracking-wide sm:tracking-wider md:tracking-widest uppercase bg-black/30 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full border border-white/40">
                      {heroBadge}
                    </span>
                  </div>

                  {/* Headline - Fade Transition */}
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <h1
                      key={`headline-${textIndex}`}
                      className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight transition-opacity duration-300 ${
                        isTransitioning ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      {headlines[textIndex].split('\n').map((line, index) => (
                        <span key={index}>
                          {index === 0 ? line : <span className="text-green-300 sm:text-green-200">{line}</span>}
                          {index === 0 && <br />}
                        </span>
                      ))}
                    </h1>
                  </div>

                  {/* Description - Fade Transition */}
                  <div className="mb-5 sm:mb-6 md:mb-8">
                    <p
                      key={`desc-${textIndex}`}
                      className={`text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-white/95 leading-relaxed max-w-3xl transition-opacity duration-300 ${
                        isTransitioning ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      {descriptions[textIndex]}
                    </p>
                  </div>

                  {/* CTAs - Mobile Optimized */}
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10">
                    <motion.a
                      href="#san-pham"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('san-pham');
                        if (element) {
                          const headerOffset = 150;
                          const elementPosition = element.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="bg-gradient-to-r from-green-400 to-green-500 text-white px-5 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-bold hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-xl hover:shadow-2xl text-center"
                    >
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Khám phá ngay →
                      </motion.span>
                    </motion.a>
                    <motion.a
                      href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white px-5 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-bold hover:bg-white/30 hover:border-white/60 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <motion.div
                        animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "easeInOut"
                        }}
                      >
                        <Phone className="w-4 h-4 md:w-5 md:h-5" />
                      </motion.div>
                      {phoneNumber}
                    </motion.a>
                  </div>

                  {/* Stats - Mobile Grid with Counter Animation */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                    <motion.div
                      className="bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-200 cursor-pointer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="font-bold text-lg sm:text-xl md:text-2xl text-white mb-0.5">
                        {statsCount.products}+
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-white/90">Sản phẩm</div>
                    </motion.div>
                    <motion.div
                      className="bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-200 cursor-pointer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="font-bold text-lg sm:text-xl md:text-2xl text-white mb-0.5">
                        {statsCount.customers >= 1000 ? `${Math.floor(statsCount.customers / 1000)}K` : statsCount.customers}+
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-white/90">Khách hàng</div>
                    </motion.div>
                    <motion.div
                      className="bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-200 cursor-pointer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="font-bold text-lg sm:text-xl md:text-2xl text-white mb-0.5">
                        {statsCount.rating.toFixed(1)}★
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-white/90">Đánh giá</div>
                    </motion.div>
                    <motion.div
                      className="bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-200 cursor-pointer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="font-bold text-lg sm:text-xl md:text-2xl text-white mb-0.5">
                        {statsCount.efficiency.toFixed(2)}%
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-white/90">Hài lòng</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>





        {/* Brand Logos Grid */}
        <div id="thuong-hieu">
          <BrandLogos />
        </div>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Category Tabs with Products */}
        <div id="san-pham">
          <CategoryTabs />
        </div>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Info Section */}
        <div id="thong-tin">
          <InfoSection />
        </div>

        {/* FAQ Section */}
        <div id="hoi-dap">
          <FAQ />
        </div>

        {/* User Q&A Section */}
        <div id="khach-hang">
          <UserQA />
        </div>

        {/* Tư vấn Section */}
        <section id="tu-van" className="py-16 md:py-20 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(#0284c7 1px, transparent 1px), linear-gradient(90deg, #0284c7 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Cần tư vấn?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Hotline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hotline</h3>
                <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors block mb-3">
                  {phoneNumber}
                </a>
                <p className="text-sm text-gray-600">24/7 miễn phí</p>
              </motion.div>

              {/* Chat */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Chat trực tuyến</h3>
                <button className="text-green-600 hover:text-green-700 font-semibold mb-3">
                  Nhấn để chat
                </button>
                <p className="text-sm text-gray-600">Phản hồi ngay lập tức</p>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                <a href={`mailto:${email}`} className="text-green-600 hover:text-green-700 font-semibold mb-3 block break-all">
                  {email}
                </a>
                <p className="text-sm text-gray-600">Phản hồi trong 24h</p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gradient-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Để lại thông tin, chúng tôi sẽ liên hệ
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Botchat */}
      <Botchat />
    </div>
  );
}
