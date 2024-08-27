import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/finalProject assets/finalProject assets/images/freshcart-logo.svg'
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import SocialMedia from "../../SocialMedia/SocialMedia";
import { cartContext } from "../../Context/CartContext";


export default function Navbar() {
  const { token, setToken } = useContext(authContext)
  const navigate = useNavigate()
  const { numberCartItems } = useContext(cartContext);
  function logOut() {
    console.log('logout');
    localStorage.removeItem('tkn');
    setToken(null)
    navigate('/login');
    
  }
    return (
      <>
        <nav className="z-40 container-lg fixed top-0 end-0 start-0  p-4  mx-auto bg-gray-100 border-gray-200 dark:bg-gray-400 flex items-center justify-between ">
          <div className=" ps-16 max-w-screen-xl flex flex-wrap items-center gap-5  justify-between">
            <Link
              to="home"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8 w-full" alt="fresh cart" />
            </Link>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className=" w-full md:block md:w-auto  sm:text-center"
              id="navbar-default"
            >
              <ul className=" flex flex-col py-4 ps-10 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to="home"
                    className="block py-2 px-3 text-gray-400  rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-emerald-500"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                {token ? (
                  <li>
                    <NavLink
                      to="cart"
                      className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      <div className="relative">
                        <i className="fa-solid fa-cart-shopping text-2xl"></i>
                        {numberCartItems === 0 ? (
                          ""
                        ) : (
                          <div className="absolute top-0 end-0 bg-red-500 text-xs px-1 text-white rounded-full">
                            {numberCartItems}
                          </div>
                        )}
                      </div>
                    </NavLink>
                  </li>
                ) : null}
                <li>
                  <NavLink
                    to="products"
                    className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="categories"
                    className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="brands"
                    className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div
            className=" hidden pe-16 md:flex space-x-6 w-full  md:w-auto"
            id="navbar-default"
          >
            <div className="">
              <SocialMedia />
            </div>

            <div className="register">
              <ul className="flex space-x-3 text-gray-400">
                {token ? (
                  <li>
                    <span onClick={logOut} className="cursor-pointer">
                      Log Out
                    </span>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink to="register">Register</NavLink>
                    </li>
                    <li>
                      <NavLink to="login">Login</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
}
