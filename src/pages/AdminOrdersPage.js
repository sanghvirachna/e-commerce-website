import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminOrder from '../features/admin/AdminOrder'

const AdminOrdersPage = () => {
  return (
    <div>
      <Navbar>
      <AdminOrder></AdminOrder>
      </Navbar>
    </div>
  )
}

export default AdminOrdersPage