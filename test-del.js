import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function run() {
  const { data: { session }, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@reelywood.com', // wait, do I know the email? I see user email is rohan00as@gmail.com
    password: 'password' // I can't know the password
  });
  console.log(authError);
}
run();
