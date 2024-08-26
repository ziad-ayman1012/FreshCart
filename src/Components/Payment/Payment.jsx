


import { useFormik } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import { cartContext } from "./../../Context/CartContext";
import toast from "react-hot-toast";
import { Navigate,  } from "react-router-dom";


export default function PaymentCom() {
  
    const { cartId, upDateUi ,allProducts } = useContext(cartContext);
  const [isOnline, setIsOnline] = useState(false)

    
 
    
    function detecteAndCall(values) {
        if (isOnline) {
            onlinePayment(values);
        
        } else {
            cashPayment(values);
    }
}

    function cashPayment(values) {

        const shippingAddress = {
          shippingAddress:values
        };
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId} `,   shippingAddress, {
            headers: {
                token:localStorage.getItem('tkn')
            }
        }).then((res)=>{
            console.log(res);
            toast.success('Success', { duration: 2000 })
            upDateUi();
            
        })
        .catch((err)=>{
            console.log(err);
            toast.error('Error',{duration:2000})
            
        })
        
    }
    function onlinePayment(values) {

        const shippingAddress = {
          shippingAddress:values
        };
        axios
          .post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?`,
            shippingAddress,
            {
              headers: {
                token: localStorage.getItem("tkn"),
              },
              params: {
                url: "http://localhost:3335",
              },
            }
          )
          .then((res) => {
            console.log(res);
              toast.success("Success", { duration: 2000 });
              window.open(res.data.session.url, '_self');
              upDateUi();

          })
          .catch((err) => {
            console.log(err);
            toast.error("Error", { duration: 2000 });
          });
        
    }
 
  const paymentFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: detecteAndCall,
  });

  return (
    <>
      <div className=" py-48 container mx-auto ">
        {allProducts ? (
          <form
            onSubmit={paymentFormik.handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                onBlur={paymentFormik.handleBlur}
                onChange={paymentFormik.handleChange}
                value={paymentFormik.values.details}
                type="text"
                name="details"
                id="details"
                className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
                placeholder=" "
                required
              />
              {paymentFormik.errors.details && paymentFormik.touched.details ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">Danger alert!</span>{" "}
                  {paymentFormik.errors.details}
                </div>
              ) : (
                ""
              )}
              <label
                htmlFor="details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-500 peer-focus:dark:text-emeborder-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Details
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                onBlur={paymentFormik.handleBlur}
                onChange={paymentFormik.handleChange}
                value={paymentFormik.values.phone}
                type="text"
                name="phone"
                id="phone"
                className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
                placeholder=" "
                required
              />
              {paymentFormik.errors.phone && paymentFormik.touched.phone ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">Danger alert!</span>{" "}
                  {paymentFormik.errors.phone}
                </div>
              ) : (
                ""
              )}
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-500 peer-focus:dark:text-emeborder-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onBlur={paymentFormik.handleBlur}
                onChange={paymentFormik.handleChange}
                value={paymentFormik.values.city}
                type="text"
                name="city"
                id="city"
                className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
                placeholder=" "
                required
              />
              {paymentFormik.errors.city && paymentFormik.touched.city ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">Danger alert!</span>{" "}
                  {paymentFormik.errors.city}
                </div>
              ) : (
                ""
              )}
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-500 peer-focus:dark:text-emeborder-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City
              </label>
            </div>

            <button
              onClick={() => {
                setIsOnline(false);
              }}
              type="submit"
              className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Cash Order
            </button>
            <button
              onClick={() => {
                setIsOnline(true);
              }}
              type="submit"
              className="text-white mx-2 bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Online Payment
            </button>
          </form>
        ) : (
          <Navigate to="/home" />
        )}
      </div>
    </>
  );
}

