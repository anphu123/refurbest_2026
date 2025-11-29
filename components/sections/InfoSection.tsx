"use client";

import { ChevronDown } from "lucide-react";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function InfoSection() {
  const [expanded, setExpanded] = useState(false);

  const tocItems = [
    "Chọn hệ điều hành: iOS hay Android?",
    "Các thương hiệu điện thoại phổ biến",
    "Tiêu chí chọn mua điện thoại quan trọng",
    "Chọn điện thoại theo nhu cầu sử dụng",
    "Phân khúc giá điện thoại",
    "Các thông số kỹ thuật cần biết",
    "Phụ kiện điện thoại cần thiết",
    "Lưu ý khi mua và sử dụng điện thoại",
  ];

  const slugify = useCallback((s: string) => {
    return s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }, []);

  const handleScrollTo = useCallback(
    (id: string) => {
      const doScroll = () => {
        const el = document.getElementById(id);
        if (!el) return;
        const headerOffset = 110;
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      };
      if (!expanded) {
        setExpanded(true);
        setTimeout(doScroll, 350);
      } else {
        doScroll();
      }
    },
    [expanded]
  );

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Thông tin cần biết khi mua điện thoại
          </h2>

          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="mb-6">
              Điện thoại thông minh ngày nay là thiết bị không thể thiếu trong học tập, công việc và giải trí. Từ hiệu năng, camera cho đến thời lượng pin và hệ sinh thái, mỗi yếu tố đều ảnh hưởng lớn đến trải nghiệm sử dụng. Bài viết dưới đây sẽ giúp bạn có cái nhìn tổng quan để chọn chiếc điện thoại phù hợp với nhu cầu và ngân sách của mình.
            </p>

            {/* Table of Contents */}
            <div className="bg-green-50 rounded-lg p-6 mb-8 border border-green-200">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Nội dung chính</h3>
              <ol className="list-decimal list-inside space-y-2">
                {tocItems.map((item, index) => {
                  const id = slugify(item);
                  return (
                    <li
                      key={index}
                      onClick={() => handleScrollTo(id)}
                      className="text-gray-700 hover:text-green-500 cursor-pointer transition-colors"
                    >
                      {item}
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Content Preview */}
            <motion.div 
              className="relative overflow-hidden"
              animate={{
                maxHeight: expanded ? "5000px" : "500px"
              }}
              transition={{
                duration: 1,
                ease: "easeInOut"
              }}
            >
              <div className="space-y-8">
                <section id={slugify(tocItems[0])}>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Chọn hệ điều hành: iOS hay Android?</h3>
                  <p className="mb-4">
                    Đây là quyết định quan trọng đầu tiên. <strong>iOS (Apple)</strong> nổi tiếng với sự ổn định, hệ sinh thái đồng bộ và bảo mật cao. <strong>Android (Google)</strong> mang lại sự tùy biến linh hoạt, đa dạng về mẫu mã và mức giá.
                  </p>
                </section>

                <section id={slugify(tocItems[1])}>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Các thương hiệu điện thoại phổ biến</h3>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Apple (iPhone):</strong> Dẫn đầu phân khúc cao cấp, hiệu năng mạnh mẽ, camera xuất sắc.</li>
                    <li><strong>Samsung:</strong> Đa dạng từ phổ thông đến cao cấp, màn hình đẹp, nhiều tính năng sáng tạo.</li>
                    <li><strong>Xiaomi:</strong> Cấu hình cao so với giá, pin tốt, sạc nhanh.</li>
                    <li><strong>OPPO:</strong> Thiết kế thời trang, chuyên gia selfie, công nghệ sạc nhanh VOOC.</li>
                  </ul>
                </section>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: expanded ? 1 : 0,
                    height: expanded ? "auto" : 0
                  }}
                  transition={{
                    opacity: { duration: 0.8, ease: "easeInOut" },
                    height: { duration: 1, ease: "easeInOut" }
                  }}
                  className="space-y-8"
                  style={{ overflow: "hidden" }}
                >
                  <section id={slugify(tocItems[2])}>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Tiêu chí chọn mua điện thoại quan trọng</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-green-500">Màn hình</h4>
                        <p>Kích thước, độ phân giải (Full HD+, 2K+), công nghệ tấm nền (AMOLED cho màu sắc rực rỡ, IPS LCD cho màu sắc trung thực) và tần số quét (90Hz, 120Hz cho trải nghiệm mượt mà).</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-green-500">Hiệu năng (Chip & RAM)</h4>
                        <p>Chip Snapdragon của Qualcomm và Dimensity của MediaTek phổ biến trên Android. Chip A-series của Apple luôn dẫn đầu về hiệu năng. RAM 6GB trở lên là đủ cho hầu hết tác vụ.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-purple-600">Camera</h4>
                        <p>Đừng chỉ nhìn vào 'số chấm' (Megapixel). Chất lượng ảnh phụ thuộc vào cảm biến, ống kính và thuật toán xử lý. Hãy xem các bài đánh giá camera thực tế.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-orange-600">Pin và Sạc</h4>
                        <p>Dung lượng pin (mAh) càng cao càng tốt. Công nghệ sạc nhanh (25W, 67W, 120W) giúp tiết kiệm thời gian đáng kể.</p>
                      </div>
                    </div>
                  </section>

                  <section id={slugify(tocItems[3])}>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Chọn điện thoại theo nhu cầu sử dụng</h3>
                    <p className="mb-4"><strong>Chơi game:</strong> Cần chip mạnh, màn hình tần số quét cao, pin trâu. <strong>Chụp ảnh:</strong> Ưu tiên các dòng flagship của Apple, Samsung, Google hoặc các máy có hợp tác với hãng máy ảnh (Leica, Hasselblad). <strong>Sử dụng cơ bản:</strong> Các máy tầm trung của Samsung, Xiaomi, OPPO là lựa chọn hợp lý.</p>
                  </section>

                  <section id={slugify(tocItems[4])}>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Phân khúc giá điện thoại</h3>
                     <ul className="list-disc list-inside space-y-2 mb-4">
                        <li><strong>Phổ thông (dưới 7 triệu):</strong> Đáp ứng tốt nhu cầu cơ bản như nghe gọi, lướt web, mạng xã hội.</li>
                        <li><strong>Tầm trung (7 - 15 triệu):</strong> Cân bằng giữa hiệu năng, camera và thiết kế. Phù hợp với đa số người dùng.</li>
                        <li><strong>Cao cấp (trên 15 triệu):</strong> Hiệu năng đỉnh cao, camera chuyên nghiệp, thiết kế sang trọng và những công nghệ mới nhất.</li>
                     </ul>
                  </section>

                  <section id={slugify(tocItems[5])}>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Các thông số kỹ thuật cần biết</h3>
                    <p className="mb-4"><strong>Bộ nhớ trong (ROM):</strong> Nên chọn từ 128GB trở lên. <strong>Kết nối:</strong> 5G, Wi-Fi 6, Bluetooth 5.x là các chuẩn mới nhất. <strong>Kháng nước, bụi:</strong> Chuẩn IP67, IP68 giúp bảo vệ máy tốt hơn.</p>
                  </section>

                  <section id={slugify(tocItems[6])}>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Phụ kiện điện thoại cần thiết</h3>
                    <p className="mb-4">Ốp lưng và kính cường lực để bảo vệ máy. Sạc dự phòng cho những chuyến đi dài. Tai nghe không dây để trải nghiệm âm thanh tốt hơn.</p>
                  </section>

                  <section id={slugify(tocItems[7])}>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Lưu ý khi mua và sử dụng điện thoại</h3>
                    <p className="mb-4">Kiểm tra kỹ máy trước khi nhận, giữ lại hộp và hóa đơn để bảo hành. Cập nhật phần mềm thường xuyên và không cài đặt ứng dụng từ nguồn không rõ để đảm bảo an toàn.</p>
                  </section>
                </motion.div>
              </div>

              {/* Gradient fade overlay khi collapsed - hiệu ứng mờ dần */}
              <motion.div 
                initial={false}
                animate={{
                  opacity: expanded ? 0 : 1
                }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none"
              />
            </motion.div>

            {/* Xem thêm button */}
            <div className="text-center mt-6">
              <motion.button
                onClick={() => setExpanded(!expanded)}
                className="text-green-500 hover:text-green-600 font-semibold flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              >
                {expanded ? 'Thu gọn' : 'Xem thêm'}
                <motion.div
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

