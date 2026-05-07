-- =====================================================
-- ABOUT PAGE SETTINGS - Quản lý nội dung trang Giới thiệu
-- =====================================================

CREATE TABLE IF NOT EXISTS about_page_settings (
  id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000002',
  
  -- Hero Section
  hero_title TEXT DEFAULT 'VỀ REFURBEST',
  hero_subtitle TEXT DEFAULT 'CÔNG NGHỆ CHẤT LƯỢNG - GIÁ TRỊ BỀN VỮNG',
  hero_description TEXT DEFAULT 'THIẾT BỊ TÂN TRANG ĐÁNG TIN CẬY',
  
  -- Story Section
  story_intro TEXT DEFAULT 'Refurbest ra đời với một niềm tin đơn giản: công nghệ chất lượng không nhất thiết phải đi kèm với giá cao hay gây hại đến môi trường.',
  story_content TEXT DEFAULT 'Chúng tôi nhận thấy mỗi năm có hàng triệu thiết bị điện tử bị bỏ đi, trong khi phần lớn trong số đó vẫn còn khả năng sử dụng rất tốt nếu được kiểm tra, thay thế linh kiện và làm mới lại một cách chuyên nghiệp. Đó là lý do Refurbest ra đời – nhằm mang đến giải pháp thiết bị công nghệ "như mới" với mức giá hợp lý, nhưng vẫn đảm bảo chất lượng và trải nghiệm đáng tin cậy cho người dùng.',
  story_highlight TEXT DEFAULT 'Refurbest không chỉ là một cửa hàng – chúng tôi là một phần của xu thế mới: tiêu dùng bền vững, công nghệ thân thiện, và lối sống thông minh.',
  story_conclusion TEXT DEFAULT 'Hành trình của bạn với Refurbest không chỉ là sở hữu một thiết bị đáng tin cậy – mà còn là chung tay kiến tạo một tương lai đáng sống hơn.',
  
  -- Vision & Mission
  vision_title TEXT DEFAULT 'Tầm nhìn',
  vision_content TEXT DEFAULT 'Trở thành nơi đáng tin cậy nhất trong lòng khách hàng – nơi bạn có thể tìm thấy thiết bị công nghệ chất lượng với sự phục vụ tận tâm như người thân trong gia đình.',
  mission_title TEXT DEFAULT 'Sứ mệnh',
  mission_items JSONB DEFAULT '[
    "Mang đến các thiết bị tân trang an toàn – bền bỉ – tiết kiệm, giúp người dùng yên tâm sử dụng lâu dài.",
    "Tạo dựng trải nghiệm mua hàng minh bạch, phục vụ chu đáo, hỗ trợ kỹ thuật như bạn bè.",
    "Lan toả tư duy tiêu dùng công nghệ bền vững, giảm rác thải điện tử và bảo vệ môi trường sống.",
    "Đồng hành cùng cộng đồng bằng cách mở rộng tiếp cận công nghệ chất lượng với chi phí hợp lý."
  ]'::jsonb,
  
  -- Core Values
  core_values JSONB DEFAULT '[
    {
      "title": "CHẤT LƯỢNG AN TÂM",
      "description": "Mỗi thiết bị đều được kiểm định kỹ lưỡng theo quy trình chuẩn – từ phần cứng đến phần mềm, đảm bảo hoạt động ổn định và bền bỉ."
    },
    {
      "title": "GIÁ TRỊ HỢP LÝ",
      "description": "Bạn không cần bỏ ra số tiền lớn cho thiết bị mới, vẫn có thể sở hữu những sản phẩm đáng tin cậy với chi phí tiết kiệm đến 50%."
    },
    {
      "title": "HƯỚNG ĐẾN MÔI TRƯỜNG",
      "description": "Mỗi sản phẩm refurbished bạn chọn mua là một hành động góp phần giảm rác thải điện tử, tiết kiệm tài nguyên và bảo vệ hành tinh."
    }
  ]'::jsonb,
  
  -- Commitments
  commitments JSONB DEFAULT '[
    {
      "title": "Kiểm định nghiêm ngặt – Máy sẵn sàng như mới",
      "description": "Mỗi thiết bị được kiểm tra theo quy trình 20+ bước, bao gồm: kiểm tra phần cứng, màn hình, pin, loa, camera, cảm biến, kết nối mạng... trước khi được đóng gói và giao đến tay bạn."
    },
    {
      "title": "Linh kiện đảm bảo – Pin đạt chuẩn, màn hình rõ nét",
      "description": "Chúng tôi chỉ sử dụng linh kiện thay thế đạt tiêu chuẩn kỹ thuật của NSX quy định."
    },
    {
      "title": "Bảo hành rõ ràng – Đổi trả minh bạch",
      "description": "Tất cả sản phẩm đều được bảo hành 12 tháng, hỗ trợ đổi trả trong 30 ngày nếu có lỗi kỹ thuật. Nếu thiết bị vẫn còn bảo hành từ nhà sản xuất, bạn sẽ được ưu tiên bảo hành tại hãng trước."
    },
    {
      "title": "Dịch vụ kỹ thuật chuyên nghiệp – Hỗ trợ 24/7",
      "description": "Đội ngũ kỹ thuật Refurbest luôn sẵn sàng hỗ trợ từ xa hoặc trực tiếp, xử lý các vấn đề phát sinh nhanh chóng – với thái độ tận tâm, minh bạch như phục vụ người thân."
    },
    {
      "title": "Hài lòng là ưu tiên số 1",
      "description": "Chúng tôi không chỉ bán thiết bị – mà mang đến sự an tâm và hài lòng. Nếu bạn không hài lòng, chúng tôi sẽ tìm cách xử lý cho đến khi bạn yên tâm."
    }
  ]'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default data
INSERT INTO about_page_settings (id)
VALUES ('00000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- Update trigger
CREATE OR REPLACE FUNCTION update_about_page_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_about_page_settings_updated_at ON about_page_settings;
CREATE TRIGGER trigger_update_about_page_settings_updated_at
  BEFORE UPDATE ON about_page_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_about_page_settings_updated_at();

-- RLS Policies
ALTER TABLE about_page_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view about_page_settings" ON about_page_settings;
DROP POLICY IF EXISTS "Admin can update about_page_settings" ON about_page_settings;

CREATE POLICY "Anyone can view about_page_settings"
  ON about_page_settings FOR SELECT
  USING (true);

CREATE POLICY "Admin can update about_page_settings"
  ON about_page_settings FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
