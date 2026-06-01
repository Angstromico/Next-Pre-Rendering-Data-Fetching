import { GetServerSideProps } from "next";
import type { User } from "../../models"

const UserProfile = ({ user }: { user: User }) => {
  return (
   <>
    <h1>{user.name}</h1>
    <p>{user.email}</p>
   </>   
  )
}

export default UserProfile


export const getServerSideProps: GetServerSideProps<{
  user: User;
}> = async (context) => {

  // Example fetch (replace with your real logic)
  const user: User = {
    id: '5',
    name: "John Doe",
    email: "john.doe@example.com"
  };

  return {
    props: { user },
  };
};
