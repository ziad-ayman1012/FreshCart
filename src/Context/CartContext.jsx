import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const cartContext = createContext()
export default function CartContextProvider({ children }) {


    const [allProducts, setallProducts] = useState(null)
    const [numberCartItems, setNumberCartItems] = useState(0)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartId, setCartId] = useState(null)

function upDateUi(){
    setallProducts(null)
    setNumberCartItems(0)
    setTotalCartPrice(0)
    setCartId(null)
}
    async function addProductToCart(id) {
        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            
            productId: id,
            

        },
            {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            }).then((resp) => {
                // setNumberCartItems(resp.data.numOfCartItems);
                // setTotalCartPrice(resp.data.data.totalCartPrice);
                // setallProducts(resp.data.data.products);
                getProducts();

                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }
      function getProducts() {
        axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }).then((resp) => {
             setNumberCartItems(resp.data.numOfCartItems);
             setTotalCartPrice(resp.data.data.totalCartPrice);
             setallProducts(resp.data.data.products);
             setCartId(resp.data.data._id);
        })
            .catch((error) => {
              console.log(error);
          })
    }
    useEffect(() => {
        getProducts();
        
        
    }, [])
    
    async function updateProductCount(id, newCount) {
    return await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
        ).then((resp)=>{
            setNumberCartItems(resp.data.numOfCartItems);
            setTotalCartPrice(resp.data.data.totalCartPrice);
            setallProducts(resp.data.data.products);

            return true
        })
        .catch((error)=>{
            console.log(error);
            return false
            
        })
    }
    async function deleteProduct(id) {
      return  await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`
            , {
                headers: {
                token:localStorage.getItem('tkn'),
            }
            }).then((resp)=>{
                 setNumberCartItems(resp.data.numOfCartItems);
                 setTotalCartPrice(resp.data.data.totalCartPrice);
                setallProducts(resp.data.data.products);
                
                return true
            })
                .catch((error)=>{
                    console.log('error', error);
                    return false
                    
                })
    }
    async function clearCart() {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token:localStorage.getItem('tkn')
            }
        })
            .then((resp)=>{
                console.log(resp.message);
                setallProducts(null)
                setTotalCartPrice(0)
                setNumberCartItems(0)
                
                return true
            })
        .catch((error)=>{
            console.log(error);
            return false
        })
    }
    return (
      <cartContext.Provider
        value={{
          addProductToCart,
          allProducts,
          numberCartItems,
          totalCartPrice,
          getProducts,
          updateProductCount,
          deleteProduct,
          clearCart,
          cartId,
          upDateUi,
        }}
      >
        {children}
      </cartContext.Provider>
    );
}
