#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

// Read migration file
const migrationPath = path.join(__dirname, '../supabase/migrations/20251212_extend_site_settings.sql');
const sql = fs.readFileSync(migrationPath, 'utf8');

console.log('🚀 Running site settings migration...\n');

// Parse Supabase URL
const url = new URL(SUPABASE_URL);
const projectRef = url.hostname.split('.')[0];

// Supabase REST API endpoint for SQL queries
const apiUrl = `https://${projectRef}.supabase.co/rest/v1/rpc/exec_sql`;

const postData = JSON.stringify({ query: sql });

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Length': Buffer.byteLength(postData)
  }
};

// Try using pg_query function instead
const execSql = async () => {
  // Split SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';
    console.log(`Executing statement ${i + 1}/${statements.length}...`);
    
    try {
      await executeStatement(statement);
      console.log(`✅ Statement ${i + 1} completed\n`);
    } catch (error) {
      console.error(`❌ Error in statement ${i + 1}:`, error.message);
      if (error.message.includes('already exists')) {
        console.log('⚠️  Column already exists, continuing...\n');
        continue;
      }
      throw error;
    }
  }
};

const executeStatement = (statement) => {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ query: statement });
    
    const options = {
      hostname: `${projectRef}.supabase.co`,
      port: 443,
      path: '/rest/v1/rpc/exec_sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
};

// Main execution
execSql()
  .then(() => {
    console.log('✅ Migration completed successfully!\n');
    console.log('📝 Next steps:');
    console.log('1. Go to /admin/site-settings to edit homepage content');
    console.log('2. Update hero text, stats, brand section, why choose us, and testimonials');
    console.log('3. Changes will be reflected on the homepage immediately\n');
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error.message);
    console.log('\n💡 Alternative: Run the SQL directly in Supabase Dashboard:');
    console.log('1. Go to https://supabase.com/dashboard/project/' + projectRef + '/editor');
    console.log('2. Open SQL Editor');
    console.log('3. Copy and paste the content from: supabase/migrations/20251212_extend_site_settings.sql');
    console.log('4. Click "Run"\n');
    process.exit(1);
  });
