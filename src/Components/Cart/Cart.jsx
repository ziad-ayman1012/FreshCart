import { useContext } from "react"
import { cartContext } from "../../Context/CartContext"
import toast from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";



export default function Cart() {
const {
  allProducts,
  numberCartItems,
  totalCartPrice,
  updateProductCount,
  deleteProduct,
  clearCart,
  } = useContext(cartContext);
  const navigate = useNavigate()
  function handleUpdateCount(id, newCount) {
    const flag = updateProductCount(id, newCount);
    if (flag) {
      toast.success('Success', {
        duration:2000,
      })
    }
    else {
      toast.error('Error', {
        duration:2000,
      })
    }
  }
  function handleDeleteProduct(id) {
    const flag = deleteProduct(id);
    if (flag) {
      toast.success('Success',{duration:2000})
    } else {
      toast.error("Error", { duration: 2000 });
    }
  }
  async function handleClearCart() {
    const flag = await clearCart();
    if (flag) {
      toast.success('The Cart Cleared Successfullly', { duration: 2000 })
      setTimeout(() => {
        navigate('/home')
      },2000)
    } else {
      toast.error('Error')
    }
  }

  

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-24 pb-12 px-20 ">
        {allProducts ? (
          <div className="">
            <div className="flex items-center justify-between py-5">
              
                
                  <Link to="/payment">
                    <button className="bg-green-400 py-3 px-5 text-white  rounded-lg">
                      <span>Go To Payment</span>
                    </button>
                  </Link>
                
               
                  <button
                    onClick={handleClearCart}
                    className="bg-green-400 py-3 px-5 text-white  rounded-lg"
                  >
                    <i className="fa-solid fa-trash-can text-lg pe-2"></i>
                    <span>Clear Your Cart</span>
                  </button>
               
             
            </div>
            <div className="alertMessages">
              <div
                className="flex text-center items-center  p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Number Of Cart Items:</span>{" "}
                  {numberCartItems}
                </div>
              </div>
              <div
                className="flex  items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="">
                  <span className="font-medium">Total Price:</span>{" "}
                  {totalCartPrice} LE
                </div>
              </div>
            </div>
            <table className="w-full text-center rounded-lg my-11  text-sm  rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allProducts?.map((product) => (
                  <tr
                    key={product.product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title.split(" ", 5).join(" ")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          disabled={product.count === 1}
                          onClick={() =>
                            handleUpdateCount(
                              product.product._id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <input
                            type="number"
                            id="first_product"
                            className="bg-gray-50 w-14 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={product.count}
                            required
                          />
                        </div>
                        <button
                          onClick={() =>
                            handleUpdateCount(
                              product.product._id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        onClick={() => handleDeleteProduct(product.product._id)}
                        className="font-medium flex items-center"
                      >
                        <i className="fa-solid fa-trash-can text-xl text-red-500 px-2"></i>
                        <span className="text-gray-900">Remove</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-52 flex justify-center items-center ">
            <div className="alertMessages flex flex-col w-[75%] text-center">
              <div
                className="flex text-center items-center  p-4 mb-4 text-sm w-full text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Number Of Cart Items:</span>{" "}
                  {numberCartItems}
                </div>
              </div>
              <div
                className="flex  items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="">
                  <span className="font-medium">Total Price:</span>{" "}
                  {totalCartPrice} LE
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
