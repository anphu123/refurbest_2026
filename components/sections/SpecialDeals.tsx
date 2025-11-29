"use client";

import { motion } from "framer-motion";
import { Clock, Zap, Gift } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SpecialDeals() {
  const deals = [
    {
      title: "Flash Sale 12H",
      description: "Giảm đến 50% các sản phẩm robot hút bụi cao cấp",
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
      badge: "Còn 3h 24p",
      image: "https://mekoong.com/wp-content/uploads/2022/02/cong-ty-san-xuat-do-gia-dung-3.png",
    },
    {
      title: "Deal Giờ Vàng",
      description: "Mua 1 tặng 1 phụ kiện khi mua nồi chiên không dầu",
      icon: Clock,
      color: "from-green-500 to-cyan-600",
      badge: "Mỗi ngày 10h",
      image: "https://mekoong.com/wp-content/uploads/2022/02/cong-ty-san-xuat-do-gia-dung-3.png",
    },
    {
      title: "Quà Tặng Đặc Biệt",
      description: "Tặng voucher 500K cho đơn hàng từ 5 triệu",
      icon: Gift,
      color: "from-purple-500 to-pink-600",
      badge: "Số lượng có hạn",
      image: "https://mekoong.com/wp-content/uploads/2022/02/cong-ty-san-xuat-do-gia-dung-3.png",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <Badge variant="hot" className="mb-4 text-sm px-4 py-2">
              🔥 HOT DEALS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
              Ưu đãi độc quyền hôm nay
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Săn deal siêu hời mỗi ngày - Tiết kiệm đến 50% cho sản phẩm yêu thích
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <FadeInWhenVisible key={deal.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-large hover:shadow-xl transition-all duration-500"
              >
                {/* Image Background */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${deal.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${deal.color} opacity-90 group-hover:opacity-95 transition-opacity`} />
                  
                  {/* Icon */}
                  <div className="relative h-full flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                    >
                      <deal.icon className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      {deal.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {deal.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {deal.description}
                  </p>
                  <Button className="w-full group-hover:shadow-xl-colored">
                    Xem ngay
                  </Button>
                </div>

                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full" />
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}

