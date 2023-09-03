"use client";

import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import ButtonPrimary from "../utils-components/ButtonPrimary";
import Input from "../utils-components/Input";

const isValidUsername = (text: string) => {
  let pattern = /^[a-zA-Z0-9_]+$/;
  return pattern.test(text);
};

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signUp } = useAuth();
  const { loading, authError } = useContext(AuthenticationContext);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setUsername("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  useEffect(() => {
    authError && setError(authError);
  }, [authError]);

  useEffect(() => {
    if (username?.trim() && !isValidUsername(username)) {
      setError("Username can only contain alphabets, numbers and underscore.");
    } else if (
      password.trim() &&
      confirmPassword.trim() &&
      password !== confirmPassword
    ) {
      setError("Password and confirm password should match.");
    } else {
      setError("");
    }
  }, [username, password, confirmPassword]);

  const enableSignUp = (): boolean => {
    return Boolean(
      username &&
        name.trim() &&
        password &&
        confirmPassword &&
        password === confirmPassword &&
        isValidUsername(username)
    );
  };

  const enableSignIn = (): boolean => {
    return Boolean(username && password);
  };

  const handleAuth = () => {
    if (isSignUp) {
      if (enableSignUp()) {
        signUp(username, name, password);
      }
    } else {
      if (enableSignIn()) {
        signIn(username, password);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-gray-500 text-4xl mb-16 font-light">
        Art<span className="text-pink-700">Hub</span>
      </div>

      <div className="flex flex-col items-center">
        <Input
          value={username}
          setValue={setUsername}
          type="text"
          placeholder="Username"
          classes="w-96 mb-3"
        />
        {isSignUp && (
          <Input
            value={name}
            setValue={setName}
            type="text"
            placeholder="Name"
            classes="w-96 mb-3"
          />
        )}
        <Input
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="Password"
          classes="w-96 mb-3"
        />
        {isSignUp && (
          <Input
            value={confirmPassword}
            setValue={setConfirmPassword}
            type="password"
            placeholder="Confirm Password"
            classes="w-96"
          />
        )}
      </div>

      {error && (
        <div className="w-96 mt-5 text-pink-700 text-xs border border-pink-700 rounded p-1">
          Error: {error}
        </div>
      )}

      <ButtonPrimary
        title={loading ? "Loading..." : isSignUp ? "Create Account" : "Login"}
        classes="w-96 mb-5 mt-10"
        onClick={handleAuth}
        disabled={isSignUp ? !enableSignUp() : !enableSignIn}
      />

      <div className="text-gray-500" onClick={toggleForm}>
        {isSignUp ? "Already have an account?" : " New to ArtHub?"}
        <span className="text-pink-700 cursor-pointer ml-1">
          {isSignUp ? "Log In" : " Create Account"}
        </span>
      </div>
    </div>
  );
};

export default AuthForm;
