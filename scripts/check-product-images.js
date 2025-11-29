/* eslint-disable no-console */
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ggvnzqwpgvdqzqjqhqkr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdndm56cXdwZ3ZkcXpxanFocWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNDI2NTEsImV4cCI6MjA0NzgxODY1MX0.yaJcXwpzey2d-OdVXLU8tUqEKJX2tqxqLlqYHRJPm-w';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProductImages() {
  try {
    console.log('🔍 Checking iPhone 16 Pro images...\n');

    // Lấy sản phẩm iPhone 16 Pro
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, image, images')
      .ilike('name', '%iPhone 16 Pro%');

    if (error) {
      console.error('❌ Error:', error);
      return;
    }

    if (!products || products.length === 0) {
      console.log('⚠️ No iPhone 16 Pro found');
      return;
    }

    console.log(`📦 Found ${products.length} product(s):\n`);

    products.forEach((p, index) => {
      console.log(`${index + 1}. ${p.name}`);
      console.log(`   ID: ${p.id}`);
      console.log(`   Image: ${p.image}`);
      console.log(`   Images array: ${JSON.stringify(p.images)}`);
      console.log(`   Images length: ${p.images?.length || 0}\n`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run
checkProductImages();

