import { createContext, useState } from "react";

export const CartContext=createContext();

export function CartProvider({children}){
    const [products, setProducts]=useState([])

    const addCart=product=>{
        const productInCart=products.findIndex(item=>item._id==product._id)
        console.log(productInCart)
        if(productInCart>=0){
            const auxCart= structuredClone(products)
            console.log(auxCart[productInCart].stock>auxCart[productInCart].quantity)
            if(auxCart[productInCart].stock>auxCart[productInCart].quantity) auxCart[productInCart].quantity+=1
            return setProducts(auxCart)
        }else if(product.stock>0){
            setProducts(prevState=>
                ([
                    ...prevState,
                    {
                        ...product,
                        quantity:1
                    }
                ])
            )    
        }
        
    }

    const reduceProduct=product=>{
        const productInCart=products.findIndex(item=>item._id==product._id)

        if(productInCart>=0){
            const auxCart= structuredClone(products)
            if(auxCart[productInCart].quantity==1) auxCart.splice(productInCart,1)
            else auxCart[productInCart].quantity-=1
            return setProducts(auxCart)
        }
    }

    const removeProduct=product=>{
        const productInCart=products.findIndex(item=>item._id==product._id)

        if(productInCart>=0){
            const auxCart= structuredClone(products)
            auxCart.splice(productInCart,1)
            return setProducts(auxCart)
        }
    }

    const removeCart=()=>{
        setProducts([])
    }

return (
    <CartContext.Provider value={{
        products,
        addCart,
        removeProduct,
        reduceProduct,
        removeCart
    }}>
    {children}
    </CartContext.Provider>
)
}