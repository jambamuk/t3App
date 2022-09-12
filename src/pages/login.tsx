import { trpc } from "../utils/trpc";
import Head from 'next/head'
import Link from "next/link";

export default function Login() {
  const users = trpc.useQuery(["noAuthUser.getUsers"]);
  const utils = trpc.useContext()

  const deleteMutation = trpc.useMutation(["users.delete"], {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(["noAuthUser.getUsers"]);
    },
  });

  const addUserMutation = trpc.useMutation(["noAuthUser.add"], {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(["noAuthUser.getUsers"]);
    },
    onError(error) {
      console.log(error.data)
      console.log(error.data?.code)
    } 
    });

  function deleteUser(id: string) {
    deleteMutation.mutateAsync({
      id: id
    })
  }

  function addUser(e: any) {
    e.preventDefault()
    console.log(e)
    const $name: HTMLInputElement = (e as any).target.elements.name;
    const $email: HTMLInputElement = (e as any).target.elements.email;
      addUserMutation.mutateAsync(
        {
          name: $name.value,
          email: $email.value
        }
      ).catch()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-400" >
      <Head>
        <title>t3 app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="adviser-home" className="bg">
        <a>go to adviser</a>
      </Link>
      {addUserMutation.error?.message}
      {users.data?.map((user) => (
        <div key={user.id} onClick={() => deleteUser(user.id)} className="hover:bg-red-300">
          <hr />
          <h3 >Name: {user.name}</h3>
          <p >Email: {user.email}</p>
          <hr />
        </div>
      ))}

      <main className="flex flex-col items-center">
        <h1 className="m-2">
        </h1>
        <form onSubmit={addUser} method="post" className="flex flex-col">
          <label>First name:</label>
          <input type="name" id="name" name="name" className="bg-slate-300 m-2"/>

          <label>Email:</label>
          <input type="email" id="email" name="email" className="bg-slate-300 m-2"/>

          <button type="submit" className="rounded-md bg-slate-500 m-2">Submit</button>
          <button type="submit" className="rounded-md border border-slate-900 m-2">Forgot Password ?</button>
        </form>
      </main>

    </div>
  )
}