import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import Login from "./login";

export default function Landing() {
  const { data: session } = useSession();
  console.log(session?.user?.image)
  if (session) {
    return (
      <>
          <div className="flex w-full justify-evenly">
            <div className="flex">
              < Link href="/" >
                <a>
                  <Image
                    src="/home-button.svg"
                    width={20}
                    height={20}
                    alt="home button" />
                </a>
              </Link >
            </div>

            <div className="flex">
              <Image
                src={session.user?.image} 
                alt="Picture of the author"
                width={20}
                height={20}
              />
              <button onClick={() => signOut()}>Sign out</button>
            </div>
          </div>
          <Login></Login>
      </>
    );
  }
  return (
    <>
        <button onClick={() => signIn("google")} type="button" className="login-with-google-btn" >
          Sign in with Google
        </button>
    </>
  );
}
