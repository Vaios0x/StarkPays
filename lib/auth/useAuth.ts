"use client";

import { useUser, useAuth } from "@clerk/nextjs";

export function useAuthData() {
  const { user, isLoaded: userLoaded } = useUser();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();

  return {
    user,
    isSignedIn,
    isLoading: !userLoaded || !authLoaded,
  };
}
