import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseAnonKey =
//   process.env.NODE_ENV === "development"
//     ? process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE
//     : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);
