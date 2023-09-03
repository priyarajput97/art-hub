import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const router = useRouter();

  const signIn = async (username: string, password: string) => {
    try {
      setAuthState({
        user: null,
        authError: null,
        loading: true,
      });
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          username,
          password,
        }
      );
      setAuthState({
        user: response.data,
        authError: null,
        loading: false,
      });
      router.push("/");
    } catch (error: any) {
      setAuthState({
        user: null,
        authError: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const signUp = async (username: string, name: string, password: string) => {
    try {
      setAuthState({
        user: null,
        authError: null,
        loading: true,
      });
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          username,
          name,
          password,
        }
      );
      setAuthState({
        user: response.data,
        authError: null,
        loading: false,
      });
      router.push("/");
    } catch (error: any) {
      setAuthState({
        user: null,
        authError: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const editProfile = async (name: string, bio: string) => {
    try {
      setAuthState({
        user: null,
        authError: null,
        loading: true,
      });
      const response = await axios.post("http://localhost:3000/api/auth/edit", {
        name,
        bio,
      });
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

  return {
    signIn,
    signUp,
    editProfile,
  };
};

export default useAuth;
