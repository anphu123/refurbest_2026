require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Need SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkAdmin() {
  console.log('Checking for admin users...\n');

  const { data: { users }, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error('Error listing users:', error);
    return;
  }

  console.log(`Total users: ${users.length}\n`);

  const adminUsers = users.filter(u => 
    u.email?.includes('admin') || 
    u.email?.includes('refurbest') ||
    u.user_metadata?.role === 'admin'
  );

  if (adminUsers.length === 0) {
    console.log('❌ No admin users found');
    console.log('\nTo create admin user, run this in Supabase SQL Editor:');
    console.log(`
-- Create admin user (if not exists)
-- You need to do this in Supabase Dashboard > Authentication > Users
-- Or use the admin API
    `);
  } else {
    console.log('Admin users found:');
    adminUsers.forEach(u => {
      console.log(`- Email: ${u.email}`);
      console.log(`  ID: ${u.id}`);
      console.log(`  Metadata:`, u.user_metadata);
      console.log('');
    });
  }
}

checkAdmin().catch(console.error);
