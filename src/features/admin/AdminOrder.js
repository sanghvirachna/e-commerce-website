import React, { useEffect, useState } from 'react'
import { ITEM_PER_PAGE, discountedPrice } from '../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from '../order/orderSlice';
import { EyeIcon, PencilIcon , ArrowUpIcon , ArrowDownIcon } from '@heroicons/react/20/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const AdminOrder = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders)
  console.log(orders)
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({})

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  }
  const handleShow = () => {
    console.log('show')
  }
  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value }
    dispatch(updateOrderAsync(updatedOrder))
    setEditableOrderId(-1)
  }
  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-600'
      case 'dispatched':
        return 'bg-blue-200 text-blue-600'
      case 'delivered':
        return 'bg-green-200 text-green-600'
      case 'cancelled':
        return 'bg-red-200 text-red-600'
      default:
        return 'bg-yellow-200 text-yellow-600'
    }
  }
  const handlePage = (page) => {
    setPage(page);


  }
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_PAGE };

    dispatch(fetchAllOrdersAsync({ sort, pagination }));

  }, [dispatch, page, sort]);

  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <div className="  flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Order Number</th>
                      <th className="py-3 px-6 text-left">Items</th>
                      <th className="py-3 px-6 text-center"
                        onClick={(e) => handleSort({
                          sort: 'totalAmount',
                          order: sort?._order == 'asc' ? 'desc' : 'asc',
                        })}
                        >
                          Total Amount {' '}
                          {sort._order === 'asc' ?<ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>:
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>}
                      </th>
                      <th className="py-3 px-6 text-center">Shipping Address</th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {orders.map((order) => (
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2"></div>
                            <span className="font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {order.items.map((item) => (
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item.thumbnail}
                                />
                              </div>{item.title} - {item.quantity} -${discountedPrice(item)}

                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            ${order.totalAmount}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className=" items-center justify-center">
                            <strong className="text-black font-semibold">{order.selectedAddress.name}
                            </strong>

                            <div>{order.selectedAddress.street},</div>
                            <div>{order.selectedAddress.city},</div>
                            {order.selectedAddress.state},
                            {order.selectedAddress.country},
                            {order.selectedAddress.pincode}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          {order.id !== editableOrderId ? (<span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                            {order.status}
                          </span>) :
                            <select onChange={e => handleUpdate(e, order)}>
                              <option value="pending">Pending</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-6  mr-2 transform hover:text-purple-500 hover:scale-120">
                              <EyeIcon className="w-6 h-6" onClick={e => handleShow}></EyeIcon>
                            </div>
                            <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                              <PencilIcon className='w-6 h-6' onClick={e => handleEdit(order)}></PencilIcon>
                            </div>

                          </div>
                        </td>
                      </tr>

                    ))}


                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalOrders} />

      </div>

    </>
  )
}

function Pagination({ page, setPage, handlePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEM_PER_PAGE)
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : totalPages)}

          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPages ? page + 1 : 1)}

          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page - 1) * ITEM_PER_PAGE + 1}</span> to{' '}
            <span className="font-medium">{page * ITEM_PER_PAGE > totalItems ? totalItems : page * ITEM_PER_PAGE}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : totalPages)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: totalPages }).map((el, index) =>
              <div
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`relative z-10 cursor-pointer inline-flex items-center ${index + 1 === page ? 'bg-indigo-600 text-white' : 'text-indigo-400 bg-white'} px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            )

            }
            <div
              onClick={(e) => handlePage(page < totalPages ? page + 1 : 1)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}


export default AdminOrder
