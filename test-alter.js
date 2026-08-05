import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: { session }, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@reelywood.com', // or whatever
    password: 'password'
  });
  // Can we alter table?
  const { error } = await supabase.rpc('query', { query: 'ALTER TABLE performance_marketing ADD COLUMN logo_url TEXT' });
  console.log(error);
}
run();
