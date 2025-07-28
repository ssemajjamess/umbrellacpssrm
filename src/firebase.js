// Firebase configuration - Demo mode for initial deployment
// Set up real Firebase later for full functionality

// Mock Firebase functions for demo mode
const mockAuth = {
  signInWithEmailAndPassword: () => Promise.resolve({ user: { uid: 'demo-user' } }),
  signOut: () => Promise.resolve(),
  onAuthStateChanged: (callback) => callback({ uid: 'demo-user' })
};

const mockDb = {
  collection: () => ({
    add: () => Promise.resolve({ id: 'demo-id' }),
    doc: () => ({
      set: () => Promise.resolve(),
      get: () => Promise.resolve({ data: () => ({}) }),
      update: () => Promise.resolve()
    })
  })
};

// Export mock Firebase for now
export const auth = mockAuth;
export const db = mockDb;
export const storage = null;
export const firebase = null;

// TODO: Replace with real Firebase when environment variables are set up
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// }; 
