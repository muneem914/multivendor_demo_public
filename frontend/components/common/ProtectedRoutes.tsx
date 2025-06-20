"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { RootState } from "../../lib/redux/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        router.push("/login");
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
      }
    }
  }, [user, isAuthenticated, isLoading, router, allowedRoles]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated || !user) {
    return <Loader />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
