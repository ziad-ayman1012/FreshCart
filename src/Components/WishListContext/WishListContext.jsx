import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const wishContext = createContext();

export default function WishListContext({ children }) {
    const [wishlistStatus, setWishlistStatus] = useState(() => {
      
    const storedData = localStorage.getItem("wishlistData");
        return storedData ? JSON.parse(storedData) : {};
        
  });

  useEffect(() => {
    localStorage.setItem("wishlistData", JSON.stringify(wishlistStatus));
  }, [wishlistStatus]);

  async function addToWishList(id) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      const isProductInWishlist = response.data.data.some(
        (favId) => favId === id
      );

      setWishlistStatus((prevStatus) => ({
        ...prevStatus,
        [id]: isProductInWishlist,
      }));

      return isProductInWishlist;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function removeFromWishList(id) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setWishlistStatus((prevStatus) => {
          const newStatus = { ...prevStatus };
          delete newStatus[id];
          return newStatus;
        });

        return true
      })
      .catch((err) => {
        console.log(err);
        return false
      });
  }

  return (
    <wishContext.Provider
      value={{
        addToWishList,
        wishlistStatus,
        removeFromWishList,
      }}
    >
      {children}
    </wishContext.Provider>
  );
}
