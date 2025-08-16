import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { handleAuthError } from '../utils/supabase';

interface User {
  id: string;
  email: string;
  user_metadata: {
    name?: string;
    avatar_url?: string;
    phone?: string;
    address?: string;
  };
  app_metadata: {
    provider?: string;
  };
  aud: string;
  created_at: string;
}

interface UpdateProfileData {
  displayName?: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (name: string, email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<{ error: string | null }>;
  updateProfile: (data: UpdateProfileData) => Promise<{ error: string | null }>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and set the user
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      setLoading(true);
      if (session?.user) {
        setUser(session.user as unknown as User);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Check the current user when the component mounts
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user as unknown as User);
      setLoading(false);
    };

    getUser();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: handleAuthError(error) };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: handleAuthError(error) };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      return { error: null };
    } catch (error) {
      return { error: handleAuthError(error) };
    }
  };

  const updateProfile = async (data: UpdateProfileData) => {
    try {
      const { data: { user: updatedUser }, error } = await supabase.auth.updateUser({
        data: {
          ...user?.user_metadata,
          name: data.displayName,
          phone: data.phone,
          address: data.address,
        },
      });

      if (error) throw error;

      // Update local user state
      if (updatedUser) {
        setUser(updatedUser as unknown as User);
      }

      return { error: null };
    } catch (error) {
      console.error('Profile update error:', error);
      return { error: handleAuthError(error) };
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};