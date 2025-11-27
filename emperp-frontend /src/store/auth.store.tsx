import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  email: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const getEmailFromToken = (token: string | null) => {
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.sub || decoded.email || null;
  } catch (e) {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  email: getEmailFromToken(localStorage.getItem("token")),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token, email: getEmailFromToken(token) });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, email: null });
  },
}));
