import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import styles from '../styles/header.module.css';
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';

const Carrito=()=>{
    const [visible, setVisible]=useState(false)
    const {products, removeProduct, reduceProduct, addCart} = useCart()

    const visibleCarrito=()=>{
        setVisible(!visible)
    }

    return (
        <>
        <span onClick={()=>visibleCarrito()}>{
            !!products && products.reduce((acc, item) => acc + item.quantity, 0)
        }</span> 
        <FaShoppingCart onClick={()=>visibleCarrito()}></FaShoppingCart>
        {visible && 
            <div className={styles.listaCarrito}>
            <MdClose onClick={()=>visibleCarrito()}></MdClose>
            <ul>
                <li>Producto</li>
                <li>Qt</li>
                <li>Total</li>
                <li></li>
            </ul>
            {!!products && products.map((x)=>{
                return <ul>
                 <li>{x.name}</li>
                 <li><label onClick={()=>addCart(x)}>+&nbsp;&nbsp;</label>{x.quantity}<label onClick={()=>reduceProduct(x)}>&nbsp;&nbsp;-</label></li>
                 <li>{(x.quantity*x.price).toFixed(2)}</li>
                 <li><FaTrashAlt onClick={()=>removeProduct(x)}></FaTrashAlt></li>
                 </ul>
            })
               
            }
            <p>Total: {!!products && products.reduce((acc, item) => acc + (item.quantity*item.price), 0).toFixed(2)} €</p>
            {(!!products && products.reduce((acc, item) => acc + (item.quantity*item.price), 0).toFixed(2)>40) && <p>ENVIO GRATIS</p>}
            <Link to='/tramitarpedido' onClick={()=>visibleCarrito()}>
            <button>TRAMITAR PEDIDO</button>
            </Link>
            
            </div>
        }
        </>
        
    )
}

export default Carrito;