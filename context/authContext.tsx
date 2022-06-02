import {
  createContext,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import { supabase } from "../supabaseClient";
import { UserType } from "../types";

type Props = {
  children: JSX.Element;
};

type ContextType = {
  user: UserType | null;
  isLoggedIn: boolean;
  isNewUser: boolean;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

const AuthContext = createContext<ContextType>({} as ContextType);

function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!supabase.auth.user());
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    async function getUserData() {
      const user: any = await supabase.from("profiles").select();

      // If this user doesn't have a name, we consider them to be a new user
      if (!user?.data[0]?.name) {
        setIsNewUser(true);
      } else {
        setUser(user.data[0]);
      }
    }

    if (isLoggedIn) {
      getUserData();
    }

    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN" && session) {
        setIsLoggedIn(true);
      }

      if (event === "SIGNED_OUT") {
        setIsLoggedIn(false);
        setUser(null);
      }
    });
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isNewUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthContextProvider, useAuth };
