-- =====================================================
-- RESET PRODUCTS WITH BATTERY HEALTH DATA
-- =====================================================

-- Delete all existing products and variants
DELETE FROM product_variants;
DELETE FROM products;

-- Ensure categories exist
INSERT INTO categories (id, name, slug, icon) VALUES
  ('iphone', 'iPhone', 'iphone', 'Smartphone'),
  ('samsung', 'Samsung', 'samsung', 'Smartphone'),
  ('xiaomi', 'Xiaomi', 'xiaomi', 'Smartphone'),
  ('cao-cap', 'Cao cấp (>20tr)', 'cao-cap', 'TrendingUp'),
  ('trung-cap', 'Trung cấp (10-20tr)', 'trung-cap', 'Minus'),
  ('pho-thong', 'Phổ thông (<10tr)', 'pho-thong', 'TrendingDown')
ON CONFLICT (id) DO NOTHING;

-- Insert 10 sample products with proper data
INSERT INTO products (id, name, brand, category, image, images, description, specifications, status) VALUES
-- iPhone 13
('iphone-13-128gb', 'iPhone 13 128GB', 'Apple', 'iphone', 
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'iPhone 13 với chip A15 Bionic mạnh mẽ, camera kép 12MP, màn hình Super Retina XDR 6.1 inch. Thiết bị tân trang chính hãng, bảo hành 12 tháng.',
 '[{"key":"Màn hình","value":"6.1 inch Super Retina XDR"},{"key":"Chip","value":"Apple A15 Bionic"},{"key":"Camera","value":"Camera kép 12MP"},{"key":"Pin","value":"3240 mAh"}]',
 'active'),

-- iPhone 14 Pro
('iphone-14-pro-256gb', 'iPhone 14 Pro 256GB', 'Apple', 'iphone',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'iPhone 14 Pro với Dynamic Island, chip A16 Bionic, camera 48MP. Màn hình ProMotion 120Hz, thiết kế cao cấp.',
 '[{"key":"Màn hình","value":"6.1 inch ProMotion 120Hz"},{"key":"Chip","value":"Apple A16 Bionic"},{"key":"Camera","value":"Camera chính 48MP"},{"key":"Pin","value":"3200 mAh"}]',
 'active'),

-- Samsung Galaxy S23
('samsung-s23-128gb', 'Samsung Galaxy S23 128GB', 'Samsung', 'samsung',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'Samsung Galaxy S23 với chip Snapdragon 8 Gen 2, camera 50MP, màn hình Dynamic AMOLED 2X 6.1 inch 120Hz.',
 '[{"key":"Màn hình","value":"6.1 inch Dynamic AMOLED 2X 120Hz"},{"key":"Chip","value":"Snapdragon 8 Gen 2"},{"key":"Camera","value":"Camera chính 50MP"},{"key":"Pin","value":"3900 mAh"}]',
 'active'),

-- Samsung Galaxy A54
('samsung-a54-128gb', 'Samsung Galaxy A54 5G 128GB', 'Samsung', 'samsung',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'Samsung Galaxy A54 5G với camera 50MP OIS, màn hình Super AMOLED 120Hz, pin 5000mAh. Giá tốt, hiệu năng ổn định.',
 '[{"key":"Màn hình","value":"6.4 inch Super AMOLED 120Hz"},{"key":"Chip","value":"Exynos 1380"},{"key":"Camera","value":"Camera chính 50MP OIS"},{"key":"Pin","value":"5000 mAh"}]',
 'active'),

-- Xiaomi Redmi Note 12
('xiaomi-note-12-128gb', 'Xiaomi Redmi Note 12 128GB', 'Xiaomi', 'xiaomi',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'Xiaomi Redmi Note 12 với màn hình AMOLED 120Hz, camera 50MP, pin 5000mAh. Hiệu năng tốt trong tầm giá.',
 '[{"key":"Màn hình","value":"6.67 inch AMOLED 120Hz"},{"key":"Chip","value":"Snapdragon 685"},{"key":"Camera","value":"Camera chính 50MP"},{"key":"Pin","value":"5000 mAh"}]',
 'active'),

-- MacBook Air M1
('macbook-air-m1-256gb', 'MacBook Air M1 256GB', 'Apple', 'cao-cap',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'MacBook Air M1 với chip Apple M1 mạnh mẽ, màn hình Retina 13.3 inch, pin 18 giờ. Mỏng nhẹ, hiệu năng vượt trội.',
 '[{"key":"Màn hình","value":"13.3 inch Retina IPS"},{"key":"Chip","value":"Apple M1 8 nhân"},{"key":"RAM","value":"8GB"},{"key":"Ổ cứng","value":"256GB SSD"}]',
 'active'),

-- MacBook Pro M2
('macbook-pro-m2-512gb', 'MacBook Pro M2 13 inch 512GB', 'Apple', 'cao-cap',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'MacBook Pro M2 13 inch với chip M2 thế hệ mới, Touch Bar, pin 20 giờ. Hiệu năng cao cho công việc chuyên nghiệp.',
 '[{"key":"Màn hình","value":"13.3 inch Retina IPS"},{"key":"Chip","value":"Apple M2 8 nhân"},{"key":"RAM","value":"8GB"},{"key":"Ổ cứng","value":"512GB SSD"}]',
 'active'),

-- iPad Air 5
('ipad-air-5-64gb', 'iPad Air 5 WiFi 64GB', 'Apple', 'trung-cap',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'iPad Air 5 với chip M1, màn hình Liquid Retina 10.9 inch, hỗ trợ Apple Pencil 2. Mỏng nhẹ, hiệu năng mạnh mẽ.',
 '[{"key":"Màn hình","value":"10.9 inch Liquid Retina"},{"key":"Chip","value":"Apple M1"},{"key":"Camera","value":"Camera sau 12MP"},{"key":"Pin","value":"7606 mAh"}]',
 'active'),

-- Apple Watch Series 8
('apple-watch-s8-41mm', 'Apple Watch Series 8 41mm', 'Apple', 'trung-cap',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'Apple Watch Series 8 với cảm biến nhiệt độ, theo dõi sức khỏe toàn diện, màn hình Always-On Retina. Chống nước 50m.',
 '[{"key":"Màn hình","value":"1.69 inch OLED Always-On"},{"key":"Chip","value":"Apple S8"},{"key":"Kết nối","value":"Bluetooth 5.3"},{"key":"Pin","value":"18 giờ"}]',
 'active'),

-- AirPods Pro 2
('airpods-pro-2', 'AirPods Pro 2 USB-C', 'Apple', 'pho-thong',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'AirPods Pro 2 với chip H2, chống ồn chủ động 2x tốt hơn, âm thanh Adaptive, hộp sạc USB-C. Pin 6 giờ.',
 '[{"key":"Kết nối","value":"Bluetooth 5.3"},{"key":"Chip","value":"Apple H2"},{"key":"Chống ồn","value":"ANC 2x tốt hơn"},{"key":"Pin","value":"6 giờ (30 giờ với hộp)"}]',
 'active'),

-- Oppo Reno 10
('oppo-reno-10-256gb', 'Oppo Reno 10 5G 256GB', 'Oppo', 'trung-cap',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'Oppo Reno 10 5G với camera 64MP, màn hình AMOLED 120Hz, sạc nhanh 67W. Thiết kế mỏng nhẹ, hiệu năng tốt.',
 '[{"key":"Màn hình","value":"6.7 inch AMOLED 120Hz"},{"key":"Chip","value":"MediaTek Dimensity 7050"},{"key":"Camera","value":"Camera chính 64MP"},{"key":"Pin","value":"5000 mAh"}]',
 'active'),

-- Vivo V29
('vivo-v29-256gb', 'Vivo V29 5G 256GB', 'Vivo', 'trung-cap',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'Vivo V29 5G với camera selfie 50MP, màn hình AMOLED cong 120Hz, sạc nhanh 80W. Thiết kế đẹp, chụp ảnh sắc nét.',
 '[{"key":"Màn hình","value":"6.78 inch AMOLED 120Hz"},{"key":"Chip","value":"Snapdragon 778G"},{"key":"Camera","value":"Camera chính 50MP OIS"},{"key":"Pin","value":"4600 mAh"}]',
 'active'),

-- Realme 11 Pro
('realme-11-pro-256gb', 'Realme 11 Pro 5G 256GB', 'Realme', 'pho-thong',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'Realme 11 Pro 5G với camera 100MP, màn hình AMOLED cong 120Hz, sạc nhanh 67W. Giá tốt, cấu hình mạnh.',
 '[{"key":"Màn hình","value":"6.7 inch AMOLED 120Hz"},{"key":"Chip","value":"MediaTek Dimensity 7050"},{"key":"Camera","value":"Camera chính 100MP"},{"key":"Pin","value":"5000 mAh"}]',
 'active'),

-- Nokia G60
('nokia-g60-128gb', 'Nokia G60 5G 128GB', 'Nokia', 'pho-thong',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'Nokia G60 5G với camera 50MP, màn hình 120Hz, pin 4500mAh. Android thuần, bền bỉ, giá phải chăng.',
 '[{"key":"Màn hình","value":"6.58 inch IPS 120Hz"},{"key":"Chip","value":"Snapdragon 695"},{"key":"Camera","value":"Camera chính 50MP"},{"key":"Pin","value":"4500 mAh"}]',
 'active'),

-- Asus ROG Phone 7
('asus-rog-7-256gb', 'Asus ROG Phone 7 256GB', 'Asus', 'cao-cap',
 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg',
 ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-2.jpg'],
 'Asus ROG Phone 7 với chip Snapdragon 8 Gen 2, màn hình AMOLED 165Hz, pin 6000mAh. Gaming phone mạnh nhất.',
 '[{"key":"Màn hình","value":"6.78 inch AMOLED 165Hz"},{"key":"Chip","value":"Snapdragon 8 Gen 2"},{"key":"Camera","value":"Camera chính 50MP"},{"key":"Pin","value":"6000 mAh"}]',
 'active');

-- Insert variants for each product
INSERT INTO product_variants (product_id, price, original_price, stock, attributes, battery_health, images) VALUES
-- iPhone 13 variants
('iphone-13-128gb', 14990000, 19990000, 5, '{"Dung lượng":"128GB","Màu":"Xanh Lá","Tình trạng":"Loại 1 (A+)"}', 92, ARRAY['https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-xanh-la-1.jpg']),
('iphone-13-128gb', 14490000, 19990000, 3, '{"Dung lượng":"128GB","Màu":"Hồng","Tình trạng":"Loại 2 (A)"}', 85, ARRAY['https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-hong-1.jpg']),
('iphone-13-128gb', 15990000, 19990000, 4, '{"Dung lượng":"256GB","Màu":"Đen","Tình trạng":"Loại 1 (A+)"}', 90, ARRAY['https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-den-1.jpg']),

-- iPhone 14 Pro variants
('iphone-14-pro-256gb', 24990000, 32990000, 3, '{"Dung lượng":"256GB","Màu":"Tím","Tình trạng":"Loại 1 (A+)"}', 95, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']),
('iphone-14-pro-256gb', 26990000, 32990000, 2, '{"Dung lượng":"512GB","Màu":"Đen","Tình trạng":"Loại 1 (A+)"}', 93, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-den-1.jpg']),

-- Samsung S23 variants
('samsung-s23-128gb', 12990000, 16990000, 6, '{"Dung lượng":"128GB","Màu":"Xanh Lá","Tình trạng":"Loại 1 (A+)"}', 88, ARRAY['https://cdn.tgdd.vn/Products/Images/42/301608/samsung-galaxy-s23-xanh-1.jpg']),
('samsung-s23-128gb', 14490000, 16990000, 4, '{"Dung lượng":"256GB","Màu":"Kem","Tình trạng":"Loại 1 (A+)"}', 91, ARRAY['https://cdn.tgdd.vn/Products/Images/42/301608/samsung-galaxy-s23-kem-1.jpg']),

-- Samsung A54 variants
('samsung-a54-128gb', 6990000, 8990000, 8, '{"Dung lượng":"128GB","Màu":"Xanh Lá","Tình trạng":"Loại 1 (A+)"}', 87, ARRAY['https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-a54-5g-xanh-1.jpg']),
('samsung-a54-128gb', 7990000, 8990000, 5, '{"Dung lượng":"256GB","Màu":"Tím","Tình trạng":"Loại 1 (A+)"}', 89, ARRAY['https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-a54-5g-tim-1.jpg']),

-- Xiaomi Note 12 variants
('xiaomi-note-12-128gb', 4490000, 5990000, 10, '{"Dung lượng":"128GB","Màu":"Xanh Dương","Tình trạng":"Loại 1 (A+)"}', 90, ARRAY['https://cdn.tgdd.vn/Products/Images/42/309816/xiaomi-redmi-note-12-xanh-duong-1.jpg']),
('xiaomi-note-12-128gb', 4990000, 5990000, 7, '{"Dung lượng":"256GB","Màu":"Đen","Tình trạng":"Loại 1 (A+)"}', 88, ARRAY['https://cdn.tgdd.vn/Products/Images/42/309816/xiaomi-redmi-note-12-den-1.jpg']),

-- MacBook Air M1 variants
('macbook-air-m1-256gb', 16990000, 24990000, 4, '{"Dung lượng":"256GB","RAM":"8GB","Màu":"Xám","Tình trạng":"Loại 1 (A+)"}', 92, ARRAY['https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gray-1.jpg']),
('macbook-air-m1-256gb', 19990000, 24990000, 3, '{"Dung lượng":"512GB","RAM":"8GB","Màu":"Vàng","Tình trạng":"Loại 1 (A+)"}', 90, ARRAY['https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gold-1.jpg']),

-- MacBook Pro M2 variants
('macbook-pro-m2-512gb', 28990000, 35990000, 2, '{"Dung lượng":"512GB","RAM":"8GB","Màu":"Xám","Tình trạng":"Loại 1 (A+)"}', 94, ARRAY['https://cdn.tgdd.vn/Products/Images/44/289441/macbook-pro-13-inch-m2-2022-xam-1.jpg']),
('macbook-pro-m2-512gb', 32990000, 35990000, 2, '{"Dung lượng":"512GB","RAM":"16GB","Màu":"Bạc","Tình trạng":"Loại 1 (A+)"}', 95, ARRAY['https://cdn.tgdd.vn/Products/Images/44/289441/macbook-pro-13-inch-m2-2022-bac-1.jpg']),

-- iPad Air 5 variants
('ipad-air-5-64gb', 11990000, 14990000, 5, '{"Dung lượng":"64GB","Màu":"Xanh Dương","Tình trạng":"Loại 1 (A+)"}', 91, ARRAY['https://cdn.tgdd.vn/Products/Images/522/247517/ipad-air-5-xanh-duong-1.jpg']),
('ipad-air-5-64gb', 13990000, 14990000, 4, '{"Dung lượng":"256GB","Màu":"Hồng","Tình trạng":"Loại 1 (A+)"}', 89, ARRAY['https://cdn.tgdd.vn/Products/Images/522/247517/ipad-air-5-hong-1.jpg']),

-- Apple Watch S8 variants
('apple-watch-s8-41mm', 7990000, 10990000, 6, '{"Kích thước":"41mm","Màu":"Đen","Tình trạng":"Loại 1 (A+)"}', 88, ARRAY['https://cdn.tgdd.vn/Products/Images/7077/289644/apple-watch-s8-41mm-vien-nhom-day-cao-su-1.jpg']),
('apple-watch-s8-41mm', 8490000, 10990000, 4, '{"Kích thước":"45mm","Màu":"Bạc","Tình trạng":"Loại 1 (A+)"}', 90, ARRAY['https://cdn.tgdd.vn/Products/Images/7077/289644/apple-watch-s8-45mm-vien-nhom-day-cao-su-1.jpg']),

-- AirPods Pro 2 variants
('airpods-pro-2', 4990000, 6490000, 8, '{"Màu":"Trắng","Tình trạng":"Loại 1 (A+)"}', NULL, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']),
('airpods-pro-2', 4790000, 6490000, 5, '{"Màu":"Trắng","Tình trạng":"Loại 2 (A)"}', NULL, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']),

-- Oppo Reno 10 variants
('oppo-reno-10-256gb', 8990000, 11990000, 6, '{"Dung lượng":"256GB","Màu":"Xanh Dương","Tình trạng":"Loại 1 (A+)"}', 89, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']),
('oppo-reno-10-256gb', 8490000, 11990000, 4, '{"Dung lượng":"256GB","Màu":"Đen","Tình trạng":"Loại 2 (A)"}', 85, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']),

-- Vivo V29 variants
('vivo-v29-256gb', 9490000, 12990000, 5, '{"Dung lượng":"256GB","Màu":"Xanh Lá","Tình trạng":"Loại 1 (A+)"}', 90, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']),
('vivo-v29-256gb', 8990000, 12990000, 3, '{"Dung lượng":"256GB","Màu":"Đỏ","Tình trạng":"Loại 2 (A)"}', 87, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']),

-- Realme 11 Pro variants
('realme-11-pro-256gb', 7490000, 9990000, 7, '{"Dung lượng":"256GB","Màu":"Xám","Tình trạng":"Loại 1 (A+)"}', 88, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']),
('realme-11-pro-256gb', 6990000, 9990000, 5, '{"Dung lượng":"256GB","Màu":"Vàng","Tình trạng":"Loại 2 (A)"}', 84, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']),

-- Nokia G60 variants
('nokia-g60-128gb', 4990000, 6990000, 8, '{"Dung lượng":"128GB","Màu":"Đen","Tình trạng":"Loại 1 (A+)"}', 86, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']),
('nokia-g60-128gb', 4490000, 6990000, 6, '{"Dung lượng":"128GB","Màu":"Xanh Dương","Tình trạng":"Loại 2 (A)"}', 82, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']),

-- Asus ROG Phone 7 variants
('asus-rog-7-256gb', 18990000, 24990000, 3, '{"Dung lượng":"256GB","RAM":"12GB","Màu":"Đen","Tình trạng":"Loại 1 (A+)"}', 94, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']),
('asus-rog-7-256gb', 20990000, 24990000, 2, '{"Dung lượng":"512GB","RAM":"16GB","Màu":"Trắng","Tình trạng":"Loại 1 (A+)"}', 95, ARRAY['https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-tim-1.jpg']);
