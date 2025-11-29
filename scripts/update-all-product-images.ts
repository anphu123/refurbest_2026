import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ggvnzqwpgvdqzqjqhqkr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdndm56cXdwZ3ZkcXpxanFocWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNDI2NTEsImV4cCI6MjA0NzgxODY1MX0.yaJcXwpzey2d-OdVXLU8tUqEKJX2tqxqLlqYHRJPm-w';

const supabase = createClient(supabaseUrl, supabaseKey);

const DEFAULT_IMAGE = 'https://i.ibb.co/MD44GmQ3/dien-thoai-sap-ra-mat-dau-nam-2025-6-2c2c5bfde4.webp';

async function updateAllProductImages() {
  try {
    console.log('🔄 Đang cập nhật hình ảnh cho tất cả sản phẩm...');

    // Lấy tất cả sản phẩm
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, name, images');

    if (fetchError) {
      console.error('❌ Lỗi khi lấy sản phẩm:', fetchError);
      return;
    }

    if (!products || products.length === 0) {
      console.log('⚠️ Không có sản phẩm nào trong database');
      return;
    }

    console.log(`📦 Tìm thấy ${products.length} sản phẩm`);

    // Cập nhật từng sản phẩm
    let successCount = 0;
    let errorCount = 0;

    for (const product of products) {
      const { error: updateError } = await supabase
        .from('products')
        .update({
          images: [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE]
        })
        .eq('id', product.id);

      if (updateError) {
        console.error(`❌ Lỗi cập nhật sản phẩm ${product.name}:`, updateError);
        errorCount++;
      } else {
        console.log(`✅ Đã cập nhật: ${product.name}`);
        successCount++;
      }
    }

    console.log('\n📊 Kết quả:');
    console.log(`✅ Thành công: ${successCount}`);
    console.log(`❌ Lỗi: ${errorCount}`);
    console.log(`📦 Tổng: ${products.length}`);

  } catch (error) {
    console.error('❌ Lỗi:', error);
  }
}

// Chạy script
updateAllProductImages();

