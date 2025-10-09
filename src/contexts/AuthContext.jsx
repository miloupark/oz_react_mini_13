import { useSupabase } from '@/lib/supabase';
import { createContext, useContext, useState, useEffect } from 'react';

// 컨텍스트 생성
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const supabase = useSupabase();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (mounted) {
        setUser(error ? null : data?.user ?? null);
        setLoading(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [supabase]);

  // 액션
  const signUp = async ({ email, password, name }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    if (error) throw error;
    return data;
  };

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updateAvatar = (url) => {
    setUser((u) =>
      u ? { ...u, user_metadata: { ...u.user_metadata, avatar_url: url } } : u
    );
  };

  const value = { user, loading, signUp, signIn, signOut, updateAvatar };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Provider 없이 쓰면 에러 투척
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
