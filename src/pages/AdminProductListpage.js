import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductList from '../features/admin/AdminProductList'

const AdminProductListPage = () => {
  return (
    <div>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  )
}

export default AdminProductListPage
