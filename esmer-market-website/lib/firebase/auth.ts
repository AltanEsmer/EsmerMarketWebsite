import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  getIdToken
} from 'firebase/auth';
import { auth as firebaseAuth } from './firebaseConfig';

// Function to set a cookie
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

// Function to delete a cookie
const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  console.log("Auth initialized:", !!firebaseAuth);
  console.log("Email:", email);
  
  if (!firebaseAuth) {
    console.error("Firebase auth not initialized");
    return { user: null, error: 'Firebase auth not initialized' };
  }
  
  try {
    console.log("Attempting to sign in...");
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    console.log("Sign in successful:", userCredential.user.email);
    
    // Get the ID token and store it in a cookie
    const idToken = await getIdToken(userCredential.user);
    console.log("ID token obtained");
    
    // Set the ID token as a cookie (expires in 7 days)
    setCookie('firebase-id-token', idToken, 7);
    console.log("ID token stored in cookie");
    
    return { user: userCredential.user, error: null };
  } catch (error: unknown) {
    console.error("Error signing in:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    return { 
      user: null, 
      error: (error as any)?.code === 'auth/invalid-credential' 
        ? 'E-posta veya şifre yanlış.' 
        : 'Giriş yapılırken bir hata oluştu.'
    };
  }
};

// Sign out
export const signOut = async () => {
  if (!firebaseAuth) return { success: false, error: 'Firebase auth not initialized' };
  
  try {
    await firebaseSignOut(firebaseAuth);
    // Delete the ID token cookie
    deleteCookie('firebase-id-token');
    console.log("Signed out and cleared cookies");
    return { success: true, error: null };
  } catch (error: unknown) {
    console.error("Error signing out:", error);
    return { success: false, error: 'Çıkış yapılırken bir hata oluştu.' };
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  if (!firebaseAuth) return null;
  return firebaseAuth.currentUser;
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!firebaseAuth) {
    callback(null);
    return () => {};
  }
  
  // Set up the auth state listener
  const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
    if (user) {
      // User is signed in, get and store the ID token
      try {
        const idToken = await getIdToken(user);
        setCookie('firebase-id-token', idToken, 7);
      } catch (error) {
        console.error("Error getting ID token:", error);
      }
    } else {
      // User is signed out, clear the ID token cookie
      deleteCookie('firebase-id-token');
    }
    
    // Call the callback with the user
    callback(user);
  });
  
  return unsubscribe;
}; 