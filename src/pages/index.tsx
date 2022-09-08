import { trpc } from "../utils/trpc";
import Head from 'next/head'

export default function Home() {
  const users = trpc.useQuery(["example.getUsers"]);
  const utils = trpc.useContext()
  const deleteMutation = trpc.useMutation(["example.delete"], {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(["example.getUsers"]);
    },
  });
  const addUserMutation = trpc.useMutation(["example.add"], {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(["example.getUsers"]);
    },
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
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>InTouch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        {users.data?.map((user) => (
          <div key={user.id} onClick={() => deleteUser(user.id)}>
            <h3 >Name: {user.name}</h3>
            <p >Email: {user.email}</p>
            <hr />
          </div>
        ))}

      <main>
        <h1>
          Add user
        </h1>
        <form onSubmit={addUser} method="post">
          <label>First name:</label>
          <input type="text" id="name" name="name" />
          <label>email:</label>
          <input type="text" id="email" name="email" />
          <button type="submit">Submit</button>
        </form>
      </main>

    </div>
  )
}
