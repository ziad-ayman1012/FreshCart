import axios from "axios";
import { useContext } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import {  useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishContext } from "../WishListContext/WishListContext";
import { authContext } from "../../Context/AuthContext";

export default function ProductDetails() {
  const { addToWishList, wishlistStatus, removeFromWishList } =
    useContext(wishContext);
  
  const { id } = useParams()
  const { addProductToCart } = useContext(cartContext);
  const {token}= useContext(authContext)

  function handleWishlistToggle(id) {
    if (wishlistStatus[id]) {
      removeFromWishList(id)
        .then((flag) => {
          if (flag) {
            toast.success("Product removed from wishlist", { duration: 2000 });
          } else {
            toast.error("Failed to remove product from wishlist", {
              duration: 2000,
            });
          }
        })
        .catch(() => {
          toast.error("An error occurred", { duration: 2000 });
        });
    } else {
      addToWishList(id)
        .then((flag) => {
          if (flag) {
            toast.success("Product added to wishlist", { duration: 2000 });
          } else {
            toast.error("Failed to add product to wishlist", {
              duration: 2000,
            });
          }
        })
        .catch(() => {
          toast.error("An error occurred", { duration: 2000 });
        });
    }
  }
    
  function handleAddingToCart() {
    const flag = addProductToCart(id);
    if (flag) {
      toast.success('The Product Added To Cart Successfully', {
        duration: 2000,
      })
      // navigate to cart 
      // setTimeout(() => {
      //   navigate("/cart");
      // }, 2000);
    } else {
      toast.error("Not Found", {
        duration: 2000,
      });
      }
  }
  
  function authUser() {
    toast.error("You Must Have An Account");
  }

    function getProductDetails() {
        return axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${id}`
        );
  }
    const { data , isError , isLoading} =useQuery({
        queryKey: ['productDetails',id],
        queryFn:getProductDetails
    })
   if (isLoading) {
     return (
       <>
         <div className="h-screen flex justify-center items-center">
           <ThreeCircles
             visible={true}
             height="80"
             width="80"
             color="#bcf06d"
             ariaLabel="three-circles-loading"
             wrapperStyle={{}}
             wrapperClass=""
           />
         </div>
       </>
     );
   }

   if (isError) {
     <>
       <div
         className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
         role="alert"
       >
         <span className="font-medium">Not Found</span>
       </div>
     </>;
    }
  const itemDetails = data.data.data;
            const isAdded = wishlistStatus[itemDetails._id] || false;

    
  return (
    <>
      <div className="container mx-auto py-28 flex items-center justify-between px-20 gap-5">
        <div className="w-1/4">
          <img
            src={itemDetails.imageCover}
            className="w-full"
            alt={itemDetails.name}
          />
        </div>
        <div className="w-[70%]">
          <h3>{itemDetails.title}</h3>
          <p className="text-gray-400 py-5">{itemDetails.description}</p>
          <span>{itemDetails.category.name}</span>
          <div className="flex items-center justify-between py-2">
            <p> {itemDetails.price} EGP</p>
            <div className="">
              <i className="fas fa-star text-yellow-400"></i>
              <span className="mx-1 text-gray-400">
                {itemDetails.ratingsAverage}
              </span>
            </div>
          </div>
          <div
            onClick={() => handleWishlistToggle(id)}
            className={
              isAdded
                ? "heartIcon text-start p-3 text-red-700"
                : "heartIcon text-start p-3"
            }
          >
            <i className="fas fa-heart text-xl cursor-pointer"></i>
          </div>
          <button
            onClick={token ? handleAddingToCart:authUser }
            className="bg-green-400 rounded-lg w-full py-3 text-white"
          >
            + Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
