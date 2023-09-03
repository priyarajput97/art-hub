"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";
import { IUser } from "../profile/page";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface State {
  loading: boolean;
  authError: string | null;
  user: IUser | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  authError: null,
  user: null,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    authError: null,
    user: null,
  });

  const fetchUser = async () => {
    try {
      setAuthState({
        user: null,
        authError: null,
        loading: true,
      });
      const token = getCookie("token");
      if (!token) {
        setAuthState({
          user: null,
          authError: null,
          loading: false,
        });
        return;
      }
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      setAuthState({
        user: response.data.data,
        authError: null,
        loading: false,
      });
    } catch (error: any) {
      setAuthState({
        user: null,
        authError: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
        {children}
      </AuthenticationContext.Provider>
    </ThemeProvider>
  );
}
