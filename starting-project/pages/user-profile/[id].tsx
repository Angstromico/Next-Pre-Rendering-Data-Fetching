import { GetServerSideProps } from "next";
import Link from "next/link";
import type { User } from "../../models";

const UserProfile = (props: { user: User }) => {
  const { user } = props;

  if (!user || !user.name) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <Link href="/user-profile">← Back to Users</Link>
      <h1>{user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps<{
  user: User;
}> = async (context) => {
  const { params } = context;
  const id = params?.id;

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const userData: User = await res.json();

  return {
    props: {
      user: userData,
    },
  };
};
