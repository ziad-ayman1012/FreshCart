import { useFormik } from "formik";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
    const [isClicked, setIsClicked] = useState(false)
    const navigate =useNavigate()
  let user = {
    email: "",
  };
    function handleForgetPass(values) {
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
            .then((res) => {
                console.log(res.data);
                setIsClicked(true)
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/login')
                } , 2000)

                
            })
            .catch((err) => {
                console.log(err);
                setIsClicked(false)
                toast.error(err.data.message)
            
        })
}
  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: handleForgetPass,
  });
    
  return (
    <>
      <div className=" py-48 container mx-auto px-20">
        <h3 className="text-3xl font-semibold text-emerald-400 text-center pb-6">
          Enter Your Email:
        </h3>

        <form
          onSubmit={registerFormik.handleSubmit}
          className="max-w-md mx-auto"
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
              placeholder=" "
              required
            />
            {registerFormik.errors.email && registerFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Danger alert!</span>{" "}
                {registerFormik.errors.email}
              </div>
            ) : (
              ""
            )}
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-500 peer-focus:dark:text-emeborder-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              User mail
            </label>
          </div>


          <button
            type="submit"
            className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            {!isClicked ? (
              "Send"
            ) : (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )}
          </button>
        </form>
      </div>
    </>
  );
}
