import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User, AuthError } from 'firebase/auth';
import { doc, getDocFromServer } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { toast } from 'sonner';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  
  if (errInfo.error.includes('insufficient permissions')) {
    toast.error("Access Denied", {
      description: "You don't have permission to perform this action."
    });
  } else if (errInfo.error.includes('offline')) {
    toast.error("Network Error", {
      description: "Synchronizing with neural cloud failed. Check connection."
    });
  }
  
  throw new Error(JSON.stringify(errInfo));
}

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
        if (error?.code === 'permission-denied') {
          return;
        }
        
        if (error?.message?.includes('offline') || error?.code === 'unavailable') {
          toast.error("System Offline", {
            description: "Biometric cloud sync is unavailable. Running in local mode."
          });
        }
      }
    };
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    }, (error) => {
      console.error("Auth state change error:", error);
      toast.error("Identity Error", {
        description: "Failed to verify biometric signature."
      });
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    const toastId = toast.loading("Verifying identity...");
    try {
      await signInWithPopup(auth, provider);
      toast.success("Identity Verified", { id: toastId });
    } catch (error: any) {
      console.error("Sign in error:", error);
      const authError = error as AuthError;
      
      let message = "Neural link failed.";
      let description = "An unknown error occurred during authentication.";
      
      if (authError.code === 'auth/popup-blocked') {
        message = "Link Blocked";
        description = "Identity popup was blocked by the browser.";
      } else if (authError.code === 'auth/popup-closed-by-user') {
        message = "Link Aborted";
        description = "Authentication sequence was terminated by user.";
      } else if (authError.code === 'auth/network-request-failed') {
        message = "Network Failure";
        description = "Could not reach biometric servers.";
      }

      toast.error(message, { id: toastId, description });
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      toast.message("Identity session closed.");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

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
