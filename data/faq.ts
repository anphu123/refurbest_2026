import { Package, ShoppingCart, CreditCard, Shield, Info } from "lucide-react";

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  icon: any;
  color: string;
  questions: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    category: "Về sản phẩm",
    icon: Package,
    color: "blue",
    questions: [
      {
        q: "Thiết bị Refurbish là gì?",
        a: "Là thiết bị chính hãng được tân trang lại (refurbished) bởi hãng hoặc đối tác uỷ quyền – được kiểm định kỹ, thay linh kiện nếu cần và đạt chuẩn chất lượng như máy mới. Nhiều máy vẫn còn bảo hành chính hãng, không phải hàng cũ thông thường."
      },
      {
        q: "Có khác gì hàng cũ thông thường không?",
        a: "Có. Hàng refurbish là thiết bị được hãng kiểm tra, thay thế linh kiện chuẩn và thường còn bảo hành. Hàng cũ phổ thông là hàng qua tay người dùng, không có kiểm định hoặc bảo hành rõ ràng."
      },
      {
        q: "Máy refurbish dùng có ổn định như máy mới không?",
        a: "Có. Thiết bị được kiểm tra toàn diện, đảm bảo hoạt động mượt mà, bền bỉ."
      },
      {
        q: "Pin còn bao nhiêu %?",
        a: "Pin luôn đảm bảo từ 80–100%. Loại A+ thường trên 87%. Có thể thay pin mới nếu yêu cầu."
      },
      {
        q: "Phân loại ngoại hình thế nào?",
        a: "Refurbest chia làm 5 loại: Loại 1 (A+): Như mới, không trầy, pin cao. Loại 2 (A): Xước nhẹ, pin trung bình. Loại 3 (B): Trầy rõ, ngoại hình kém hơn nhưng vẫn dùng tốt. Loại 4: Móp, nứt nhẹ, có thể lỗi phụ. Loại 5: Lỗi chức năng hoặc vỡ – bán cho kỹ thuật, linh kiện."
      },
      {
        q: "Có kèm phụ kiện gì không?",
        a: "Có sạc và cáp (zin hoặc loại tốt), không bao gồm hộp hoặc tai nghe trừ khi có ghi rõ."
      },
      {
        q: "Chọn được màu hoặc cấu hình không?",
        a: "Có. Tùy mẫu máy, khách có thể chọn màu/cấu hình trong tùy chọn khi đặt hàng."
      },
      {
        q: "Còn bảo hành chính hãng thì sao?",
        a: "Chúng tôi bảo hành phần còn lại sau khi hết hạn bảo hành hãng, tổng thời gian đủ 12 tháng."
      },
      {
        q: "Có bị dính iCloud/FRP không?",
        a: "Không. Chúng tôi chỉ bán thiết bị đã gỡ sạch toàn bộ tài khoản cũ."
      },
      {
        q: "Đã thay linh kiện chưa?",
        a: "Nếu có thay, sẽ ghi rõ trong mô tả và chỉ dùng linh kiện đạt chuẩn."
      }
    ]
  },
  {
    category: "Về mua hàng",
    icon: ShoppingCart,
    color: "green",
    questions: [
      {
        q: "Làm sao để đặt hàng?",
        a: "Chọn sản phẩm → chọn loại hàng → điền thông tin → nhận ảnh thật qua email → xác nhận giữ đơn trong 2 giờ."
      },
      {
        q: "Bao lâu nhận được ảnh thật?",
        a: "Trong vòng 5 phút sau khi đặt đơn."
      },
      {
        q: "Không ưng ảnh thật thì sao?",
        a: "Bạn có quyền từ chối, không bắt buộc phải mua."
      },
      {
        q: "Giữ máy rồi thanh toán sau được không?",
        a: "Có. Sau khi xác nhận giữ máy qua email hoặc web, chúng tôi mới tiến hành giao hàng."
      },
      {
        q: "Có showroom không?",
        a: "Có. Bạn có thể đặt online và đến showroom lấy máy."
      }
    ]
  },
  {
    category: "Về thanh toán",
    icon: CreditCard,
    color: "purple",
    questions: [
      {
        q: "Có thanh toán COD không?",
        a: "Có, hỗ trợ toàn quốc."
      },
      {
        q: "Chuyển khoản trước được không?",
        a: "Có. Bạn sẽ nhận được thông tin tài khoản sau khi xác nhận đơn."
      },
      {
        q: "Hỗ trợ Momo/VNPay không?",
        a: "Sắp triển khai. Hiện ưu tiên COD và chuyển khoản."
      },
      {
        q: "Lỡ đặt nhầm đơn thì sao?",
        a: "Bạn có thể huỷ bằng cách phản hồi email hoặc gọi hotline."
      },
      {
        q: "Có tính phí giao hàng không?",
        a: "Miễn phí với đơn từ 5 triệu. Dưới đó phí từ 30–50K tuỳ khu vực."
      }
    ]
  },
  {
    category: "Bảo hành – đổi trả",
    icon: Shield,
    color: "orange",
    questions: [
      {
        q: "Tất cả đều được bảo hành 12 tháng?",
        a: "Đúng. Bao gồm cả phần còn lại sau bảo hành hãng."
      },
      {
        q: "Lỗi có được đổi máy khác không?",
        a: "Có, trong 30 ngày nếu lỗi kỹ thuật. Sau đó sẽ sửa theo bảo hành."
      },
      {
        q: "Bảo hành mất bao lâu?",
        a: "3–7 ngày làm việc tuỳ lỗi và loại thiết bị."
      },
      {
        q: "Có hỗ trợ kỹ thuật online không?",
        a: "Có qua Zalo, điện thoại và email 24/7."
      },
      {
        q: "Hết bảo hành rồi thì sao?",
        a: "Bạn vẫn được sửa chữa tính phí với mức giá ưu đãi tại Refurbest."
      }
    ]
  },
  {
    category: "Khác",
    icon: Info,
    color: "teal",
    questions: [
      {
        q: "Có thu mua máy cũ không?",
        a: "Có. Bạn gửi thông tin và ảnh để chúng tôi định giá."
      },
      {
        q: "Có trả góp không?",
        a: "Đang phát triển dịch vụ này. Sẽ cập nhật khi triển khai."
      },
      {
        q: "Mua số lượng lớn có giá sỉ không?",
        a: "Có chính sách riêng cho đại lý và cộng tác viên."
      },
      {
        q: "Thông tin của tôi có được bảo mật không?",
        a: "Có. Chúng tôi tuân thủ luật bảo vệ dữ liệu cá nhân."
      },
      {
        q: "Mua ở đây có giúp bảo vệ môi trường không?",
        a: "Có. Bạn góp phần giảm rác thải điện tử và tiêu dùng bền vững."
      }
    ]
  }
];
