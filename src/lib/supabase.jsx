import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

// supabase Client 생성
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

const SUPABASE = createContext(null);

// supabase client를 사용하기 위한 provider 생성
export const SupabaseProvider = ({ children }) => {
  return <SUPABASE.Provider value={supabase}>{children}</SUPABASE.Provider>;
};

export const useSupabase = () => {
  const client = useContext(SUPABASE);
  if (!client) {
    throw new Error(
      'SupabaseProvider로 앱을 감싼 뒤 useSupabase를 사용하세요.'
    );
  }
  return client;
};
