"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Botchat from "@/components/Botchat";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function QuyTrinhKiemDinhPage() {
  const gradeData = [
    {
      grade: "LOẠI 1",
      color: "bg-green-500",
      criteria: [
        { label: "NGUỒN", value: "✓ Thiết bị lên nguồn", status: "pass" },
        { label: "BẢO MẬT", value: "✓ Tắt tất cả tính năng bảo mật, đăng xuất tài khoản", status: "pass" },
        { label: "MÀN HÌNH", value: "✓ Hoạt động tốt, không sọc, không điểm chết", status: "pass" },
        { label: "CHỨC NĂNG", value: "✓ Đầy đủ chức năng", status: "pass" },
        { label: "MẶT KÍNH TRƯỚC", value: "✓ Không trầy xước", status: "pass" },
        { label: "MẶT KÍNH SAU", value: "✓ Không trầy xước", status: "pass" },
        { label: "KHUNG VIỀN", value: "✓ Không trầy xước", status: "pass" },
        { label: "PIN IPHONE/IPAD", value: "✓ Từ 87% trở lên", status: "pass" }
      ]
    },
    {
      grade: "LOẠI 2",
      color: "bg-green-500",
      criteria: [
        { label: "NGUỒN", value: "✓ Thiết bị lên nguồn", status: "pass" },
        { label: "BẢO MẬT", value: "✓ Tắt tất cả tính năng bảo mật", status: "pass" },
        { label: "MÀN HÌNH", value: "✓ Hoạt động tốt", status: "pass" },
        { label: "CHỨC NĂNG", value: "✓ Đầy đủ chức năng", status: "pass" },
        { label: "MẶT KÍNH TRƯỚC", value: "1-3 vết trầy nhẹ", status: "warning" },
        { label: "MẶT KÍNH SAU", value: "1-3 vết trầy nhẹ", status: "warning" },
        { label: "KHUNG VIỀN", value: "1-3 vết trầy nhẹ", status: "warning" }
      ]
    },
    {
      grade: "LOẠI 3",
      color: "bg-yellow-500",
      criteria: [
        { label: "NGUỒN", value: "✓ Thiết bị lên nguồn", status: "pass" },
        { label: "BẢO MẬT", value: "✓ Tắt tất cả tính năng bảo mật", status: "pass" },
        { label: "MÀN HÌNH", value: "✓ Hoạt động tốt", status: "pass" },
        { label: "CHỨC NĂNG", value: "✓ Đầy đủ chức năng", status: "pass" },
        { label: "MẶT KÍNH TRƯỚC", value: "Có > 3 vết xước", status: "warning" },
        { label: "MẶT KÍNH SAU", value: "Có > 3 vết xước", status: "warning" },
        { label: "KHUNG VIỀN", value: "Có > 3 vết xước", status: "warning" }
      ]
    },
    {
      grade: "LOẠI 4",
      color: "bg-orange-500",
      criteria: [
        { label: "NGUỒN", value: "✓ Thiết bị lên nguồn", status: "pass" },
        { label: "BẢO MẬT", value: "✓ Tắt tất cả tính năng bảo mật", status: "pass" },
        { label: "MÀN HÌNH", value: "✓ Hoạt động tốt", status: "pass" },
        { label: "CHỨC NĂNG", value: "✓ Đầy đủ chức năng", status: "pass" },
        { label: "MẶT KÍNH TRƯỚC", value: "Nứt, vỡ", status: "fail" },
        { label: "MẶT KÍNH SAU", value: "Nứt, vỡ, cấn, móp", status: "fail" },
        { label: "KHUNG VIỀN", value: "Nứt, vỡ, cấn, móp", status: "fail" }
      ]
    },
    {
      grade: "LOẠI 5",
      color: "bg-red-500",
      criteria: [
        { label: "BẢO MẬT", value: "✗ Bị khóa tài khoản, khóa nhà mạng", status: "fail" },
        { label: "MÀN HÌNH", value: "✗ Sọc, ám màu, chảy mực, liệt cảm ứng", status: "fail" },
        { label: "CHỨC NĂNG", value: "✗ Có lỗi chức năng", status: "fail" },
        { label: "MẶT KÍNH TRƯỚC", value: "Nứt, vỡ", status: "fail" },
        { label: "MẶT KÍNH SAU", value: "Nứt, vỡ, cấn, móp", status: "fail" },
        { label: "KHUNG VIỀN", value: "Nứt, vỡ, cấn, móp", status: "fail" }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    if (status === "pass") return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === "warning") return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

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
              Quy trình kiểm định & Phân loại
            </h1>
            <p className="text-xl text-white/90">
              Tiêu chuẩn đánh giá chất lượng thiết bị tân trang tại Refurbest
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="mb-12 text-center">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Mỗi thiết bị tại Refurbest được kiểm định kỹ lưỡng theo quy trình chuẩn và phân loại rõ ràng
              từ Loại 1 đến Loại 5 dựa trên tình trạng nguồn, bảo mật, màn hình, chức năng và ngoại hình.
            </p>
          </div>

          {/* Grading Table */}
          <div className="space-y-8">
            {gradeData.map((grade, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              >
                <div className={`${grade.color} px-6 py-4`}>
                  <h3 className="text-2xl font-bold text-white">{grade.grade}</h3>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {grade.criteria.map((criterion, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {getStatusIcon(criterion.status)}
                        <div>
                          <span className="font-semibold text-gray-900">{criterion.label}:</span>
                          <span className="ml-2 text-gray-700">{criterion.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Not Accepted Criteria */}
          <div className="mt-12 bg-red-50 rounded-2xl p-8 border border-red-200">
            <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6" />
              CÁC TIÊU CHÍ KHÔNG THU MUA
            </h3>
            <ul className="space-y-2 text-red-700">
              <li className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Thiết bị không lên nguồn, màn hình nhấp nháy, chập chờn
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Treo logo, treo màn hình (xanh, đỏ,...)
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
      <Botchat />
    </div>
  );
}

