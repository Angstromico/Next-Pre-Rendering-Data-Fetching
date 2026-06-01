import { GetServerSideProps } from "next";
import Link from "next/link";
import type { User } from "../../models";

const UserList = ({ users }: { users: User[] }) => {
  return (
    <>
      <h1>User Profiles</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/user-profile/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserList;

export const getServerSideProps: GetServerSideProps<{
  users: User[];
}> = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return {
    props: { users },
  };
};
