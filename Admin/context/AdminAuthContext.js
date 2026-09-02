'use client';

import { createContext, useContext, useState } from 'react';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  return <AdminAuthContext.Provider value={{ admin, setAdmin }}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() { return useContext(AdminAuthContext); }
export default AdminAuthContext;
