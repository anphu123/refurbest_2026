"use client";

import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Anh Tuấn",
      role: "Nhân viên văn phòng",
      rating: 5,
      content: "Mình mua iPhone 13 loại A+ ở đây, máy đẹp như mới, pin 89%. Giá rẻ hơn mua mới gần 40% mà vẫn được bảo hành 12 tháng. Rất đáng tiền!",
      product: "iPhone 13 128GB",
    },
    {
      name: "Chị Lan",
      role: "Giáo viên",
      rating: 5,
      content: "Lần đầu mua máy tân trang nên hơi lo, nhưng nhận máy thấy còn đẹp lắm. Màn hình không trầy, pin dùng cả ngày vẫn còn. Shop tư vấn nhiệt tình, giao hàng nhanh.",
      product: "Samsung Galaxy A54",
    },
    {
      name: "Anh Minh",
      role: "Freelancer",
      rating: 5,
      content: "Đặt máy tối hôm trước, sáng hôm sau đã nhận được. Máy ngon, chạy mượt, không lag. Giá cả hợp lý, phù hợp với túi tiền sinh viên như mình.",
      product: "Xiaomi Redmi Note 12",
    },
    {
      name: "Chị Hương",
      role: "Chủ shop thời trang",
      rating: 5,
      content: "Mua iPhone 14 Pro về dùng thấy ổn áp, camera đẹp, pin trâu. Bảo hành 12 tháng nên yên tâm. Lần sau có nhu cầu sẽ tiếp tục ủng hộ shop.",
      product: "iPhone 14 Pro 256GB",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
              Khách hàng nói gì về chúng tôi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hơn 10,000+ khách hàng tin tưởng và hài lòng với sản phẩm, dịch vụ của chúng tôi
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <FadeInWhenVisible key={testimonial.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-large transition-all duration-300 relative group flex flex-col h-full"
              >
                {/* Quote icon */}
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 text-sm mb-4 leading-relaxed italic flex-grow min-h-[120px]">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Product */}
                <div className="text-xs text-gray-500 mb-4 bg-gray-50 px-3 py-2 rounded-lg">
                  {testimonial.product}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        {/* Trust badge */}
        <FadeInWhenVisible delay={0.4}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-soft">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center border-2 border-white"
                  >
                    <User className="w-5 h-5 text-white" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">10,000+ khách hàng hài lòng</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  Đánh giá trung bình 4.8/5 
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

