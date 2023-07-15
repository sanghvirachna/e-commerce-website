import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrder from '../features/user/components/UserOrder'


const UserOrderPage = () => {
  return (
    <div>
      <Navbar>
        <h1 className='text-2xl font-bold text-gray-900 text-center'>My Orders</h1>
        <UserOrder></UserOrder>
      </Navbar>
    </div>
  )
}

export default UserOrderPage
