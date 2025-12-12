#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('🚀 Running site settings migration...\n');

// Read migration file
const migrationPath = join(__dirname, '../supabase/migrations/20251212_extend_site_settings.sql');
const sql = readFileSync(migrationPath, 'utf8');

// Split into statements and execute one by one
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

console.log(`📝 Found ${statements.length} SQL statements\n`);

async function runMigration() {
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    if (!statement) continue;
    
    console.log(`Executing statement ${i + 1}/${statements.length}...`);
    
    try {
      const { data, error } = await supabase.rpc('exec_sql', { 
        sql: statement + ';' 
      });
      
      if (error) {
        // Check if it's a "column already exists" error
        if (error.message.includes('already exists') || error.message.includes('duplicate')) {
          console.log(`⚠️  Already exists, skipping...\n`);
          continue;
        }
        throw error;
      }
      
      console.log(`✅ Statement ${i + 1} completed\n`);
    } catch (error) {
      console.error(`❌ Error in statement ${i + 1}:`, error.message);
      
      // If exec_sql doesn't exist, show manual instructions
      if (error.message.includes('function') && error.message.includes('does not exist')) {
        console.log('\n⚠️  exec_sql function not available.');
        console.log('\n📌 Please run the migration manually:');
        console.log('1. Go to: https://supabase.com/dashboard');
        console.log('2. Select your project');
        console.log('3. Go to SQL Editor');
        console.log('4. Copy content from: supabase/migrations/20251212_extend_site_settings.sql');
        console.log('5. Paste and click Run\n');
        process.exit(1);
      }
      
      throw error;
    }
  }
}

runMigration()
  .then(() => {
    console.log('✅ Migration completed successfully!\n');
    console.log('📝 Next steps:');
    console.log('1. Go to /admin/site-settings to edit homepage content');
    console.log('2. Update hero text, stats, brand section, why choose us');
    console.log('3. Changes will be reflected on the homepage immediately\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error.message);
    console.log('\n📌 Manual migration steps:');
    console.log('1. Go to: https://supabase.com/dashboard');
    console.log('2. Select your project');
    console.log('3. Go to SQL Editor');
    console.log('4. Copy content from: supabase/migrations/20251212_extend_site_settings.sql');
    console.log('5. Paste and click Run\n');
    process.exit(1);
  });
