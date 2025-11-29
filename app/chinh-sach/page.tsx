"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Botchat from "@/components/Botchat";
import { motion } from "framer-motion";
import { Shield, RefreshCw, Truck, CreditCard, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { useSiteSettings } from "@/lib/hooks/useSiteSettings";

export default function ChinhSachPage() {
  const { settings } = useSiteSettings();
  const warrantyFeatures = [
    {
      icon: Clock,
      title: "Thời gian bảo hành",
      description: "12 tháng cho tất cả sản phẩm tại Refurbest"
    },
    {
      icon: Shield,
      title: "Phạm vi bảo hành",
      description: "Bao gồm lỗi kỹ thuật không do người dùng gây ra như: lỗi phần cứng, màn hình, pin sụt bất thường, lỗi cảm ứng, camera, loa"
    },
    {
      icon: CheckCircle,
      title: "Ưu tiên bảo hành chính hãng",
      description: "Nếu máy còn bảo hành của nhà sản xuất, Refurbest sẽ hỗ trợ khách gửi bảo hành chính hãng trong thời gian còn lại"
    }
  ];

  const returnFeatures = [
    {
      icon: RefreshCw,
      title: "Đổi trả trong 30 ngày",
      description: "Nếu sản phẩm bị lỗi kỹ thuật do nhà cung cấp"
    },
    {
      icon: CheckCircle,
      title: "Không thu phí đổi trả",
      description: "Trong trường hợp lỗi xác thực từ phía Refurbest hoặc nhà sản xuất"
    }
  ];

  const shippingFeatures = [
    {
      icon: Truck,
      title: "Giao hàng toàn quốc",
      description: "Bao gồm cả huyện đảo thông qua các đối tác uy tín"
    },
    {
      icon: Clock,
      title: "Thời gian giao hàng",
      description: "Nội thành: 1–2 ngày làm việc. Ngoại thành/tỉnh: 2–4 ngày làm việc"
    },
    {
      icon: CreditCard,
      title: "Thanh toán COD",
      description: "Áp dụng cho mọi đơn hàng. Kiểm tra hàng trước khi thanh toán"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-700 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Chính sách & Hỗ trợ
            </h1>
            <p className="text-xl text-white/90">
              Cam kết bảo hành, đổi trả và hỗ trợ khách hàng tận tâm
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Warranty Policy */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                Chính sách Bảo hành
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {warrantyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-green-50 rounded-2xl p-6 border border-green-100"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ví dụ về bảo hành:</h3>
              <p className="text-gray-700 mb-4">
                Máy còn 4 tháng bảo hành Apple – sự cố xảy ra trong 4 tháng đầu sẽ do Apple bảo hành. 
                8 tháng sau do Refurbest phụ trách.
              </p>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Thời gian xử lý bảo hành:</h4>
                <p className="text-gray-600">Từ 3–7 ngày làm việc tùy loại thiết bị và lỗi.</p>
              </div>
            </div>
          </section>

          {/* Return Policy */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                <RefreshCw className="w-8 h-8 text-green-600" />
                Chính sách Đổi trả
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {returnFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-green-50 rounded-2xl p-6 border border-green-100"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8 mt-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Điều kiện đổi trả:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Sản phẩm còn nguyên trạng như khi nhận</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Không có dấu hiệu can thiệp phần cứng/phần mềm</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Có đầy đủ phụ kiện/hóa đơn/bảo hành (nếu có)</span>
                </li>
              </ul>
            </motion.div>
          </section>

          {/* Shipping Policy */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                <Truck className="w-8 h-8 text-green-600" />
                Giao hàng & Vận chuyển
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {shippingFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-purple-50 rounded-2xl p-6 border border-purple-100"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8 mt-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Phí vận chuyển:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-green-600 mb-2">MIỄN PHÍ GIAO HÀNG</h4>
                  <p className="text-gray-600">Với đơn từ 5 triệu trở lên</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">PHÍ GIAO HÀNG</h4>
                  <p className="text-gray-600">Từ 30.000 – 50.000đ, tuỳ khu vực và hãng vận chuyển</p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Hướng dẫn mua hàng */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                Hướng dẫn mua hàng & Thanh toán
              </h2>
            </motion.div>

            <div className="space-y-6">
              {/* Bước 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Bước 1: Chọn sản phẩm</h3>
                    <p className="text-gray-700">Truy cập website Refurbest.vn, chọn sản phẩm và loại hàng (Loại 1-5) phù hợp với nhu cầu của bạn.</p>
                  </div>
                </div>
              </motion.div>

              {/* Bước 2 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Bước 2: Xác nhận đặt hàng</h3>
                    <p className="text-gray-700 mb-2">Nhấn nút "Mua ngay" hoặc "Thêm vào giỏ", sau đó nhập thông tin liên hệ: họ tên, email, số điện thoại, địa chỉ.</p>
                  </div>
                </div>
              </motion.div>

              {/* Bước 3 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-green-50 rounded-2xl p-6 border-2 border-green-200 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Bước 3: Xác nhận qua email (Tính năng độc đáo)</h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Trong vòng 5 phút</strong>, Refurbest sẽ gửi email chứa <strong>hình ảnh thật</strong> của sản phẩm (đúng mã hàng, đúng loại máy đã chọn).
                    </p>
                    <p className="text-gray-700">
                      Khách hàng có <strong>2 tiếng</strong> để xác nhận giữ đơn qua email hoặc nhấn nút "Xác nhận đơn hàng" trên website.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bước 4 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Bước 4: Giao hàng hoặc nhận tại cửa hàng</h3>
                    <p className="text-gray-700 mb-2">Sau khi xác nhận, Refurbest sẽ:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Đóng gói và gửi COD toàn quốc, hoặc</li>
                      <li>Hướng dẫn nhận tại showroom gần nhất</li>
                    </ul>
                    <div className="mt-3 bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Đơn vị vận chuyển:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200">GHTK</span>
                        <span className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200">Viettel Post</span>
                        <span className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200">J&T Express</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bước 5 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Bước 5: Thanh toán</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li><strong>COD khi nhận hàng</strong> - Kiểm tra hàng trước khi thanh toán</li>
                      <li><strong>Chuyển khoản trước</strong> theo hướng dẫn (nếu khách yêu cầu)</li>
                    </ul>
                    <div className="mt-3 bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="text-sm font-semibold text-green-800 mb-1">✓ Quyền kiểm tra hàng với COD:</p>
                      <p className="text-sm text-gray-700">Tất cả đơn hàng đều được phép mở kiểm tra ngoại hình, đúng máy, đúng mã hàng trước khi thanh toán. Không cho phép kiểm tra phần mềm hoặc dùng thử trước khi thanh toán.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                <Phone className="w-8 h-8 text-green-600" />
                Liên hệ hỗ trợ
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-green-50 rounded-2xl p-8 border border-green-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Hotline kỹ thuật</h3>
                </div>
                <p className="text-2xl font-bold text-green-600 mb-2">{settings.phone}</p>
                <p className="text-gray-600">Hỗ trợ 24/7 cho mọi vấn đề kỹ thuật</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-teal-50 rounded-2xl p-8 border border-teal-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Email hỗ trợ</h3>
                </div>
                <p className="text-xl font-bold text-teal-600 mb-2">{settings.email}</p>
                <p className="text-gray-600">Gửi yêu cầu hỗ trợ qua email</p>
              </motion.div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <Botchat />
    </div>
  );
}
