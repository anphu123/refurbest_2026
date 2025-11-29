/*
  Update all product and variant images to one default image.
  Requires env vars:
    - NEXT_PUBLIC_SUPABASE_URL
    - SUPABASE_SERVICE_ROLE_KEY

  Run:
    NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/update-images-admin.js
  or put them in .env.local and run with: node -r dotenv/config scripts/update-images-admin.js
*/

const { createClient } = require('@supabase/supabase-js');

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error('Missing env. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  return createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

const DEFAULT_IMAGE = 'https://i.ibb.co/MD44GmQ3/dien-thoai-sap-ra-mat-dau-nam-2025-6-2c2c5bfde4.webp';

(async () => {
  const supabase = createAdminClient();
  console.log('🔄 Updating images for all products...');
  const { data: prodData, error: prodErr } = await supabase
    .from('products')
    .update({ image: DEFAULT_IMAGE, images: [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE] })
    .neq('id', '')
    .select('id');
  if (prodErr) {
    console.error('❌ Products update failed:', prodErr);
    process.exit(1);
  }
  console.log(`✅ Products updated: ${prodData?.length ?? 0}`);

  console.log('🔄 Updating images for all product variants...');
  const { data: varData, error: varErr } = await supabase
    .from('product_variants')
    .update({ images: [DEFAULT_IMAGE] })
    .neq('id', '')
    .select('id');
  if (varErr) {
    console.error('❌ Variants update failed:', varErr);
    process.exit(1);
  }
  console.log(`✅ Variants updated: ${varData?.length ?? 0}`);

  console.log('🎉 Done.');
})();

