import type {User} from '../../models'

const UserProfiles = (props: { user: User }) => {
  const { user } = props
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

export default UserProfiles

export async function getServerSideProps(context: { params: { id: string } }): Promise<{ props: { user: User } }> {
  const { params } = context
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`) 
  
  const userData: User = await res.json()
  
  return {
    props: {
      user: userData
     }
  }
}