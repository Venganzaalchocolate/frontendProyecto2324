import { useContext } from "react";
import { CartContext} from "../context/CartProvider";

export const useCart = () => {
    const context = useContext(CartContext)
    if (context == undefined) throw new Error('Carrito fuera del contexto')

    return context
}