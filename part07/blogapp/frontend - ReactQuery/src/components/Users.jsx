import { useEffect, useState } from 'react'
import { getAllUsers } from '../services/users'
import { Link } from 'react-router-dom'
import { useUsers, useUsersDispatch } from '../usersContext'

const Users = () => {
  const users = useUsers()
  const dispatch = useUsersDispatch()

  useEffect(() => {
    (async () => {
      const initialUsers = await getAllUsers()
      dispatch({ type: 'set', payload: initialUsers })
    })()
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs Added</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
