-- =====================================================
-- SEED DATA - THÊM DỮ LIỆU MẪU
-- Chạy sau schema và admin setup
-- =====================================================

-- 1. Categories
INSERT INTO categories (id, name, slug, icon) VALUES
  ('iphone', 'iPhone', 'iphone', 'Wind'),
  ('samsung', 'Samsung', 'samsung', 'Zap'),
  ('xiaomi', 'Xiaomi', 'xiaomi', 'Shield'),
  ('oppo', 'Oppo', 'oppo', 'Sun'),
  ('cao-cap', 'Cao cấp (>20tr)', 'cao-cap', 'Home'),
  ('trung-cap', 'Trung cấp (10-20tr)', 'trung-cap', 'Home'),
  ('pho-thong', 'Phổ thông (<10tr)', 'pho-thong', 'Home'),
  ('dien-thoai-thong-minh', 'Điện thoại thông minh', 'dien-thoai-thong-minh', 'Activity'),
  ('dien-thoai-gia-re', 'Giá rẻ', 'dien-thoai-gia-re', 'Leaf'),
  ('may-loc-khong-khi-cao-cap', 'Cao cấp', 'may-loc-khong-khi-cao-cap', 'Sparkles'),
  ('bo-loc-thay-the', 'Bộ lọc thay thế', 'bo-loc-thay-the', 'Filter'),
  ('phu-kien-may-loc', 'Phụ kiện', 'phu-kien-may-loc', 'AirVent')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  icon = EXCLUDED.icon,
  updated_at = NOW();

-- 7. FAQs
INSERT INTO faqs (id, question, answer, order_index) VALUES
  ('faq-1', 'Điện thoại có giao hàng nhanh 2H không?', 'Có. Chúng tôi hỗ trợ giao hàng hỏa tốc trong 2H cho khu vực nội thành TP.HCM. Đơn hàng từ 500K được miễn phí vận chuyển.', 1),
  ('faq-2', 'Bảo hành điện thoại tại cửa hàng thế nào?', 'Tất cả điện thoại đều được bảo hành chính hãng 12 tháng tùy theo từng thương hiệu. Chúng tôi cam kết hỗ trợ bảo hành nhanh chóng và chu đáo.', 2),
  ('faq-3', 'Mua điện thoại được ưu đãi những gì?', 'Khách hàng được hưởng nhiều ưu đãi: Giảm giá trực tiếp, trả góp 0%, thu cũ đổi mới, tặng voucher, miễn phí vận chuyển. Đặc biệt có chương trình khuyến mãi định kỳ với mức giảm lên đến 30%.', 3),
  ('faq-4', 'Mua điện thoại ở đâu chính hãng, giá rẻ?', 'Chúng tôi là địa chỉ uy tín tại TP.HCM chuyên về điện thoại. Cam kết 100% hàng chính hãng, giá cạnh tranh nhất thị trường, chính sách bảo hành và đổi trả linh hoạt.', 4),
  ('faq-5', 'Điện thoại nào phù hợp với sinh viên?', 'Với sinh viên, nên chọn điện thoại tầm trung có hiệu năng tốt, pin trâu. Các dòng phù hợp: iPhone 13, Samsung Galaxy A54, Xiaomi Redmi Note 12 Pro.', 5),
  ('faq-6', 'Bảo hành điện thoại như thế nào?', 'Tất cả điện thoại đều có bảo hành chính hãng 12 tháng. Bảo hành 1 đổi 1 trong 30 ngày đầu nếu có lỗi từ nhà sản xuất.', 6)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  answer = EXCLUDED.answer,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

-- 2. Products (điện thoại)
INSERT INTO products (id, name, description, price, original_price, discount, image, category, brand, rating, reviews, badge, stock, status) VALUES
  ('p1', 'iPhone 15 128GB', NULL, 18990000, 21990000, 14, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1080&auto=format&fit=crop', 'iphone', 'Apple', 4.9, 1200, 'hot', 30, 'active'),
  ('p2', 'iPhone 15 Pro Max 256GB', NULL, 30990000, 33990000, 9, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1080&auto=format&fit=crop', 'iphone', 'Apple', 4.9, 980, 'new', 20, 'active'),
  ('p3', 'Samsung Galaxy S24 256GB', NULL, 19990000, 21990000, 9, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1080&auto=format&fit=crop', 'samsung', 'Samsung', 4.8, 860, 'hot', 35, 'active'),
  ('p4', 'Samsung Galaxy S24 Ultra 256GB', NULL, 26990000, 29990000, 10, 'https://images.unsplash.com/photo-1520451644838-906a72aa7abf?q=80&w=1080&auto=format&fit=crop', 'samsung', 'Samsung', 4.9, 640, 'hot', 18, 'active'),
  ('p5', 'Xiaomi 14 256GB', NULL, 16990000, 18990000, 11, 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1080&auto=format&fit=crop', 'xiaomi', 'Xiaomi', 4.7, 520, NULL, 40, 'active'),
  ('p6', 'Xiaomi Redmi Note 13 Pro 8GB/256GB', NULL, 8990000, 10990000, 18, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1080&auto=format&fit=crop', 'xiaomi', 'Xiaomi', 4.6, 740, 'sale', 55, 'active'),
  ('p7', 'OPPO Find X7 256GB', NULL, 19990000, 21990000, 9, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1080&auto=format&fit=crop', 'oppo', 'OPPO', 4.7, 310, 'new', 22, 'active'),
  ('p8', 'OPPO Reno 12 8GB/256GB', NULL, 9990000, 11990000, 17, 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1080&auto=format&fit=crop', 'oppo', 'OPPO', 4.6, 455, 'sale', 48, 'active'),
  ('p9', 'iPhone 14 128GB', NULL, 14990000, 17990000, 17, 'https://images.unsplash.com/photo-1518444994481-41e56f87c2fb?q=80&w=1080&auto=format&fit=crop', 'iphone', 'Apple', 4.8, 1500, NULL, 60, 'active'),
  ('p10', 'iPhone 13 128GB', NULL, 11990000, 14990000, 20, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1080&auto=format&fit=crop', 'iphone', 'Apple', 4.8, 2200, 'sale', 80, 'active'),
  ('p11', 'Samsung Galaxy A55 5G 8GB/256GB', NULL, 9990000, 11990000, 17, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1080&auto=format&fit=crop', 'samsung', 'Samsung', 4.6, 730, NULL, 70, 'active'),
  ('p12', 'Samsung Galaxy A35 5G 8GB/256GB', NULL, 8490000, 9990000, 15, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1080&auto=format&fit=crop', 'samsung', 'Samsung', 4.5, 520, NULL, 75, 'active'),
  ('p13', 'Xiaomi Redmi 13C 6GB/128GB', NULL, 3290000, 3990000, 18, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1080&auto=format&fit=crop', 'xiaomi', 'Xiaomi', 4.4, 1100, 'hot', 120, 'active'),
  ('p14', 'OPPO A79 8GB/256GB', NULL, 6290000, 6990000, 10, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1080&auto=format&fit=crop', 'oppo', 'OPPO', 4.5, 410, NULL, 85, 'active'),
  ('p15', 'iPhone SE (2022) 64GB', NULL, 8990000, 10990000, 18, 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1080&auto=format&fit=crop', 'iphone', 'Apple', 4.6, 260, NULL, 25, 'active')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  discount = EXCLUDED.discount,
  image = EXCLUDED.image,
  category = EXCLUDED.category,
  brand = EXCLUDED.brand,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  badge = EXCLUDED.badge,
  stock = EXCLUDED.stock,
  status = EXCLUDED.status,
  updated_at = NOW();

-- 3. Sample coupons
INSERT INTO coupons (id, code, name, description, discount_type, discount_value, min_purchase, usage_limit, valid_from, valid_until, status) VALUES
  ('cpn_001', 'WELCOME10', 'Giảm 10% cho khách hàng mới', 'Giảm 10% cho đơn hàng đầu tiên', 'percentage', 10.00, 500000, 1000, NOW(), NOW() + INTERVAL '6 months', 'active'),
  ('cpn_002', 'FREESHIP', 'Miễn phí vận chuyển', 'Miễn phí ship cho đơn từ 1 triệu', 'fixed', 0.00, 1000000, NULL, NOW(), NOW() + INTERVAL '1 year', 'active'),
  ('cpn_003', 'SALE50K', 'Giảm 50.000đ', 'Giảm ngay 50.000đ cho đơn từ 500k', 'fixed', 50000.00, 500000, 500, NOW(), NOW() + INTERVAL '3 months', 'active')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  discount_type = EXCLUDED.discount_type,
  discount_value = EXCLUDED.discount_value,
  min_purchase = EXCLUDED.min_purchase,
  max_discount = EXCLUDED.max_discount,
  usage_limit = EXCLUDED.usage_limit,
  valid_from = EXCLUDED.valid_from,
  valid_until = EXCLUDED.valid_until,
  status = EXCLUDED.status,
  updated_at = NOW();

