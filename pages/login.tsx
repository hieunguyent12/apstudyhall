import type { NextPage } from "next";
import { supabase } from "../supabaseClient";

const Login: NextPage = () => {
  const user = supabase.auth.user();
  const isLoggedIn = !!user;

  const loginWithGoogle = async () => {
    await supabase.auth.signIn({
      provider: "google",
    });
  };

  return (
    <div>
      {isLoggedIn ? (
        <p>You are already logged in!</p>
      ) : (
        <p onClick={loginWithGoogle}>Login</p>
      )}
    </div>
  );
};

export default Login;
