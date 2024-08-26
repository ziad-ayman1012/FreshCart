

import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { authContext } from './../../Context/AuthContext';
import { cartContext } from './../../Context/CartContext';

export default function Login() {
  const {setToken} = useContext(authContext)
  const { getProducts }=useContext(cartContext)
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  let user = {
    email: "",
    password: "",
  };
  function login(values) {
    setIsClicked(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        console.log(res.data.token);
        setToken(res.data.token);
        localStorage.setItem('tkn', res.data.token)
        
        getProducts();

        setIsSuccess(true);
        setIsClicked(false);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/home");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
        setIsClicked(false);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
  }
  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: login,
    validationSchema: Yup.object().shape({
      email: Yup.string().required("email is required").email("not valid"),
      password: Yup.string()
        .required("password is required")
        .min(3, "minmum must be 3 character")
        .max(8, "maximum must be 12 character"),
    }),
  });

  return (
    <>
      <div className=" py-48 container mx-auto ">
        {isSuccess ? (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">Welcome Back</span>
          </div>
        ) : (
          ""
        )}
        {errorMessage ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{errorMessage}</span>
          </div>
        ) : (
          ""
        )}
        <h3 className="text-3xl font-semibold text-emerald-400 text-center pb-6">
          Login Now:
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

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.password}
              type="password"
              name="password"
              id="password"
              className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
              placeholder=" "
              required
            />
            {registerFormik.errors.password &&
            registerFormik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Danger alert!</span>{" "}
                {registerFormik.errors.password}
              </div>
            ) : (
              ""
            )}
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-500 peer-focus:dark:text-emeborder-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            {!isClicked ? (
              "Submit"
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

        <Link to="/forgetPass" className="flex items-center justify-center">
          <p className="text-lg text-emerald-500 hover:underline py-20 ">
            Forget Password
          </p>
        </Link>
      </div>
    </>
  );
}
