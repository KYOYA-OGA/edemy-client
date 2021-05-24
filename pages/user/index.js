import { useContext } from 'react'
import { Context } from '../../context'
import UserRoute from '../../components/routes/UserRoute'

const UserIndexPage = () => {
  // state
  const {
    state: { user },
  } = useContext(Context)

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">User Dashboard</h1>
    </UserRoute>
  )
}

export default UserIndexPage
