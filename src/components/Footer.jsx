import { useCart } from "../hooks/useCart"



export const Footer=()=>{
    const {products}=useCart()
    console.log(products)
    return(
        <div>hola</div>
    )
}