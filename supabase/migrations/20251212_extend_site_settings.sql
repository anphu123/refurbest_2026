-- =====================================================
-- EXTEND SITE SETTINGS - Thêm các trường cho homepage content
-- =====================================================

-- Thêm các cột mới vào site_settings
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS hero_badge TEXT DEFAULT 'THIẾT BỊ TÂN TRANG CHẤT LƯỢNG',
ADD COLUMN IF NOT EXISTS hero_headlines JSONB DEFAULT '["Công nghệ chất lượng\nGiá trị bền vững", "Tiết kiệm thông minh\nBảo hành 12 tháng", "iPhone, Samsung, Laptop\nĐồng hồ, Tai nghe", "Thiết bị tân trang\nĐáng tin cậy"]'::jsonb,
ADD COLUMN IF NOT EXISTS hero_descriptions JSONB DEFAULT '["Thiết bị công nghệ ''như mới'' với mức giá hợp lý. Tiết kiệm đến 50% mà vẫn đảm bảo chất lượng và trải nghiệm đáng tin cậy.", "Mỗi thiết bị được kiểm định kỹ lưỡng theo quy trình chuẩn. Bảo hành 12 tháng, đổi trả trong 30 ngày nếu lỗi kỹ thuật.", "Đa dạng sản phẩm: iPhone, Samsung, Laptop, Tablet, Đồng hồ thông minh, Tai nghe & loa. Phù hợp với mọi nhu cầu.", "Chọn thiết bị tân trang là bạn đang góp phần giảm rác thải điện tử, tiết kiệm tài nguyên và bảo vệ môi trường."]'::jsonb,
ADD COLUMN IF NOT EXISTS stats_products INTEGER DEFAULT 500,
ADD COLUMN IF NOT EXISTS stats_customers INTEGER DEFAULT 50000,
ADD COLUMN IF NOT EXISTS stats_rating DECIMAL(3,2) DEFAULT 4.9,
ADD COLUMN IF NOT EXISTS stats_satisfaction DECIMAL(5,2) DEFAULT 100.00,
ADD COLUMN IF NOT EXISTS brand_section_title TEXT DEFAULT 'Thương hiệu điện thoại',
ADD COLUMN IF NOT EXISTS brand_section_subtitle TEXT DEFAULT 'Chọn thương hiệu yêu thích của bạn',
ADD COLUMN IF NOT EXISTS why_choose_title TEXT DEFAULT 'Lý do nên chọn thiết bị tân trang',
ADD COLUMN IF NOT EXISTS why_choose_subtitle TEXT DEFAULT 'Tiết kiệm thông minh, chất lượng đảm bảo, bảo vệ môi trường',
ADD COLUMN IF NOT EXISTS why_choose_items JSONB DEFAULT '[
  {
    "icon": "CheckCircle",
    "title": "Như mới",
    "subtitle": "Chất lượng đảm bảo",
    "description": "Thiết bị được kiểm định nghiêm ngặt, thay thế linh kiện nếu cần, đảm bảo hoạt động ổn định như máy mới"
  },
  {
    "icon": "Percent",
    "title": "50%",
    "subtitle": "Tiết kiệm đến 50%",
    "description": "So với thiết bị mới, bạn có thể tiết kiệm từ 20–80%, mà vẫn được bảo hành rõ ràng"
  },
  {
    "icon": "Shield",
    "title": "12 tháng",
    "subtitle": "Bảo hành 12 tháng",
    "description": "Tất cả thiết bị đều được bảo hành 12 tháng. Ưu tiên bảo hành chính hãng nếu còn thời gian"
  },
  {
    "icon": "RefreshCw",
    "title": "30 ngày",
    "subtitle": "Đổi trả 30 ngày",
    "description": "Đổi trả trong 30 ngày nếu lỗi kỹ thuật. Không thu phí đổi trả"
  },
  {
    "icon": "Truck",
    "title": "Miễn phí",
    "subtitle": "Giao hàng toàn quốc",
    "description": "Miễn phí giao hàng với đơn từ 5 triệu. Giao nhanh 1-2 ngày nội thành"
  },
  {
    "icon": "Headphones",
    "title": "24/7",
    "subtitle": "Hỗ trợ 24/7",
    "description": "Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ từ xa hoặc trực tiếp, xử lý nhanh chóng"
  }
]'::jsonb,
ADD COLUMN IF NOT EXISTS testimonials_title TEXT DEFAULT 'Khách hàng nói gì về chúng tôi',
ADD COLUMN IF NOT EXISTS testimonials_subtitle TEXT DEFAULT 'Hơn 10,000+ khách hàng tin tưởng và hài lòng với sản phẩm, dịch vụ của chúng tôi';

-- Update existing record - chỉ set giá trị mặc định cho các cột mới, KHÔNG ghi đè dữ liệu cũ
UPDATE site_settings 
SET 
  hero_badge = COALESCE(hero_badge, 'THIẾT BỊ TÂN TRANG CHẤT LƯỢNG'),
  stats_products = COALESCE(stats_products, 500),
  stats_customers = COALESCE(stats_customers, 50000),
  stats_rating = COALESCE(stats_rating, 4.9),
  stats_satisfaction = COALESCE(stats_satisfaction, 100.00),
  brand_section_title = COALESCE(brand_section_title, 'Thương hiệu điện thoại'),
  brand_section_subtitle = COALESCE(brand_section_subtitle, 'Chọn thương hiệu yêu thích của bạn'),
  why_choose_title = COALESCE(why_choose_title, 'Lý do nên chọn thiết bị tân trang'),
  why_choose_subtitle = COALESCE(why_choose_subtitle, 'Tiết kiệm thông minh, chất lượng đảm bảo, bảo vệ môi trường'),
  testimonials_title = COALESCE(testimonials_title, 'Khách hàng nói gì về chúng tôi'),
  testimonials_subtitle = COALESCE(testimonials_subtitle, 'Hơn 10,000+ khách hàng tin tưởng và hài lòng với sản phẩm, dịch vụ của chúng tôi'),
  updated_at = NOW()
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Nếu chưa có record nào, tạo record mặc định (nhưng thường đã có rồi)
INSERT INTO site_settings (
  id, 
  site_name, 
  site_description, 
  email, 
  phone,
  hero_badge,
  stats_products,
  stats_customers,
  stats_rating,
  stats_satisfaction
)
SELECT
  '00000000-0000-0000-0000-000000000001',
  'Refurbest',
  'Thiết bị tân trang chính hãng - Tiết kiệm thông minh, bảo hành 12 tháng',
  'info@refurbest.vn',
  '1800 2097',
  'THIẾT BỊ TÂN TRANG CHẤT LƯỢNG',
  500,
  50000,
  4.9,
  100.00
WHERE NOT EXISTS (
  SELECT 1 FROM site_settings WHERE id = '00000000-0000-0000-0000-000000000001'
);
