// src/services/supabase.js
// Cliente Supabase - Coco Bambu
// Importar este arquivo onde precisar usar o banco de dados

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variaveis de ambiente do Supabase nao encontradas. ' +
    'Verifique o arquivo .env na raiz do projeto.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
