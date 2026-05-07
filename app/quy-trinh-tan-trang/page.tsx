"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Botchat from "@/components/Botchat";
import { motion } from "framer-motion";
import { CheckCircle, Search, Wrench, Shield, Package, Truck } from "lucide-react";
import { useRefurbishmentProcessSettings } from "@/lib/hooks/useRefurbishmentProcessSettings";

export default function QuyTrinhTanTrangPage() {
  const { settings } = useRefurbishmentProcessSettings();

  const iconMap: Record<string, any> = {
    Search,
    Wrench,
    Shield,
    CheckCircle,
    Package,
    Truck
  };

  const processSteps = settings?.process_steps || [
    {
      icon: "Search",
      title: "1. Kiểm tra ban đầu",
      description: "Kiểm tra nguồn, bảo mật, tài khoản. Đảm bảo thiết bị lên nguồn và đã gỡ sạch tài khoản cũ (iCloud, FRP, Samsung account)."
    },
    {
      icon: "Wrench",
      title: "2. Kiểm định phần cứng",
      description: "Kiểm tra toàn diện 20+ bước: màn hình, pin, loa, camera, cảm biến, kết nối mạng, wifi, bluetooth, GPS..."
    },
    {
      icon: "Shield",
      title: "3. Thay thế linh kiện",
      description: "Thay thế linh kiện đạt tiêu chuẩn kỹ thuật của NSX nếu cần: pin, màn hình, camera... Chỉ dùng linh kiện chất lượng cao."
    },
    {
      icon: "CheckCircle",
      title: "4. Làm sạch & tân trang",
      description: "Vệ sinh toàn bộ máy, làm sạch bụi bẩn, dầu mỡ. Đánh bóng vỏ máy để trông như mới."
    },
    {
      icon: "Package",
      title: "5. Phân loại & đóng gói",
      description: "Phân loại theo 5 cấp độ (Loại 1-5) dựa trên tình trạng ngoại hình và chức năng. Đóng gói cẩn thận với phụ kiện đầy đủ."
    },
    {
      icon: "Truck",
      title: "6. Sẵn sàng giao hàng",
      description: "Thiết bị đã sẵn sàng để giao đến tay khách hàng. Kèm theo bảo hành 12 tháng và chính sách đổi trả 30 ngày."
    }
  ];

  const qualityChecks = settings?.quality_checks || [
    "Kiểm tra phần cứng: CPU, RAM, bộ nhớ",
    "Kiểm tra màn hình: độ sáng, màu sắc, cảm ứng",
    "Kiểm tra pin: dung lượng, chu kỳ sạc",
    "Kiểm tra camera: trước, sau, chất lượng ảnh",
    "Kiểm tra loa: âm thanh, micro",
    "Kiểm tra cảm biến: vân tay, Face ID, la bàn",
    "Kiểm tra kết nối: WiFi, Bluetooth, GPS, 4G/5G",
    "Kiểm tra cổng sạc: Lightning, USB-C",
    "Kiểm tra nút bấm: nguồn, âm lượng",
    "Kiểm tra rung: motor rung",
    "Kiểm tra đèn flash",
    "Kiểm tra tính năng chống nước (nếu có)",
    "Kiểm tra phần mềm: cập nhật iOS/Android",
    "Kiểm tra hiệu năng: benchmark, stress test",
    "Kiểm tra nhiệt độ: khi sử dụng nặng",
    "Kiểm tra thời lượng pin: test thực tế",
    "Kiểm tra sạc nhanh: tốc độ sạc",
    "Kiểm tra sạc không dây (nếu có)",
    "Kiểm tra NFC (nếu có)",
    "Kiểm tra tất cả ứng dụng hệ thống"
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
              {settings?.hero_title || "Quy trình tân trang máy"}
            </h1>
            <p className="text-xl text-white/90">
              {settings?.hero_subtitle || "Mỗi thiết bị được kiểm tra theo quy trình 20+ bước nghiêm ngặt"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Process Steps */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                6 bước quy trình tân trang
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Từ kiểm tra ban đầu đến sẵn sàng giao hàng, mỗi bước đều được thực hiện cẩn thận
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => {
                const IconComponent = iconMap[step.icon] || CheckCircle;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Quality Checks */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {settings?.quality_checks_title || "20+ điểm kiểm tra chất lượng"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {settings?.quality_checks_subtitle || "Mỗi thiết bị được kiểm tra kỹ lưỡng từ phần cứng đến phần mềm"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-50 rounded-2xl p-8 border border-green-200">
              <div className="grid md:grid-cols-2 gap-4">
                {qualityChecks.map((check, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Commitment */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-center text-white"
            >
              <h2 className="text-3xl font-bold mb-4">
                {settings?.commitment_title || "Cam kết chất lượng"}
              </h2>
              <p className="text-xl mb-6 text-white/90">
                {settings?.commitment_description || "Mỗi thiết bị được kiểm tra theo quy trình chuẩn – từ phần cứng đến phần mềm, đảm bảo hoạt động ổn định và bền bỉ"}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-lg">
                {(settings?.commitment_items || ["Bảo hành 12 tháng", "Đổi trả 30 ngày", "Hỗ trợ 24/7"]).map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />
      <Botchat />
    </div>
  );
}
