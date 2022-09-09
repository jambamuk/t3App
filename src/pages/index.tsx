import { useSession, signIn, signOut } from "next-auth/react"
import Home from "./home";

export default function Landing() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
      <div className="min-h-full">
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      <Home></Home>
      </>
    );
  }
  return (
    <div>
      Click to sign into your user account <br />
      <button onClick={() => signIn("google")}>Sign in</button>
    </div>
  );
}