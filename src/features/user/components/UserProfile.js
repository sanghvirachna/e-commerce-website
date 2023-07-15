import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser, updateUserAsync } from '../../auth/authSlice'
import { useDispatch } from 'react-redux'
import { set, useForm } from 'react-hook-form';


const UserProfile = () => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }, reset
    } = useForm();

    const user = useSelector(selectLoggedInUser)
    const dispatch = useDispatch()
    const [selectedEditIndex, setSelectedEditIndex] = useState(-1)
    const [showAddAddressForm,setShowAddAddressForm] = useState(false)
    console.log(user)
    const handleEdit = (addressUpdate, index) => {
        const newUser = { ...user, addresses: [...user.addresses] }
        newUser.addresses.splice(index, 1, addressUpdate)
        dispatch(updateUserAsync(newUser))
        setSelectedEditIndex(-1)

    }
    const handleRemove = (e, index) => {
        const newUser = { ...user, addresses: [...user.addresses] }
        newUser.addresses.splice(index, 1)
        dispatch(updateUserAsync(newUser))
    }
    const handleEditForm = (index) => {
        setSelectedEditIndex(index)
        const address = user.addresses[index]
        setValue('name', address.name)
        setValue('email', address.email)
        setValue('phone', address.phone)
        setValue('state', address.state)
        setValue('street', address.street)
        setValue('city', address.city)
        setValue('pincode', address.pincode)
        setValue('country', address.country)
    }
    const handleAdd = (address) => {
        const newUser = { ...user, addresses: [...user.addresses,address] }
        dispatch(updateUserAsync(newUser))
        setShowAddAddressForm(false)
        
    }
    //TODO : WE will add the payment method later on backend
    return (
        <div>
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                        Name : {user.name}
                    </h1>
                    <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                        Email : {user.email}
                    </h3>
                    <div className='border-t border-gray-200 px-4 sm:px-6'>

                        <p className='mt-0.5 my-3 text-bg text-gray-600  text-2xl'>Your addresses</p>
                        <ul role="list" className="divide-y my-5 py-5 divide-gray-100">
                            {user.addresses.map((address, index) => (
                                <div>
                                    {selectedEditIndex === index ? <form className='bg-white px-5 py-10 mt-12' onSubmit={handleSubmit((data) => {
                                        handleEdit(data, index)
                                        reset()
                                    })}
                                    >
                                        <div className="space-y-12">

                                            <div className="border-b border-gray-900/10 pb-12">
                                                <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Full Name
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                {
                                                                ...register('name', {
                                                                    required: 'Name is required'
                                                                })
                                                                }
                                                                id="name"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Email address
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="email"
                                                                {
                                                                ...register('email', {
                                                                    required: 'Email is required'
                                                                })
                                                                }

                                                                type="email"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Phone number
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="phone"
                                                                {
                                                                ...register('phone', {
                                                                    required: 'Mobile No. is required'
                                                                })
                                                                }

                                                                type="tel"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Country
                                                        </label>
                                                        <div className="mt-2">
                                                            <select
                                                                id="country"
                                                                {
                                                                ...register('country', {
                                                                    required: 'COuntry is required'
                                                                })
                                                                }
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                            >
                                                                <option>India</option>
                                                                <option>United States</option>
                                                                <option>Canada</option>
                                                                <option>Mexico</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-full">
                                                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Street
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                {
                                                                ...register('street', {
                                                                    required: 'Street is required'
                                                                })
                                                                }

                                                                id="street"
                                                                autoComplete="street-address"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 sm:col-start-1">
                                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                            City
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                {
                                                                ...register('city', {
                                                                    required: 'City is required'
                                                                })
                                                                }

                                                                id="city"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2">
                                                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                            State / Province
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                {
                                                                ...register('state', {
                                                                    required: 'State is required'
                                                                })
                                                                }
                                                                id="region"

                                                                autoComplete="address-level1"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2">
                                                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                            ZIP / Postal code
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                {
                                                                ...register('pincode', {
                                                                    required: 'pincode is required'
                                                                })
                                                                }

                                                                id="pincode"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                                <button
                                                    onClick={e => setSelectedEditIndex(-1)}
                                                    type="submit"
                                                    className="rounded-md bg-white-600 text-black px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-white-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                > Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Edit Address
                                                </button>
                                            </div>

                                        </div>
                                    </form> : null}
                                    <li key={address.index} className="flex justify-between gap-x-6 py-5 border-solid border-2 px-5 border-gray-200">
                                        <div className="flex gap-x-4">
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.city} - {address.pincode}</p>
                                            </div>
                                        </div>
                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm leading-6 text-gray-900">Phone : {address.phone}</p>
                                        </div>
                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                            <button
                                                onClick={e => handleEditForm(index)}
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={e => handleRemove(e, index)}
                                                type="button"
                                                className="font-medium text-red-600 hover:text-red-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </li>
                                </div>
                            ))}
                        </ul>
                        <button
                            onClick={(e) => setShowAddAddressForm(!showAddAddressForm)}
                            type="submit" 
                            className="rounded-md bg-green-600  my-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add New Address
                        </button>
                        {showAddAddressForm ? <form className='bg-white px-5 py-10 mt-12' onSubmit={handleSubmit((data) => {
                                        handleAdd(data)
                                        reset()
                                    })}
                                    >
                                        <div className="space-y-12">

                                            <div className="border-b border-gray-900/10 pb-12">
                                                <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Full Name
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                {
                                                                ...register('name', {
                                                                    required: 'Name is required'
                                                                })
                                                                }
                                                                id="name"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Email address
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="email"
                                                                {
                                                                ...register('email', {
                                                                    required: 'Email is required'
                                                                })
                                                                }

                                                                type="email"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Phone number
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="phone"
                                                                {
                                                                ...register('phone', {
                                                                    required: 'Mobile No. is required'
                                                                })
                                                                }

                                                                type="tel"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Country
                                                        </label>
                                                        <div className="mt-2">
                                                            <select
                                                                id="country"
                                                                {
                                                                ...register('country', {
                                                                    required: 'COuntry is required'
                                                                })
                                                                }
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                            >
                                                                <option>India</option>
                                                                <option>United States</option>
                                                                <option>Canada</option>
                                                                <option>Mexico</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-full">
                                                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Street
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                {
                                                                ...register('street', {
                                                                    required: 'Street is required'
                                                                })
                                                                }

                                                                id="street"
                                                                autoComplete="street-address"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 sm:col-start-1">
                                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                            City
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                {
                                                                ...register('city', {
                                                                    required: 'City is required'
                                                                })
                                                                }

                                                                id="city"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2">
                                                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                            State / Province
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                {
                                                                ...register('state', {
                                                                    required: 'State is required'
                                                                })
                                                                }
                                                                id="region"

                                                                autoComplete="address-level1"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2">
                                                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                            ZIP / Postal code
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                {
                                                                ...register('pincode', {
                                                                    required: 'pincode is required'
                                                                })
                                                                }

                                                                id="pincode"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                                <button
                                                    onClick={e => {setShowAddAddressForm(false) ; setSelectedEditIndex(-1)}}
                                                    type="submit"
                                                    className="rounded-md bg-white-600 text-black px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-white-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                > Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Add Address
                                                </button>
                                            </div>

                                        </div>
                                    </form> : null}
                                    
                    </div>
                </div>


            </div>

        </div>
    )
}

export default UserProfile
