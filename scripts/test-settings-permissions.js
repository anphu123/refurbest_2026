require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testPermissions() {
  console.log('Testing site_settings permissions...\n');

  // Test 1: Read settings (should work for everyone)
  console.log('1. Testing READ permission (should work):');
  const { data: readData, error: readError } = await supabase
    .from('site_settings')
    .select('*')
    .single();
  
  if (readError) {
    console.error('❌ Read failed:', readError.message);
  } else {
    console.log('✅ Read successful:', readData);
  }

  // Test 2: Sign in as admin
  console.log('\n2. Signing in as admin...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@refurbest.vn',
    password: '123123'
  });

  if (authError) {
    console.error('❌ Admin login failed:', authError.message);
    return;
  }
  console.log('✅ Admin logged in:', authData.user.email);

  // Test 3: Update settings as admin
  console.log('\n3. Testing UPDATE permission as admin:');
  const { data: updateData, error: updateError } = await supabase
    .from('site_settings')
    .update({
      address: 'Test Address from Script'
    })
    .eq('id', '00000000-0000-0000-0000-000000000001')
    .select();

  if (updateError) {
    console.error('❌ Update failed:', updateError.message);
    console.error('Details:', updateError);
  } else {
    console.log('✅ Update successful:', updateData);
  }

  // Test 4: Read again to verify
  console.log('\n4. Reading settings again to verify update:');
  const { data: verifyData, error: verifyError } = await supabase
    .from('site_settings')
    .select('*')
    .single();
  
  if (verifyError) {
    console.error('❌ Verify read failed:', verifyError.message);
  } else {
    console.log('✅ Current settings:', verifyData);
  }

  await supabase.auth.signOut();
}

testPermissions().catch(console.error);
