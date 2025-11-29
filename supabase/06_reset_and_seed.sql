-- =====================================================
-- STEP 1: CREATE MISSING TABLES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.slideshow (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  link_to VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- STEP 2: RESET ALL DATA
-- =====================================================
TRUNCATE TABLE public.order_items, public.orders, public.reviews, public.wishlist, public.products, public.categories, public.news, public.slideshow RESTART IDENTITY CASCADE;

-- =====================================================
-- STEP 3: SEED CATEGORIES
-- =====================================================
INSERT INTO public.categories (id, name, slug, image, icon) VALUES
('iphones', 'iPhones', 'iphones', 'https://i.ibb.co/bFkS0z9/iphone.png', 'Smartphone'),
('samsung', 'Samsung', 'samsung', 'https://i.ibb.co/z4YtV2g/samsung.png', 'Smartphone'),
('google-pixel', 'Google Pixel', 'google-pixel', 'https://i.ibb.co/yWjK7d2/iphone-17-pro-black.png', 'Smartphone'),
('xiaomi', 'Xiaomi', 'xiaomi', 'https://i.ibb.co/p1LzZ3b/iphone-17-pro-natural.png', 'Smartphone'),
('macbooks', 'MacBooks', 'macbooks', 'https://i.ibb.co/pzvC1Bw/macbook.png', 'Laptop'),
('laptops', 'Laptops (Windows)', 'laptops-windows', 'https://i.ibb.co/3s4SjJc/lenovo.png', 'Laptop'),
('apple-watch', 'Apple Watch', 'apple-watch', 'https://i.ibb.co/9vM5r2f/watch.png', 'Watch'),
('ipad', 'iPad', 'ipad', 'https://i.ibb.co/G0s2s5Y/ipad.png', 'Tablet'),
('tai-nghe', 'Tai nghe', 'tai-nghe', 'https://i.ibb.co/yQG5zYm/airpods.png', 'Headphones'),
('phu-kien', 'Phụ kiện', 'phu-kien', 'https://i.ibb.co/2Z5wZ3b/accessories.png', 'Cable');


-- =====================================================
-- STEP 4: SEED PRODUCTS & VARIANTS
-- =====================================================

-- ----------------------
-- APPLE PRODUCTS
-- ----------------------

-- iPhone 16 Pro Max
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('iphone-16-pro-max', 'iPhone 16 Pro Max', 'Apple', 'iphones', 'https://i.ibb.co/yWjK7d2/iphone-17-pro-black.png', '{"https://i.ibb.co/yWjK7d2/iphone-17-pro-black.png", "https://i.ibb.co/p1LzZ3b/iphone-17-pro-natural.png", "https://i.ibb.co/9hbdx0f/iphone-17-pro-blue.png"}', 'iPhone 16 Pro Max với chip A18 Pro mạnh mẽ, màn hình lớn hơn 6.9-inch và hệ thống camera cải tiến vượt bậc với zoom quang học 5x.', '{"Màn hình": "6.9-inch Super Retina XDR", "Chip": "A18 Pro", "Camera": "48MP Chính, 12MP Telephoto 5x"}');
INSERT INTO public.product_variants (product_id, price, original_price, stock, attributes) VALUES
('iphone-16-pro-max', 1199, 1299, 120, '{"Màu": "Titan Đen", "Dung lượng": "256GB", "Tình trạng": "Mới"}'),
('iphone-16-pro-max', 1399, 1499, 80, '{"Màu": "Titan Đen", "Dung lượng": "512GB", "Tình trạng": "Mới"}'),
('iphone-16-pro-max', 1599, 1699, 50, '{"Màu": "Titan Đen", "Dung lượng": "1TB", "Tình trạng": "Mới"}'),
('iphone-16-pro-max', 1050, 1299, 50, '{"Màu": "Titan Tự nhiên", "Dung lượng": "256GB", "Tình trạng": "Như mới 99%"}'),
('iphone-16-pro-max', 980, 1299, 30, '{"Màu": "Titan Tự nhiên", "Dung lượng": "256GB", "Tình trạng": "98%"}'),
('iphone-16-pro-max', 1199, 1299, 110, '{"Màu": "Titan Xanh", "Dung lượng": "256GB", "Tình trạng": "Mới"}');

-- iPhone 16 Pro
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('iphone-16-pro', 'iPhone 16 Pro', 'Apple', 'iphones', 'https://i.ibb.co/p1LzZ3b/iphone-17-pro-natural.png', '{"https://i.ibb.co/p1LzZ3b/iphone-17-pro-natural.png"}', 'iPhone 16 Pro nhỏ gọn với màn hình 6.3-inch, chip A18 Pro và nút "Capture" mới cho nhiếp ảnh gia.', '{"Màn hình": "6.3-inch Super Retina XDR", "Chip": "A18 Pro", "Camera": "48MP Chính"}');
INSERT INTO public.product_variants (product_id, price, original_price, stock, attributes) VALUES
('iphone-16-pro', 999, 1099, 150, '{"Màu": "Titan Tự nhiên", "Dung lượng": "128GB", "Tình trạng": "Mới"}'),
('iphone-16-pro', 1099, 1199, 200, '{"Màu": "Titan Tự nhiên", "Dung lượng": "256GB", "Tình trạng": "Mới"}'),
('iphone-16-pro', 880, 1099, 70, '{"Màu": "Titan Trắng", "Dung lượng": "128GB", "Tình trạng": "Như mới 99%"}');

-- iPhone 15
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('iphone-15', 'iPhone 15', 'Apple', 'iphones', 'https://i.ibb.co/bFkS0z9/iphone.png', '{"https://i.ibb.co/bFkS0z9/iphone.png"}', 'iPhone 15 với Dynamic Island, camera 48MP và thiết kế kính pha màu độc đáo.', '{"Màn hình": "6.1-inch Super Retina XDR", "Chip": "A16 Bionic", "Camera": "48MP Chính"}');
INSERT INTO public.product_variants (product_id, price, original_price, stock, attributes) VALUES
('iphone-15', 699, 799, 300, '{"Màu": "Hồng", "Dung lượng": "128GB", "Tình trạng": "Mới"}'),
('iphone-15', 799, 899, 250, '{"Màu": "Xanh lá", "Dung lượng": "256GB", "Tình trạng": "Mới"}'),
('iphone-15', 550, 799, 150, '{"Màu": "Đen", "Dung lượng": "128GB", "Tình trạng": "Như mới 99%"}');

-- MacBook Air M3
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('macbook-air-m3', 'MacBook Air M3 13-inch', 'Apple', 'macbooks', 'https://i.ibb.co/pzvC1Bw/macbook.png', '{"https://i.ibb.co/pzvC1Bw/macbook.png"}', 'MacBook Air M3 siêu mỏng nhẹ, hiệu năng mạnh mẽ và thời lượng pin lên đến 18 giờ.', '{"Chip": "M3", "RAM": "8GB", "Ổ cứng": "256GB SSD"}');
INSERT INTO public.product_variants (product_id, price, stock, attributes) VALUES
('macbook-air-m3', 999, 150, '{"Màu": "Xám không gian", "Cấu hình": "8GB RAM | 256GB SSD"}'),
('macbook-air-m3', 1199, 100, '{"Màu": "Bạc", "Cấu hình": "16GB RAM | 512GB SSD"}');

-- iPad Pro M4
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('ipad-pro-m4', 'iPad Pro M4 11-inch', 'Apple', 'ipad', 'https://i.ibb.co/G0s2s5Y/ipad.png', '{"https://i.ibb.co/G0s2s5Y/ipad.png"}', 'iPad Pro M4 với màn hình Ultra Retina XDR và hiệu năng đột phá của chip M4.', '{"Màn hình": "11-inch Ultra Retina XDR", "Chip": "M4", "Kết nối": "Wi-Fi"}');
INSERT INTO public.product_variants (product_id, price, stock, attributes) VALUES
('ipad-pro-m4', 999, 75, '{"Dung lượng": "256GB", "Màu": "Bạc"}'),
('ipad-pro-m4', 1199, 65, '{"Dung lượng": "512GB", "Màu": "Xám không gian"}');

-- Apple Watch Ultra 3
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('apple-watch-ultra-3', 'Apple Watch Ultra 3', 'Apple', 'apple-watch', 'https://i.ibb.co/9vM5r2f/watch.png', '{"https://i.ibb.co/9vM5r2f/watch.png"}', 'Apple Watch Ultra 3 bền bỉ và mạnh mẽ, dành cho các hoạt động thể thao mạo hiểm và ngoài trời.', '{"Vỏ": "49mm Titan", "Kết nối": "GPS + Cellular", "Tính năng": "Chống nước 100m"}');
INSERT INTO public.product_variants (product_id, price, stock, attributes) VALUES
('apple-watch-ultra-3', 799, 60, '{"Dây": "Alpine Loop", "Tình trạng": "Mới"}'),
('apple-watch-ultra-3', 799, 55, '{"Dây": "Ocean Band", "Tình trạng": "Mới"}');


-- ----------------------
-- ANDROID & OTHER PHONES
-- ----------------------

-- Samsung Galaxy S25 Ultra
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('galaxy-s25-ultra', 'Samsung Galaxy S25 Ultra', 'Samsung', 'samsung', 'https://i.ibb.co/M84D5t7/s26-ultra-gray.png', '{"https://i.ibb.co/M84D5t7/s26-ultra-gray.png", "https://i.ibb.co/X2YqVfF/s26-ultra-violet.png"}', 'Galaxy S25 Ultra với Galaxy AI, camera 200MP và S Pen tích hợp, định nghĩa lại trải nghiệm di động.', '{"Màn hình": "6.8-inch Dynamic AMOLED 2X", "Chip": "Snapdragon 8 Gen 4 for Galaxy", "Camera": "200MP"}');
INSERT INTO public.product_variants (product_id, price, original_price, stock, attributes) VALUES
('galaxy-s25-ultra', 1299, 1399, 100, '{"Màu": "Xám Titan", "Dung lượng": "256GB", "RAM": "12GB", "Tình trạng": "Mới"}'),
('galaxy-s25-ultra', 1499, 1599, 70, '{"Màu": "Xám Titan", "Dung lượng": "512GB", "RAM": "16GB", "Tình trạng": "Mới"}'),
('galaxy-s25-ultra', 1150, 1399, 60, '{"Màu": "Tím Titan", "Dung lượng": "256GB", "RAM": "12GB", "Tình trạng": "Như mới 99%"}');

-- Samsung Galaxy Z Fold 6
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('galaxy-z-fold-6', 'Samsung Galaxy Z Fold 6', 'Samsung', 'samsung', 'https://i.ibb.co/X2YqVfF/s26-ultra-violet.png', '{"https://i.ibb.co/X2YqVfF/s26-ultra-violet.png"}', 'Galaxy Z Fold 6 với màn hình gập cải tiến, mỏng hơn, nhẹ hơn và S Pen tích hợp.', '{"Màn hình chính": "7.6-inch Dynamic AMOLED 2X", "Màn hình phụ": "6.2-inch", "Chip": "Snapdragon 8 Gen 4 for Galaxy"}');
INSERT INTO public.product_variants (product_id, price, stock, attributes) VALUES
('galaxy-z-fold-6', 1799, 50, '{"Màu": "Bạc Phantom", "Dung lượng": "512GB", "RAM": "12GB"}'),
('galaxy-z-fold-6', 1500, 30, '{"Màu": "Đen Phantom", "Dung lượng": "256GB", "RAM": "12GB"}');

-- Google Pixel 9 Pro
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('pixel-9-pro', 'Google Pixel 9 Pro', 'Google', 'google-pixel', 'https://i.ibb.co/M84D5t7/s26-ultra-gray.png', '{"https://i.ibb.co/M84D5t7/s26-ultra-gray.png"}', 'Pixel 9 Pro với chip Tensor G4 và hệ thống camera AI đỉnh cao, mang lại trải nghiệm Android thuần khiết.', '{"Màn hình": "6.7-inch LTPO OLED", "Chip": "Google Tensor G4", "Camera": "50MP Chính"}');
INSERT INTO public.product_variants (product_id, price, stock, attributes) VALUES
('pixel-9-pro', 999, 80, '{"Màu": "Đen Obsidian", "Dung lượng": "128GB"}'),
('pixel-9-pro', 1099, 60, '{"Màu": "Trắng Sứ", "Dung lượng": "256GB"}');

-- Xiaomi 15 Pro
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('xiaomi-15-pro', 'Xiaomi 15 Pro', 'Xiaomi', 'xiaomi', 'https://i.ibb.co/p1LzZ3b/iphone-17-pro-natural.png', '{"https://i.ibb.co/p1LzZ3b/iphone-17-pro-natural.png"}', 'Xiaomi 15 Pro hợp tác với Leica, mang lại hệ thống camera chuyên nghiệp và sạc nhanh 120W.', '{"Màn hình": "6.73-inch AMOLED C8", "Chip": "Snapdragon 8 Gen 4", "Camera": "50MP Leica"}');
INSERT INTO public.product_variants (product_id, price, stock, attributes) VALUES
('xiaomi-15-pro', 949, 110, '{"Màu": "Đen", "Dung lượng": "256GB", "RAM": "12GB"}'),
('xiaomi-15-pro', 1049, 90, '{"Màu": "Trắng", "Dung lượng": "512GB", "RAM": "16GB"}');



-- ----------------------
-- LAPTOPS & ACCESSORIES
-- ----------------------

-- Dell XPS 15 (2025)
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('dell-xps-15-2025', 'Dell XPS 15 (2025)', 'Dell', 'laptops', 'https://i.ibb.co/3s4SjJc/lenovo.png', '{"https://i.ibb.co/3s4SjJc/lenovo.png"}', 'Dell XPS 15 mới với màn hình OLED 4K, vi xử lý Intel Core Ultra 9 và card đồ họa NVIDIA RTX 40-series.', '{"Màn hình": "15.6-inch 4K OLED", "CPU": "Intel Core Ultra 9", "GPU": "NVIDIA RTX 4060"}');
INSERT INTO public.product_variants (product_id, price, stock, attributes) VALUES
('dell-xps-15-2025', 2299, 40, '{"Cấu hình": "Core Ultra 9 | 32GB RAM | 1TB SSD"}');

-- AirPods Pro 3
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('airpods-pro-3', 'AirPods Pro 3', 'Apple', 'tai-nghe', 'https://i.ibb.co/yQG5zYm/airpods.png', '{"https://i.ibb.co/yQG5zYm/airpods.png"}', 'AirPods Pro 3 với khả năng khử tiếng ồn chủ động gấp 3 lần và Âm thanh thích ứng hoàn toàn mới.', '{"Tính năng": "Khử ồn chủ động", "Thời lượng pin": "6 giờ"}');
INSERT INTO public.product_variants (product_id, price, original_price, stock, attributes) VALUES
('airpods-pro-3', 249, 279, 300, '{"Tình trạng": "Mới"}');

-- Anker 737 Power Bank
INSERT INTO public.products (id, name, brand, category, image, images, description, specifications) VALUES
('anker-737-powerbank', 'Sạc dự phòng Anker 737', 'Anker', 'phu-kien', 'https://i.ibb.co/2Z5wZ3b/accessories.png', '{"https://i.ibb.co/2Z5wZ3b/accessories.png"}', 'Sạc dự phòng Anker 737 (PowerCore 24K) với công suất 140W, sạc nhanh cho cả MacBook.', '{"Dung lượng": "24,000mAh", "Công suất tối đa": "140W", "Cổng": "2x USB-C, 1x USB-A"}');
INSERT INTO public.product_variants (product_id, price, stock, attributes) VALUES
('anker-737-powerbank', 149, 300, '{"Tình trạng": "Mới"}');

-- =====================================================
-- STEP 5: SEED NEWS & SLIDESHOW
-- =====================================================

INSERT INTO public.news (title, slug, excerpt, content, image, author_name, status, published_at) VALUES
('Apple ra mắt iPhone 16 Series: Những nâng cấp đáng giá', 'apple-ra-mat-iphone-16-series', 'Dòng iPhone 16 được kỳ vọng sẽ mang đến những thay đổi lớn về thiết kế và hiệu năng.', 'Nội dung chi tiết về iPhone 16...', 'https://i.ibb.co/yWjK7d2/iphone-17-pro-black.png', 'Admin', 'published', NOW()),
('Samsung trình làng Galaxy S25 Ultra với camera 200MP', 'samsung-trinh-lang-galaxy-s25-ultra', 'Cuộc đua megapixel vẫn chưa có hồi kết khi Samsung tiếp tục nâng cấp cảm biến.', 'Nội dung chi tiết về S25 Ultra...', 'https://i.ibb.co/M84D5t7/s26-ultra-gray.png', 'Admin', 'published', NOW() - interval '1 day'),
('Chip Apple M3: Kỷ nguyên mới cho máy Mac', 'chip-apple-m3-ky-nguyen-moi', 'Apple M3 hứa hẹn mang lại hiệu suất đồ họa và xử lý AI vượt trội.', 'Nội dung chi tiết về chip M3...', 'https://i.ibb.co/GvXk2dD/macbook-pro-2025.png', 'Admin', 'published', NOW() - interval '2 day'),
('Đánh giá Google Pixel 9 Pro: Nhiếp ảnh gia bỏ túi', 'danh-gia-google-pixel-9-pro', 'Liệu những cải tiến về AI có giúp Pixel 9 Pro vượt qua các đối thủ?', 'Nội dung chi tiết về Pixel 9 Pro...', 'https://i.ibb.co/M84D5t7/s26-ultra-gray.png', 'Admin', 'published', NOW() - interval '5 days'),
('Trên tay Galaxy Z Fold 6: Mỏng hơn, nhẹ hơn, mạnh hơn', 'tren-tay-galaxy-z-fold-6', 'Những cảm nhận đầu tiên về siêu phẩm màn hình gập của Samsung.', 'Nội dung chi tiết về Z Fold 6...', 'https://i.ibb.co/X2YqVfF/s26-ultra-violet.png', 'Admin', 'published', NOW() - interval '6 days'),
('5 lý do nên mua MacBook Air M3 thay vì Pro', '5-ly-do-nen-mua-macbook-air-m3', 'MacBook Air M3 có thực sự là lựa chọn tối ưu cho hầu hết người dùng?', 'Nội dung chi tiết...', 'https://i.ibb.co/pzvC1Bw/macbook.png', 'Admin', 'draft', NOW() - interval '7 days');

INSERT INTO public.slideshow (title, description, image_url, link_to, status) VALUES
('iPhone 16 Pro Max', 'Siêu phẩm công nghệ 2025', 'https://i.ibb.co/yWjK7d2/iphone-17-pro-black.png', '/product/iphone-16-pro-max', 'active'),
('Galaxy Z Fold 6', 'Trải nghiệm gập không giới hạn', 'https://i.ibb.co/X2YqVfF/s26-ultra-violet.png', '/product/galaxy-z-fold-6', 'active'),
('MacBook Air M3', 'Nhẹ như không, mạnh bất ngờ', 'https://i.ibb.co/pzvC1Bw/macbook.png', '/product/macbook-air-m3', 'active'),
('Back to School Sale', 'Giảm giá cực sốc cho học sinh, sinh viên', 'https://i.ibb.co/3s4SjJc/lenovo.png', '/laptops', 'active');
