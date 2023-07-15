import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBrands } from './productListSlice'
import { selectCategories } from './productListSlice'
import { useForm } from "react-hook-form";

export default function ProductForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm();

    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    return (
        <form>
            <div className="space-y-12 bg-white p-12 m-10 sm:p-5 m-5">
                <div className="border-b border-gray-900/10 pb-12 ">
                    <h2 className="text-4xl font-semibold leading-7 text-gray-900 pb-2 ">Add Product</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* 
             {
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      ]
    },
    */}
                        <div className="sm:col-span-6">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {
                                        ...register('title', {
                                            required: 'Title is required'
                                        })
                                        }
                                        id="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter product title"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="desription" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    {
                                    ...register('description', {
                                        required: 'Description is required'
                                    })
                                    }
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Enter product description"
                                />
                            </div>
                        </div>


                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {
                                        ...register('price', {
                                            required: 'Price is required'
                                        })
                                        }
                                        id="price"
                                        placeholder="Enter product price"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="discounted-price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Discounted Percentage
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {
                                        ...register('discountedPercentage')
                                        }
                                        id="discountedPercentage"
                                        placeholder="Enter product discounted percentage"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select  {
                                        ...register('brand', {
                                            required: 'Brand is required'
                                        })
                                    }
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option>--choose category--</option>
                                        {categories.map(category => <option value={category.value}>{category.label}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <select {
                                        ...register('category', {
                                            required: 'Category is required'
                                        })
                                    }
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option>--choose brand--</option>
                                        {brands.map(brand => <option value={brand.value}>{brand.label}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                    Stock
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {
                                        ...register('stock', {
                                            required: 'Stock is required'
                                        })
                                        }
                                        id="stock"
                                        placeholder="Enter product stock"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="thumbail" className="block text-sm font-medium leading-6 text-gray-900">
                                    Thumbnail
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                        <input
                                            type="text"
                                            {
                                            ...register('thumbnail', {
                                                required: 'Thumbnail is required'
                                            })
                                            }
                                            id="thumbnail"
                                            placeholder="Enter product thumbnail's url"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div><br></br>
                                <div className="sm:col-span-4">
                                    <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                        Image 1
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                            <input
                                                type="text"
                                                {
                                                ...register('image1', {
                                                    required: 'image url is required'
                                                })
                                                }
                                                id="image1"
                                                placeholder="Enter product image url"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div><br></br>
                                <div className="sm:col-span-4">
                                    <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                        Image 2
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                            <input
                                                type="text"
                                                {
                                                ...register('image2', {
                                                    required: 'image url is required'
                                                })
                                                }
                                                id="image2"
                                                placeholder="Enter product image url"

                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div><br></br>
                                <div className="sm:col-span-4">
                                    <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                        Image 3
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                            <input
                                                type="text"
                                                {
                                                ...register('image3', {
                                                    required: 'image url is required'
                                                })
                                                }
                                                id="image3"
                                                placeholder="Enter product image url"

                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>

                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Product
                    </button>
                </div>
            </div>

        </form>
    )
}
