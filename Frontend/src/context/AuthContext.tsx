"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { apiGetMe, apiLogout } from '@/lib/api';

export type UserRole = 'patient' | 'doctor' | 'hospital' | 'admin' | null;

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // On mount, check session using HTTP-only cookies
  useEffect(() => {
    async function verifySession() {
      try {
        const response = await apiGetMe();
        if (response?.data?.user) {
          setUser({
            id: response.data.user.id,
            name: response.data.user.full_name,
            email: response.data.user.email,
            role: response.data.user.role,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session verification failed", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    verifySession();
  }, [pathname]); // Also re-verify occasionally when routing (or handle specifically)

  const login = (userData: User) => {
    setUser(userData);
    
    // Route based on role
    if (userData.role === 'patient') {
      router.push('/dashboard');
    } else if (userData.role === 'doctor') {
      router.push('/doctor/settings');
    } else if (userData.role === 'hospital') {
      router.push('/hospital/dashboard');
    } else if (userData.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/');
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await apiLogout();
    } catch(err) {
      console.error("Logout failed", err);
    }
    setUser(null);
    setIsLoading(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
