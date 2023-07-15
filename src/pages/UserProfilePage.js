import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/components/UserProfile'

const UserProfilePage = () => {
  return (
    <div>
      <Navbar>
      <h1 className='text-2xl font-bold text-gray-900 text-center'>My Profile</h1>

        <UserProfile></UserProfile>
      </Navbar>
    </div>
  )
}

export default UserProfilePage
