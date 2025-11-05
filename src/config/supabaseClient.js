import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// IMPORTANT: Add your credentials to the .env file in the root directory
// Get them from: https://app.supabase.com/project/_/settings/api

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if credentials are configured
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'YOUR_SUPABASE_URL') {
  console.error('❌ Supabase credentials not configured!');
  console.log('📝 Please follow these steps:');
  console.log('1. Create a Supabase account at https://supabase.com');
  console.log('2. Create a new project');
  console.log('3. Go to Settings → API to get your credentials');
  console.log('4. Open .env file and add:');
  console.log('   REACT_APP_SUPABASE_URL=your_url_here');
  console.log('   REACT_APP_SUPABASE_ANON_KEY=your_key_here');
  console.log('5. Restart the development server (npm start)');
  console.log('\n📖 See SUPABASE_SETUP.md for detailed instructions');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
