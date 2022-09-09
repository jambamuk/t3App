import { useSession, signIn, signOut } from "next-auth/react"
import Home from "./home";

export default function Landing() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className="align-middle justify-center">
          <button onClick={() => signOut()}>Sign out</button>
        </div>
        <Home></Home>
      </>
    );
  }
  return (
    <div className="flex justify-center items-center flex-col h-full">
        Click to sign into your user account
      <button onClick={() => signIn("google")}>Sign in</button>
    </div>
  );
}