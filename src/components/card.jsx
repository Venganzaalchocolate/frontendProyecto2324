import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/card.module.css';
import { useCart } from '../hooks/useCart';

const Card=({juego})=>{
    const {addCart} = useCart()
    return (
        <div className={styles.cajaCard} key={juego._id}>
            <img src="https://jugamosuna.es/tienda/90513-large_default/-pre-venta-16052024-dulce-caos-mini-exp-los-helados.jpg" alt="juego"/>
            <div className={styles.cajaPropiedades}  >
                <h2 className={styles.nombre}>{juego.name}</h2>
                <div className={styles.cajaPrecio} onClick={()=>addCart(juego)}>
                    <p>{juego.price} € </p>
                    <FaShoppingCart/>
                </div>
            </div>
        </div>
    )
}

export default Card