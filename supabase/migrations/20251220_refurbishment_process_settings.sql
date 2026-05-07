-- =====================================================
-- REFURBISHMENT PROCESS SETTINGS - Quản lý nội dung trang Quy trình tân trang
-- =====================================================

CREATE TABLE IF NOT EXISTS refurbishment_process_settings (
  id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000003',
  
  -- Hero Section
  hero_title TEXT DEFAULT 'Quy trình tân trang máy',
  hero_subtitle TEXT DEFAULT 'Mỗi thiết bị được kiểm tra theo quy trình 20+ bước nghiêm ngặt',
  
  -- Process Steps
  process_steps JSONB DEFAULT '[
    {
      "icon": "Search",
      "title": "1. Kiểm tra ban đầu",
      "description": "Kiểm tra nguồn, bảo mật, tài khoản. Đảm bảo thiết bị lên nguồn và đã gỡ sạch tài khoản cũ (iCloud, FRP, Samsung account)."
    },
    {
      "icon": "Wrench",
      "title": "2. Kiểm định phần cứng",
      "description": "Kiểm tra toàn diện 20+ bước: màn hình, pin, loa, camera, cảm biến, kết nối mạng, wifi, bluetooth, GPS..."
    },
    {
      "icon": "Shield",
      "title": "3. Thay thế linh kiện",
      "description": "Thay thế linh kiện đạt tiêu chuẩn kỹ thuật của NSX nếu cần: pin, màn hình, camera... Chỉ dùng linh kiện chất lượng cao."
    },
    {
      "icon": "CheckCircle",
      "title": "4. Làm sạch & tân trang",
      "description": "Vệ sinh toàn bộ máy, làm sạch bụi bẩn, dầu mỡ. Đánh bóng vỏ máy để trông như mới."
    },
    {
      "icon": "Package",
      "title": "5. Phân loại & đóng gói",
      "description": "Phân loại theo 5 cấp độ (Loại 1-5) dựa trên tình trạng ngoại hình và chức năng. Đóng gói cẩn thận với phụ kiện đầy đủ."
    },
    {
      "icon": "Truck",
      "title": "6. Sẵn sàng giao hàng",
      "description": "Thiết bị đã sẵn sàng để giao đến tay khách hàng. Kèm theo bảo hành 12 tháng và chính sách đổi trả 30 ngày."
    }
  ]'::jsonb,
  
  -- Quality Checks Section
  quality_checks_title TEXT DEFAULT '20+ điểm kiểm tra chất lượng',
  quality_checks_subtitle TEXT DEFAULT 'Mỗi thiết bị được kiểm tra kỹ lưỡng từ phần cứng đến phần mềm',
  quality_checks JSONB DEFAULT '[
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
  ]'::jsonb,
  
  -- Commitment Section
  commitment_title TEXT DEFAULT 'Cam kết chất lượng',
  commitment_description TEXT DEFAULT 'Mỗi thiết bị được kiểm tra theo quy trình chuẩn – từ phần cứng đến phần mềm, đảm bảo hoạt động ổn định và bền bỉ',
  commitment_items JSONB DEFAULT '[
    "Bảo hành 12 tháng",
    "Đổi trả 30 ngày",
    "Hỗ trợ 24/7"
  ]'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default data
INSERT INTO refurbishment_process_settings (id)
VALUES ('00000000-0000-0000-0000-000000000003')
ON CONFLICT (id) DO NOTHING;

-- Update trigger
CREATE OR REPLACE FUNCTION update_refurbishment_process_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_refurbishment_process_settings_updated_at ON refurbishment_process_settings;
CREATE TRIGGER trigger_update_refurbishment_process_settings_updated_at
  BEFORE UPDATE ON refurbishment_process_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_refurbishment_process_settings_updated_at();

-- RLS Policies
ALTER TABLE refurbishment_process_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view refurbishment_process_settings" ON refurbishment_process_settings;
DROP POLICY IF EXISTS "Admin can update refurbishment_process_settings" ON refurbishment_process_settings;

CREATE POLICY "Anyone can view refurbishment_process_settings"
  ON refurbishment_process_settings FOR SELECT
  USING (true);

CREATE POLICY "Admin can update refurbishment_process_settings"
  ON refurbishment_process_settings FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
