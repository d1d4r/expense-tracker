import prisma from "@/lib/db/prisma";
const getAlluser = async () => {
  try {
    const allUsers = await prisma.user.findMany();
    return { allUsers };
  } catch (error) {
    return { error: true };
  }
};
export default async function Home() {
  const { allUsers, error } = await getAlluser();

  // if (error) {
  //   return <p className="bg-primary text-red-700">{JSON.stringify(error)}</p>;
  // }
  return (
    <main>
      {allUsers.map((user) => {
        return (
          <div key={user.id} className="text-white bg-black border">
            <p>{user.email}</p>
            <p>{user.username}</p>
          </div>
        );
      })}
    </main>
  );
}
