import React from 'react'
import { AuthProvider } from '../../../../app/context/authContext'

const ProfilePage = () => {
  const { user } = AuthProvider()

  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome to your profile page!</p>
      <h2>Name: {user.name}</h2>
      <h2>Email: {user.email}</h2>
    </div>
  )
}

export default ProfilePage