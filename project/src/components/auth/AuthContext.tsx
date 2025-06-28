import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'starter' | 'pro' | 'agency';
  contentPacksUsed: number;
  contentPacksLimit: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  sendPasswordReset: (email: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('contentcraft_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('contentcraft_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication - in real app, this would be an API call
    if (email === 'demo@contentcraft.ai' && password === 'Demo123!') {
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email: email,
        plan: 'pro',
        contentPacksUsed: 15,
        contentPacksLimit: 200,
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      localStorage.setItem('contentcraft_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock registration - in real app, this would be an API call
    const mockUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      plan: 'starter',
      contentPacksUsed: 0,
      contentPacksLimit: 50,
      createdAt: new Date().toISOString()
    };
    
    setUser(mockUser);
    localStorage.setItem('contentcraft_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('contentcraft_user');
  };

  const sendPasswordReset = async (email: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock password reset - in real app, this would send an email
    console.log(`Password reset email sent to ${email}`);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('contentcraft_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    sendPasswordReset,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};