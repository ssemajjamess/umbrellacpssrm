import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  async function signup(email, password, firstName, lastName, role = 'Sales Rep') {
    // Mock signup for demo
    const mockUser = { uid: 'demo-user', email, displayName: `${firstName} ${lastName}` };
    setCurrentUser(mockUser);
    setUserRole(role);
    return { user: mockUser };
  }

  function login(email, password) {
    // Mock login for demo
    const mockUser = { uid: 'demo-user', email };
    setCurrentUser(mockUser);
    setUserRole('Admin');
    return Promise.resolve({ user: mockUser });
  }

  function logout() {
    // Mock logout for demo
    setCurrentUser(null);
    setUserRole(null);
    return Promise.resolve();
  }

  function resetPassword(email) {
    // Mock password reset for demo
    return Promise.resolve();
  }

  async function updateUserProfile(updates) {
    // Mock profile update for demo
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updates });
    }
    return Promise.resolve();
  }

  async function fetchUserRole(uid) {
    // Mock role fetch for demo
    return 'Admin';
  }

  useEffect(() => {
    // Mock auth state change for demo
    const mockUser = { uid: 'demo-user', email: 'admin@roofsbyumbrella.com' };
    setCurrentUser(mockUser);
    setUserRole('Admin');
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 