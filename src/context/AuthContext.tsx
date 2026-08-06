import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/index.ts';

const ADMIN_USER: User = {
  id: 'usr-admin-1',
  name: 'Bava Ahsani',
  email: 'bava.ahsani@darulirshad.edu.in',
  role: 'admin',
  designation: 'Principal & General Class Incharge',
  phone: '+91 98470 22000',
  classTeacherOf: 'General Class (Grade 7 & 8 Combined)'
};

const TEACHER_USER: User = {
  id: 'usr-teacher-1',
  name: 'Faheem Muhammed Saquafi',
  email: 'faheem.s@darulirshad.edu.in',
  role: 'teacher',
  designation: 'Grade 7 Class Teacher',
  phone: '+91 98470 22001',
  classTeacherOf: 'Grade 7'
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('dise_auth_user');
    return saved ? JSON.parse(saved) : ADMIN_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('dise_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dise_auth_user');
    }
  }, [user]);

  const login = (email: string, role: UserRole) => {
    if (role === 'admin') {
      setUser({ ...ADMIN_USER, email: email || ADMIN_USER.email });
    } else {
      setUser({ ...TEACHER_USER, email: email || TEACHER_USER.email });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'admin') {
      setUser(ADMIN_USER);
    } else {
      setUser(TEACHER_USER);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user ? user.role : 'admin',
        login,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
