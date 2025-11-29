/* eslint-disable no-console */
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ggvnzqwpgvdqzqjqhqkr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdndm56cXdwZ3ZkcXpxanFocWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNDI2NTEsImV4cCI6MjA0NzgxODY1MX0.yaJcXwpzey2d-OdVXLU8tUqEKJX2tqxqLlqYHRJPm-w';

const supabase = createClient(supabaseUrl, supabaseKey);

const DEFAULT_IMAGE = 'https://i.ibb.co/MD44GmQ3/dien-thoai-sap-ra-mat-dau-nam-2025-6-2c2c5bfde4.webp';

async function updateProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name');
  if (error) throw error;

  let ok = 0, fail = 0;
  for (const p of products) {
    const { error: upErr } = await supabase
      .from('products')
      .update({ image: DEFAULT_IMAGE, images: [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE] })
      .eq('id', p.id);
    if (upErr) {
      console.error('Product update failed:', p.name, upErr.message);
      fail++;
    } else {
      ok++;
    }
  }
  console.log(`Products done. OK: ${ok}, Fail: ${fail}`);
}

async function updateVariants() {
  const { data: variants, error } = await supabase
    .from('product_variants')
    .select('id');
  if (error) throw error;

  let ok = 0, fail = 0;
  for (const v of variants) {
    const { error: upErr } = await supabase
      .from('product_variants')
      .update({ images: [DEFAULT_IMAGE] })
      .eq('id', v.id);
    if (upErr) {
      console.error('Variant update failed:', v.id, upErr.message);
      fail++;
    } else {
      ok++;
    }
  }
  console.log(`Variants done. OK: ${ok}, Fail: ${fail}`);
}

(async function run() {
  try {
    console.log('Updating images for all products and variants...');
    await updateProducts();
    await updateVariants();
    console.log('All done.');
  } catch (e) {
    console.error('Script error:', e);
    process.exitCode = 1;
  }
})();

