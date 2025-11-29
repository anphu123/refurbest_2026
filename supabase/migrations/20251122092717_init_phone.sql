\n-- ===== BEGIN: supabase/00_schema.sql =====\n
-- =====================================================
-- SCHEMA - TẠO TẤT CẢ BẢNG VÀ CẤU TRÚC
-- Chạy file này đầu tiên
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  discount INTEGER,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  category TEXT REFERENCES categories(id) ON DELETE SET NULL,
  brand TEXT NOT NULL,
  rating DECIMAL(3,2),
  reviews INTEGER DEFAULT 0,
  badge TEXT,
  stock INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_fee DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  final_amount DECIMAL(10,2) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  ward TEXT NOT NULL,
  note TEXT,
  payment_method TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  min_purchase DECIMAL(10,2) DEFAULT 0,
  max_discount DECIMAL(10,2),
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product_id ON wishlist(product_id);
CREATE INDEX IF NOT EXISTS idx_faqs_status ON faqs(status);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON faqs(order_index);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_coupons_updated_at ON coupons;
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_faqs_updated_at ON faqs;
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own reviews" ON reviews;
CREATE POLICY "Users can insert their own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own wishlist" ON wishlist;
CREATE POLICY "Users can view their own wishlist" ON wishlist
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own wishlist" ON wishlist;
CREATE POLICY "Users can insert their own wishlist" ON wishlist
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own wishlist" ON wishlist;
CREATE POLICY "Users can delete their own wishlist" ON wishlist
  FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Coupons are viewable by everyone" ON coupons;
CREATE POLICY "Coupons are viewable by everyone" ON coupons
  FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "FAQs are viewable by everyone" ON faqs;
CREATE POLICY "FAQs are viewable by everyone" ON faqs
  FOR SELECT USING (status = 'active');

\n-- ===== END: supabase/00_schema.sql =====\n
\n-- ===== BEGIN: supabase/01_chat_setup.sql =====\n
-- =====================================================
-- CHAT MESSAGES - SETUP HOÀN CHỈNH
-- File này setup tất cả cho tính năng chat
-- =====================================================

-- 1. Tạo bảng chat_messages
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  user_email text,
  user_name text,
  user_phone text,
  admin_id uuid references auth.users(id) on delete set null,
  message text not null,
  is_from_user boolean not null default true,
  is_read boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Thêm columns nếu bảng đã tồn tại
alter table public.chat_messages
  add column if not exists user_email text,
  add column if not exists user_name text,
  add column if not exists user_phone text;

-- 3. Tạo indexes
create index if not exists chat_messages_user_id_idx on public.chat_messages (user_id, created_at desc);
create index if not exists chat_messages_admin_id_idx on public.chat_messages (admin_id, created_at desc);
create index if not exists chat_messages_is_read_idx on public.chat_messages (is_read) where is_read = false;
create index if not exists chat_messages_created_at_idx on public.chat_messages (created_at desc);

-- 4. Bật RLS
alter table public.chat_messages enable row level security;

-- 5. Xóa tất cả policies cũ
drop policy if exists "Users can read their own messages" on public.chat_messages;
drop policy if exists "Users can insert their own messages" on public.chat_messages;
drop policy if exists "Admins can read all messages" on public.chat_messages;
drop policy if exists "Admins can insert messages" on public.chat_messages;
drop policy if exists "Admins can update messages" on public.chat_messages;

-- 6. Tạo function is_admin với error handling (dùng CREATE OR REPLACE để tránh lỗi dependencies)
-- Lưu ý: Dùng user_id làm parameter name để tương thích với function đã có
create or replace function public.is_admin(user_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  user_email_val text;
  user_role_val text;
begin
  if user_id is null then
    return false;
  end if;
  
  begin
    select 
      email, 
      coalesce(raw_user_meta_data->>'role', '') 
    into user_email_val, user_role_val
    from auth.users
    where id = user_id
    limit 1;
    
    if not found then
      return false;
    end if;
    
    return (user_email_val = 'admin@dienthoaivui.vn' or user_role_val = 'admin');
  exception when others then
    return false;
  end;
end;
$$;

-- 7. Cấp quyền execute cho function
grant execute on function public.is_admin(uuid) to authenticated;

-- 8. Tạo policies cho users (đơn giản, không gọi function)
create policy "Users can read their own messages"
on public.chat_messages 
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own messages"
on public.chat_messages 
for insert
to authenticated
with check (
  auth.uid() = user_id 
  and is_from_user = true
  and message is not null
  and trim(message) != ''
);

-- 9. Tạo policies cho admin (dùng function is_admin)
create policy "Admins can read all messages"
on public.chat_messages 
for select
to authenticated
using (public.is_admin(auth.uid()));

create policy "Admins can insert messages"
on public.chat_messages 
for insert
to authenticated
with check (
  public.is_admin(auth.uid())
  and is_from_user = false
);

create policy "Admins can update messages"
on public.chat_messages 
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- 10. Tạo trigger function cho updated_at
create or replace function update_chat_messages_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 11. Tạo trigger
drop trigger if exists update_chat_messages_updated_at on public.chat_messages;
create trigger update_chat_messages_updated_at
before update on public.chat_messages
for each row
execute function update_chat_messages_updated_at();

\n-- ===== END: supabase/01_chat_setup.sql =====\n
\n-- ===== BEGIN: supabase/02_questions_setup.sql =====\n
-- =====================================================
-- QUESTIONS - SETUP HOÀN CHỈNH
-- File này setup tất cả cho tính năng hỏi đáp
-- =====================================================

-- 1. Tạo bảng questions
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text,
  content text not null,
  created_at timestamptz not null default now(),
  answer_text text,
  answered_at timestamptz,
  answered_by uuid
);

-- 2. Bật RLS
alter table public.questions enable row level security;

-- 3. Tạo indexes
create index if not exists questions_created_at_idx on public.questions (created_at desc);
create index if not exists questions_answered_at_idx on public.questions (answered_at desc nulls last);

-- 4. Xóa tất cả policies cũ
drop policy if exists "Questions are readable by everyone" on public.questions;
drop policy if exists "Authenticated users can insert questions" on public.questions;
drop policy if exists "Admins can update questions" on public.questions;
drop policy if exists "Admins can select all questions" on public.questions;
drop policy if exists "Enable read access for all users" on public.questions;
drop policy if exists "Authenticated users can insert their own questions" on public.questions;

-- 5. Function is_admin đã được tạo trong 03_admin_setup.sql
-- Không cần tạo lại, chỉ sử dụng function đã có

-- 7. Tạo policies
-- Tất cả mọi người có thể đọc questions
create policy "Questions are readable by everyone"
on public.questions
for select
to public
using (true);

-- Users đã đăng nhập có thể thêm questions của họ
create policy "Authenticated users can insert questions"
on public.questions
for insert
to authenticated
with check (auth.uid() = user_id);

-- Admin có thể update questions (trả lời)
create policy "Admins can update questions"
on public.questions
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- Admin có thể xóa questions
create policy "Admins can delete questions"
on public.questions
for delete
to authenticated
using (public.is_admin(auth.uid()));

\n-- ===== END: supabase/02_questions_setup.sql =====\n
\n-- ===== BEGIN: supabase/03_admin_setup.sql =====\n
-- =====================================================
-- ADMIN SETUP - CẤU HÌNH ADMIN VÀ POLICIES
-- Chạy sau schema.sql
-- =====================================================

-- 1. Đảm bảo admin account có role = 'admin' trong metadata
UPDATE auth.users
SET raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('role','admin')
WHERE email = 'admin@dienthoaivui.vn';

-- 2. Tạo function is_admin nếu chưa có (dùng chung với chat/questions)
-- Lưu ý: Dùng user_id làm parameter name để tương thích với function đã có
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
DECLARE
  user_email_val text;
  user_role_val text;
BEGIN
  IF user_id IS NULL THEN
    RETURN false;
  END IF;
  
  BEGIN
    SELECT 
      email, 
      coalesce(raw_user_meta_data->>'role', '') 
    INTO user_email_val, user_role_val
    FROM auth.users
    WHERE id = user_id
    LIMIT 1;
    
    IF NOT FOUND THEN
      RETURN false;
    END IF;
    
    RETURN (user_email_val = 'admin@dienthoaivui.vn' OR user_role_val = 'admin');
  EXCEPTION WHEN OTHERS THEN
    RETURN false;
  END;
END;
$$;

-- 3. Cấp quyền cho function
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;

-- 4. Admin policies cho products (dùng function is_admin)
DROP POLICY IF EXISTS "admin insert products" ON products;
DROP POLICY IF EXISTS "admin update products" ON products;
DROP POLICY IF EXISTS "admin delete products" ON products;

CREATE POLICY "admin insert products"
ON products FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "admin update products"
ON products FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "admin delete products"
ON products FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- 5. Admin policies cho categories (dùng function is_admin)
DROP POLICY IF EXISTS "admin insert categories" ON categories;
DROP POLICY IF EXISTS "admin update categories" ON categories;
DROP POLICY IF EXISTS "admin delete categories" ON categories;

CREATE POLICY "admin insert categories"
ON categories FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "admin update categories"
ON categories FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "admin delete categories"
ON categories FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- 6. Admin policies cho orders (xem và cập nhật tất cả đơn hàng)
DROP POLICY IF EXISTS "admin view all orders" ON orders;
DROP POLICY IF EXISTS "admin update all orders" ON orders;

CREATE POLICY "admin view all orders"
ON orders FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "admin update all orders"
ON orders FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- 7. Admin policies cho order_items (xem tất cả)
DROP POLICY IF EXISTS "admin view all order items" ON order_items;

CREATE POLICY "admin view all order items"
ON order_items FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

\n-- ===== END: supabase/03_admin_setup.sql =====\n
\n-- ===== BEGIN: supabase/03_admin_setup_orders_update.sql =====\n
-- =====================================================
-- ADMIN SETUP UPDATE - CẬP NHẬT POLICIES CHO ORDERS
-- Chạy file này để thêm policies cho admin xem và cập nhật đơn hàng
-- =====================================================

-- 6. Admin policies cho orders (xem và cập nhật tất cả đơn hàng)
DROP POLICY IF EXISTS "admin view all orders" ON orders;
DROP POLICY IF EXISTS "admin update all orders" ON orders;

CREATE POLICY "admin view all orders"
ON orders FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "admin update all orders"
ON orders FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- 7. User policies cho order_items (insert order_items cho đơn hàng của chính họ)
DROP POLICY IF EXISTS "Users can insert order items for their own orders" ON order_items;
DROP POLICY IF EXISTS "Users can view order items for their own orders" ON order_items;

CREATE POLICY "Users can insert order items for their own orders"
ON order_items FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

CREATE POLICY "Users can view order items for their own orders"
ON order_items FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- 8. Admin policies cho order_items (xem tất cả)
DROP POLICY IF EXISTS "admin view all order items" ON order_items;

CREATE POLICY "admin view all order items"
ON order_items FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

\n-- ===== END: supabase/03_admin_setup_orders_update.sql =====\n
\n-- ===== BEGIN: supabase/04_seed_data.sql =====\n
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

\n-- ===== END: supabase/04_seed_data.sql =====\n
\n-- ===== BEGIN: supabase/05_ai_chatbot_setup.sql =====\n
-- =====================================================
-- AI CHATBOT SETUP
-- Tạo bảng cài đặt AI và lịch sử chat AI
-- =====================================================

-- AI Settings table
CREATE TABLE IF NOT EXISTS ai_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enabled BOOLEAN DEFAULT true,
  schedule_enabled BOOLEAN DEFAULT false,
  schedule_start TIME DEFAULT '08:00:00',
  schedule_end TIME DEFAULT '22:00:00',
  timezone TEXT DEFAULT 'Asia/Ho_Chi_Minh',
  default_prompt TEXT DEFAULT 'Bạn là nhân viên tư vấn bán hàng của cửa hàng điện thoại. Hãy trả lời một cách thân thiện, chuyên nghiệp và hỗ trợ khách hàng.',
  agent_name TEXT DEFAULT 'Chị Lan',
  agent_avatar TEXT,
  agent_title TEXT DEFAULT 'Tư vấn viên',
  api_key TEXT, -- Gemini API key (encrypted)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default AI settings
INSERT INTO ai_settings (id, enabled, schedule_enabled, schedule_start, schedule_end)
VALUES (uuid_generate_v4(), false, false, '08:00:00', '22:00:00')
ON CONFLICT DO NOTHING;

-- Chat History table (lưu lịch sử AI chat)
CREATE TABLE IF NOT EXISTS ai_chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  is_ai_response BOOLEAN DEFAULT true,
  is_agent_response BOOLEAN DEFAULT false,
  agent_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  model TEXT DEFAULT 'gemini-2.5-flash',
  tokens_used INTEGER,
  latency_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat Sessions table (track AI vs Agent)
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'handed_over')),
  is_ai_active BOOLEAN DEFAULT true,
  is_agent_active BOOLEAN DEFAULT false,
  agent_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  last_agent_message_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_chat_history_session_id ON ai_chat_history(session_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_history_user_id ON ai_chat_history(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_history_created_at ON ai_chat_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);

-- Update trigger for ai_settings
CREATE OR REPLACE FUNCTION update_ai_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_ai_settings_updated_at
  BEFORE UPDATE ON ai_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_settings_updated_at();

-- RLS Policies for ai_settings (chỉ admin)
ALTER TABLE ai_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin can view ai_settings" ON ai_settings;
DROP POLICY IF EXISTS "Admin can insert ai_settings" ON ai_settings;
DROP POLICY IF EXISTS "Admin can update ai_settings" ON ai_settings;
DROP POLICY IF EXISTS "Admin can delete ai_settings" ON ai_settings;

CREATE POLICY "Admin can view ai_settings"
  ON ai_settings FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin can insert ai_settings"
  ON ai_settings FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin can update ai_settings"
  ON ai_settings FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin can delete ai_settings"
  ON ai_settings FOR DELETE
  USING (public.is_admin(auth.uid()));

-- RLS Policies for ai_chat_history (admin xem được, user xem được của mình)
ALTER TABLE ai_chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own chat history"
  ON ai_chat_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all chat history"
  ON ai_chat_history FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Service role can insert chat history"
  ON ai_chat_history FOR INSERT
  WITH CHECK (true);

-- RLS Policies for chat_sessions
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sessions"
  ON chat_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all sessions"
  ON chat_sessions FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Service role can manage sessions"
  ON chat_sessions FOR ALL
  USING (true);

\n-- ===== END: supabase/05_ai_chatbot_setup.sql =====\n
