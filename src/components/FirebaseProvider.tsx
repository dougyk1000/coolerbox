import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { doc, getDocFromServer } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error: any) {
        // If we get "permission-denied", it means we ARE connected to the server,
        // but our security rules (correctly) blocked the read to a non-existent path.
        if (error?.code === 'permission-denied') {
          console.debug("Firebase connection verified (permission denied as expected).");
          return;
        }
        
        console.error("Firebase connection test failed:", error?.code, error?.message);
        
        if (error?.message?.includes('offline') || error?.code === 'unavailable') {
          console.error("Connection appears unavailable. Retrying with different transport might be handled by the SDK.");
        }
      }
    };
    testConnection();

    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOut = () => auth.signOut();

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useFirebase must be used within FirebaseProvider');
  return context;
};
