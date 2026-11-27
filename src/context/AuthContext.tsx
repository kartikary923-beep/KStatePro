import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AppUser>;
  signup: (name: string, email: string, password: string) => Promise<AppUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Demo credentials used until Supabase Auth is wired in.
interface DemoSeed {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

const DEMO_USERS: DemoSeed[] = [
  { id: 'u-1', name: 'Aarav Sharma', email: 'user@kstatePro.in', password: 'password', role: 'user' },
  { id: 'a-1', name: 'Admin', email: 'admin@kstatePro.in', password: 'admin123', role: 'admin' },
];

interface StoredUser extends AppUser {
  password: string;
}

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem('kstatePro_users');
    if (raw) return JSON.parse(raw) as StoredUser[];
  } catch {
    // ignore corrupt storage
  }
  const seeded = DEMO_USERS.map((u) => ({ ...u }));
  localStorage.setItem('kstatePro_users', JSON.stringify(seeded));
  return seeded;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('kstatePro_session');
      if (raw) setUser(JSON.parse(raw) as AppUser);
    } catch {
      // ignore corrupt storage
    }
    setLoading(false);
  }, []);

  const persistSession = (u: AppUser | null) => {
    setUser(u);
    if (u) sessionStorage.setItem('kstatePro_session', JSON.stringify(u));
    else sessionStorage.removeItem('kstatePro_session');
  };

  const login = async (email: string, password: string): Promise<AppUser> => {
    await new Promise((r) => setTimeout(r, 400));
    const users = loadUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) throw new Error('Invalid email or password.');
    const { password: _pw, ...safe } = found;
    persistSession(safe);
    return safe;
  };

  const signup = async (name: string, email: string, password: string): Promise<AppUser> => {
    await new Promise((r) => setTimeout(r, 400));
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const newUser: StoredUser = {
      id: `u-${Date.now()}`,
      name,
      email,
      password,
      role: 'user',
    };
    localStorage.setItem('kstatePro_users', JSON.stringify([...users, newUser]));
    const { password: _pw, ...safe } = newUser;
    persistSession(safe);
    return safe;
  };

  const logout = () => persistSession(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
