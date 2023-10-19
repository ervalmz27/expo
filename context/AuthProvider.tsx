import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSegments, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  token: string;
};

type AuthType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthType>({
  user: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    session();
  }, [segments]);
  const session = async () => {
    const myToken = await AsyncStorage.getItem("my-token");
    if (!myToken) {
      return router.replace("/login");
    } else if (myToken != null && myToken != undefined) {
      router.replace("/home");
    }
  };
}

export function AuthProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  useProtectedRoute(user);

  const authContext: AuthType = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}
