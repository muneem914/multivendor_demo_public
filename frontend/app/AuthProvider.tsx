"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetProfileQuery } from "../lib/redux/api/userApi";
import { clearUser, setLoading, setUser } from "../lib/redux/slices/authSlice";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetProfileQuery({});

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
      if (data && data.success) {
        dispatch(setUser(data.user));
      } else {
        dispatch(clearUser());
      }
    }
  }, [data, isLoading, isError, dispatch]);

  return <>{children}</>;
};

export default AuthProvider;