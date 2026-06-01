import type {User} from '../../models'

const UserProfile = (props: { user: User }) => {
  const { user } = props
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

export default UserProfile

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