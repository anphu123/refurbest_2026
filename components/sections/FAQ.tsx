"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import NewsSection from "./NewsSection";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { faqCategories } from "@/data/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  // Lấy 2 câu hỏi nổi bật từ mỗi danh mục cho trang chủ
  const homepageFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.slice(0, 2)
  }));

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
      blue: { bg: "bg-white", text: "text-gray-400", icon: "bg-green-500" },
      green: { bg: "bg-white", text: "text-gray-400", icon: "bg-green-600" },
      purple: { bg: "bg-white", text: "text-gray-400", icon: "bg-green-500" },
      orange: { bg: "bg-white", text: "text-gray-400", icon: "bg-green-600" },
      teal: { bg: "bg-white", text: "text-gray-400", icon: "bg-green-500" }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Câu hỏi thường gặp</h2>

        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
          {/* FAQ Left Column */}
          <div className="space-y-6">
            {homepageFAQs.map((category, categoryIndex) => {
              const colors = getColorClasses(category.color);
              const IconComponent = category.icon;

              return (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                  className={`${colors.bg} rounded-xl overflow-hidden border-2 border-${category.color}-200`}
                >
                  {/* Category Header */}
                  <div className={`${colors.icon} px-4 py-3`}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5 text-white" />
                      <h3 className="text-lg font-bold text-white">{category.category}</h3>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="p-4 space-y-3">
                    {category.questions.map((faq, faqIndex) => {
                      const faqId = `${categoryIndex}-${faqIndex}`;
                      const isOpen = openIndex === faqId;

                      return (
                        <div key={faqIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <motion.button
                            onClick={() => setOpenIndex(isOpen ? null : faqId)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors group"
                            whileHover={{ scale: 1.002 }}
                            whileTap={{ scale: 0.998 }}
                          >
                            <span className="font-semibold text-gray-900 pr-4 group-hover:text-green-500 transition-colors text-sm">
                              {faq.q}
                            </span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                              <ChevronDown className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                            </motion.div>
                          </motion.button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  height: { duration: 0.2, ease: "easeInOut" },
                                  opacity: { duration: 0.15, ease: "easeInOut" }
                                }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 text-gray-700 leading-relaxed border-t border-gray-100 pt-3 text-sm">
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}

            {/* Nút "Xem thêm" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-center mt-8"
            >
              <Link href="/faq">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Xem tất cả câu hỏi thường gặp
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </Link>
              <p className="text-gray-500 text-sm mt-2">
                Khám phá thêm 30+ câu hỏi được phân loại chi tiết
              </p>
            </motion.div>
          </div>

          {/* News Right Column */}
          <div className="hidden lg:block">
            <NewsSection />
          </div>
        </div>
      </div>
    </div>
  );
}

