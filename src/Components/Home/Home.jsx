

import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import SimpleSlider from "../homeSlider/homeSlider";
import img1 from "../../assets/finalProject assets/finalProject assets/images/blog-img-1.jpeg";
import img2 from "../../assets/finalProject assets/finalProject assets/images/blog-img-2.jpeg";
import CategoriesSlider from "./../CategoriesSlider/CategoriesSlider";
import { useQuery } from "react-query";

import { Link,  } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishContext } from "../WishListContext/WishListContext";

export default function Home() {
     const { addToWishList, wishlistStatus, removeFromWishList } =
       useContext(wishContext);
  
  // const [allProducts, setAllProducts] = useState(null)
  //   async function getAllProducts() {
  //     const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  //     // console.log(data.data);
  //     setAllProducts(data.data)

  //   }
  //   useEffect(() => {
  //     getAllProducts();
  //   },[])
  const { addProductToCart }=useContext(cartContext)
  function handleAddingProduct(id) {
    const flag = addProductToCart(id)
    if (flag) {
      toast.success('The Product Added To Cart Successfully', {
        duration: 2000,
      })
      // navigate to cart 
      // setTimeout(() => {
      //   navigate('/cart')
      // },2000)
    } else {
      toast.error("Not Found", {
        duration: 2000,
      });
      }
  }
  
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
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: "allproducts",
    queryFn: getAllProducts,
  });

  if (isError) {
    return (
      <>
        <h1>Error</h1>
      </>
    );
  }
  if (isLoading) {
    return (
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
    );
  }

  return (
    <>
      <div className="sliders">
        <div className="py-20  mx-10">
          <div className="flex justify-center items-center">
            <div className="w-[80%]">
              <SimpleSlider />
            </div>
            <div className="w-[20%]">
              <img className="block h-48" src={img1} alt="" />
              <img src={img2} className="block h-48" alt="" />
            </div>
          </div>
        </div>
        <div className=" mx-10">
          <CategoriesSlider />
        </div>
      </div>

      <div className="container mx-auto py-10 mt-20 px-10">
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.data.data.map((product) => {
                      const isAdded = wishlistStatus[product._id] || false;

            return (
              <div key={product._id} className="item ">
                <div className="relative overflow-hidden group">
                  <div
                    onClick={() => handleWishlistToggle(product._id)}
                    className={
                      isAdded
                        ? " text-start p-3 text-red-700"
                        : " text-start p-3"
                    }
                  >
                    <i className="fas fa-heart text-xl cursor-pointer"></i>
                  </div>
                  <div
                    onClick={() => handleAddingProduct(product._id)}
                    className="group-hover:translate-x-0 transition-all absolute cursor-pointer translate-x-[200%] top-2 end-2 rounded-lg py-2 px-3 bg-[#bcf06d]"
                  >
                    <i className="fas fa-plus text-white"></i>
                  </div>

                  <Link to={`/productDetails/${product._id}`}>
                    <img
                      src={product.imageCover}
                      className="w-full"
                      alt={product.title}
                    />
                    <p className="text-[#bcf06d]">{product.category.name}</p>
                    <h3 className="text-xl">
                      {product.title.split(" ", 3).join(" ")}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p>
                        <span
                          className={
                            product.priceAfterDiscount
                              ? "line-through text-red-500 me-2"
                              : ""
                          }
                        >
                          {product.price}{" "}
                        </span>
                        <span className="">
                          {product.priceAfterDiscount} EGP
                        </span>
                      </p>
                      <div className="">
                        <i className="fas fa-star text-yellow-300"></i>
                        <span className="text-gray-400 mx-1">
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
