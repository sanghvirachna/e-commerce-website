import React, { useEffect } from 'react'
import {signOutAsync} from './authSlice'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from './authSlice'

const Logout = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)

    useEffect(() => {
       dispatch( signOutAsync())
    })
  return (
    <div>
      {!user && <Navigate to='/login' replace={true}></Navigate>}
    </div>
  )
}

export default Logout
