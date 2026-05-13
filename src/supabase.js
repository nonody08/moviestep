import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://kxjrfgwrfnvibysuzkfj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4anJmZ3dyZm52aWJ5c3V6a2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2OTg2ODksImV4cCI6MjA5NDI3NDY4OX0.qoFoiUmTWuHBg9rn4mZTOwMqKiRRpV3itvuMbiiTow0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);