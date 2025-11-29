"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Botchat from "@/components/Botchat";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Award, Target, Lightbulb, Heart, MessageCircle, Wrench, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { useSiteSettings } from "@/lib/hooks/useSiteSettings";

export default function IntroPage() {
  const [mounted, setMounted] = useState(false);
  const { settings } = useSiteSettings();

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: Award,
      title: "CHẤT LƯỢNG AN TÂM",
      description: "Mỗi thiết bị đều được kiểm định kỹ lưỡng theo quy trình chuẩn – từ phần cứng đến phần mềm, đảm bảo hoạt động ổn định và bền bỉ."
    },
    {
      icon: Target,
      title: "GIÁ TRỊ HỢP LÝ",
      description: "Bạn không cần bỏ ra số tiền lớn cho thiết bị mới, vẫn có thể sở hữu những sản phẩm đáng tin cậy với chi phí tiết kiệm đến 50%."
    },
    {
      icon: Lightbulb,
      title: "HƯỚNG ĐẾN MÔI TRƯỜNG",
      description: "Mỗi sản phẩm refurbished bạn chọn mua là một hành động góp phần giảm rác thải điện tử, tiết kiệm tài nguyên và bảo vệ hành tinh."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Logo */}
      <section className="relative h-[75vh] min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img 
            src="/refurbest-logo-1080.png"
            alt="Refurbest Logo"
            className="w-[600px] h-[600px] object-contain"
          />
        </div>

        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <img 
                  src="/refurbest-logo-1080.png"
                  alt="Refurbest Logo"
                  className="w-48 h-48 md:w-64 md:h-64 mx-auto object-contain drop-shadow-2xl"
                />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
                VỀ REFURBEST
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                CÔNG NGHỆ CHẤT LƯỢNG - GIÁ TRỊ BỀN VỮNG
              </p>
              <p className="text-xl md:text-2xl font-semibold text-gray-700">
                THIẾT BỊ TÂN TRANG ĐÁNG TIN CẬY
              </p>
            </motion.div>
          </div>
        </div>


      </section>

      {/* Main Content */}
      <main className="bg-white">
        {/* Refurbish là gì? - Banner Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} />
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                <span className="text-white font-bold text-lg">💡 KIẾN THỨC CƠ BẢN</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
                Refurbish là gì?
              </h2>
              <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Thiết bị tân trang - Chất lượng như mới, giá cả hợp lý
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Wrench className="w-8 h-8 text-green-600" />
                    Định nghĩa
                  </h3>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    <strong className="text-green-600">Refurbish</strong> (tân trang) là thiết bị điện tử đã qua sử dụng, 
                    được <strong>kiểm tra kỹ lưỡng, sửa chữa, thay thế linh kiện hư hỏng</strong> và 
                    <strong> làm mới lại</strong> bởi nhà sản xuất hoặc đơn vị ủy quyền. 
                    Thiết bị sau khi tân trang hoạt động <strong className="text-green-600">như mới</strong>, 
                    đạt chuẩn chất lượng và thường đi kèm <strong>bảo hành chính thức</strong>.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-xl">✓</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Refurbish KHÁC gì hàng cũ?</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>Được kiểm định chuyên nghiệp</strong> theo quy trình chuẩn</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>Thay thế linh kiện</strong> hư hỏng bằng linh kiện chính hãng</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>Có bảo hành rõ ràng</strong> (12 tháng tại Refurbest)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>Tiếp tục bảo hành</strong> của hãng (nếu còn) + Refurbest bảo hành phần còn lại</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>Đảm bảo hoạt động ổn định</strong> như máy mới</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-xl">✗</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Hàng cũ thông thường</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">•</span>
                            <span>Không qua kiểm định chuyên nghiệp</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">•</span>
                            <span>Không thay thế linh kiện hư hỏng</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">•</span>
                            <span>Không có bảo hành hoặc bảo hành mơ hồ</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">•</span>
                            <span>Chất lượng không đảm bảo</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-300">
                  <div className="flex items-start gap-4">
                    <Leaf className="w-12 h-12 text-green-600 shrink-0" />
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-3">Tại sao nên chọn Refurbish?</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-3xl font-bold text-green-600 mb-1">50%</div>
                          <p className="text-gray-700">Tiết kiệm chi phí so với máy mới</p>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-green-600 mb-1">12 tháng</div>
                          <p className="text-gray-700">Bảo hành chính hãng</p>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
                          <p className="text-gray-700">Thân thiện môi trường</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <MessageCircle className="w-10 h-10 text-green-600" />
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Câu chuyện của Refurbest
                </h2>
              </div>
              <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Refurbest ra đời với một niềm tin đơn giản: <strong>công nghệ chất lượng không nhất thiết phải đi kèm với giá cao hay gây hại đến môi trường.</strong>
                </p>
                <p>
                  Chúng tôi nhận thấy mỗi năm có hàng triệu thiết bị điện tử bị bỏ đi, trong khi phần lớn trong số đó vẫn còn khả năng sử dụng rất tốt nếu được kiểm tra, thay thế linh kiện và làm mới lại một cách chuyên nghiệp. Đó là lý do Refurbest ra đời – nhằm mang đến giải pháp thiết bị công nghệ "như mới" với mức giá hợp lý, nhưng vẫn đảm bảo chất lượng và trải nghiệm đáng tin cậy cho người dùng.
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <p className="text-xl font-semibold text-green-700">
                    Refurbest không chỉ là một cửa hàng – chúng tôi là một phần của xu thế mới: tiêu dùng bền vững, công nghệ thân thiện, và lối sống thông minh.
                  </p>
                </div>
                <p>
                  Hành trình của bạn với Refurbest không chỉ là sở hữu một thiết bị đáng tin cậy – mà còn là chung tay kiến tạo một tương lai đáng sống hơn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-green-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-green-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-all duration-300">
                    <Target className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">Tầm nhìn</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Trở thành nơi đáng tin cậy nhất trong lòng khách hàng – nơi bạn có thể tìm thấy thiết bị công nghệ chất lượng với sự phục vụ tận tâm như người thân trong gia đình.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-green-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-all duration-300">
                    <Wrench className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">Sứ mệnh</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Mang đến các thiết bị tân trang an toàn – bền bỉ – tiết kiệm, giúp người dùng yên tâm sử dụng lâu dài.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Tạo dựng trải nghiệm mua hàng minh bạch, phục vụ chu đáo, hỗ trợ kỹ thuật như bạn bè.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Lan toả tư duy tiêu dùng công nghệ bền vững, giảm rác thải điện tử và bảo vệ môi trường sống.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Đồng hành cùng cộng đồng bằng cách mở rộng tiếp cận công nghệ chất lượng với chi phí hợp lý.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Leaf className="w-10 h-10 text-green-600" />
                <h2 className="text-4xl font-bold text-gray-900">Chúng tôi theo đuổi 3 giá trị cốt lõi</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-green-300 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Refurbished */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Lý do nên chọn thiết bị tân trang</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer group w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Chất lượng đảm bảo như máy mới</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Thiết bị được kiểm định nghiêm ngặt, thay thế linh kiện nếu cần, đảm bảo hoạt động ổn định, mượt mà không khác gì hàng mới.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-50 rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer group w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Tiết kiệm đến 50% chi phí</h3>
                <p className="text-gray-600 text-sm leading-relaxed">So với thiết bị mới, bạn có thể tiết kiệm từ 20–80%, mà vẫn được bảo hành rõ ràng – lựa chọn kinh tế thông minh.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer group w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Bảo hành, đổi trả rõ ràng</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Tất cả thiết bị đều được bảo hành 12 tháng. Nếu máy còn bảo hành của hãng sản xuất (ví dụ 4 tháng), trong thời gian đó bạn sẽ được bảo hành trực tiếp tại hãng. Sau thời gian này, Refurbest sẽ tiếp tục bảo hành trong phần thời gian còn lại (ví dụ 8 tháng). Đổi trả trong 30 ngày nếu lỗi kỹ thuật.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-50 rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer group w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Giảm thiểu rác thải điện tử</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Chọn thiết bị tân trang là bạn đang góp phần kéo dài vòng đời sản phẩm, giảm lượng rác thải công nghệ ra môi trường.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer group w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Tiêu dùng có trách nhiệm</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Bạn không chỉ tiết kiệm cho bản thân, mà còn góp phần xây dựng thói quen tiêu dùng bền vững cho cộng đồng và thế hệ sau.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="w-10 h-10 text-green-600" />
                <h2 className="text-4xl font-bold text-gray-900">Cam kết chất lượng & dịch vụ từ Refurbest</h2>
              </div>
            </div>

            <div className="space-y-4">
              {/* Commitment 1 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">1. Kiểm định nghiêm ngặt – Máy sẵn sàng như mới</h3>
                    <p className="text-gray-700 leading-relaxed">Mỗi thiết bị được kiểm tra theo quy trình 20+ bước, bao gồm: kiểm tra phần cứng, màn hình, pin, loa, camera, cảm biến, kết nối mạng... trước khi được đóng gói và giao đến tay bạn.</p>
                  </div>
                </div>
              </div>

              {/* Commitment 2 */}
              <div className="bg-gradient-to-br from-green-50 to-green-50 rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">2. Linh kiện đảm bảo – Pin đạt chuẩn, màn hình rõ nét</h3>
                    <p className="text-gray-700 leading-relaxed">Chúng tôi chỉ sử dụng linh kiện thay thế đạt tiêu chuẩn kỹ thuật của NSX quy định.</p>
                  </div>
                </div>
              </div>

              {/* Commitment 3 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">3. Bảo hành rõ ràng – Đổi trả minh bạch</h3>
                    <p className="text-gray-700 leading-relaxed">Tất cả sản phẩm đều được bảo hành 12 tháng, hỗ trợ đổi trả trong 30 ngày nếu có lỗi kỹ thuật. Nếu thiết bị vẫn còn bảo hành từ nhà sản xuất, bạn sẽ được ưu tiên bảo hành tại hãng trước.</p>
                  </div>
                </div>
              </div>

              {/* Commitment 4 */}
              <div className="bg-gradient-to-br from-green-50 to-green-50 rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">4. Dịch vụ kỹ thuật chuyên nghiệp – Hỗ trợ 24/7</h3>
                    <p className="text-gray-700 leading-relaxed">Đội ngũ kỹ thuật Refurbest luôn sẵn sàng hỗ trợ từ xa hoặc trực tiếp, xử lý các vấn đề phát sinh nhanh chóng – với thái độ tận tâm, minh bạch như phục vụ người thân.</p>
                  </div>
                </div>
              </div>

              {/* Commitment 5 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">5. Hài lòng là ưu tiên số 1</h3>
                    <p className="text-gray-700 leading-relaxed">Chúng tôi không chỉ bán thiết bị – mà mang đến sự an tâm và hài lòng. Nếu bạn không hài lòng, chúng tôi sẽ tìm cách xử lý cho đến khi bạn yên tâm.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="bg-gradient-to-br from-green-50 to-green-50 rounded-2xl p-8 border border-green-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">LIÊN HỆ</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Hotline: {settings.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span>{settings.email}</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 border border-teal-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">SHOWROOM</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Địa chỉ showroom sẽ được cập nhật sớm.<br />
                  Hiện tại hỗ trợ giao hàng toàn quốc.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Botchat />
    </div>
  );
}
