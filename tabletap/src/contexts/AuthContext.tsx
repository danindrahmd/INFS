// src/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type UserRole = 'customer' | 'staff' | 'owner';

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string, role: UserRole) => Promise<void>;
  registerWithEmail: (email: string, password: string, role: UserRole) => Promise<void>;
  loginWithGoogle: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Get user role from Firestore
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          setUserRole(userSnap.data().role as UserRole);
        }
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const saveUserRole = async (uid: string, role: UserRole) => {
    await setDoc(doc(db, 'users', uid), {
      role: role,
      createdAt: new Date(),
    }, { merge: true });
  };

  const loginWithEmail = async (email: string, password: string, role: UserRole) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await saveUserRole(userCredential.user.uid, role);
    } catch (error) {
      console.error("Error logging in with email", error);
      throw error;
    }
  };

  const registerWithEmail = async (email: string, password: string, role: UserRole) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserRole(userCredential.user.uid, role);
    } catch (error) {
      console.error("Error registering with email", error);
      throw error;
    }
  };

  const loginWithGoogle = async (role: UserRole) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserRole(result.user.uid, role);
    } catch (error) {
      console.error("Error logging in with Google", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  };

  const value = {
    user,
    userRole,
    loading,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};