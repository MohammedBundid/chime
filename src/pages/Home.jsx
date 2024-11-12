import { useAuth } from "../hooks/useAuth"

const Home = () => {
    const { user } = useAuth();

    if(user) return <p>logged in {user.email}</p>
  return (
    <div>chats Home</div>
  )
}

export default Home