"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Botchat from "@/components/Botchat";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { faqCategories } from "@/data/faq";
import { useSiteSettings } from "@/lib/hooks/useSiteSettings";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { settings } = useSiteSettings();

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; icon: string; text: string }> = {
      blue: { bg: "bg-white", border: "border-green-200", icon: "bg-green-500", text: "text-green-600" },
      green: { bg: "bg-white", border: "border-green-200", icon: "bg-green-600", text: "text-green-700" },
      purple: { bg: "bg-white", border: "border-green-200", icon: "bg-green-500", text: "text-green-600" },
      orange: { bg: "bg-white", border: "border-green-200", icon: "bg-green-600", text: "text-green-700" },
      teal: { bg: "bg-white", border: "border-green-200", icon: "bg-green-500", text: "text-green-600" }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-500 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Câu hỏi thường gặp
            </h1>
            <p className="text-xl text-green-50">
              Tìm câu trả lời cho mọi thắc mắc của bạn về sản phẩm và dịch vụ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {faqCategories.map((category, categoryIndex) => {
            const colors = getColorClasses(category.color);
            return (
              <section
                key={categoryIndex}
                className="mb-12"
              >
                <div className={`${colors.bg} rounded-2xl border-2 ${colors.border} overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
                  <div className={`${colors.icon} px-6 py-5`}>
                    <div className="flex items-center gap-3">
                      <category.icon className="w-5 h-5 text-white" />
                      <h2 className="text-xl font-bold text-white">{category.category}</h2>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      const isOpen = openIndex === globalIndex;

                      return (
                        <div key={faqIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors group"
                          >
                            <span className="font-semibold text-gray-900 pr-4 group-hover:text-green-500 transition-colors text-sm">
                              {faq.q}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-all duration-200 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 text-gray-700 leading-relaxed border-t border-gray-100 pt-3 text-sm">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}

          {/* Contact CTA */}
          <div className="text-center bg-gradient-to-br from-green-50 to-green-50 rounded-2xl p-8 border border-green-200">
            <HelpCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy câu trả lời?
            </h3>
            <p className="text-gray-600 mb-6">
              Liên hệ với đội ngũ hỗ trợ của chúng tôi để được giải đáp mọi thắc mắc
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${settings.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                Gọi ngay: {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors"
              >
                Email: {settings.email}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Botchat />
    </div>
  );
}

