import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/card.module.css';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

const Card=({juego})=>{
    const {addCart} = useCart()
    return (
        <Link to={`/juego/${juego._id}` } >
            <div className={styles.cajaCard} key={juego._id} >
                <picture>
                    <source srcSet={`/img/desktop/${juego.image}.jpg`} media="(min-width: 1200px)" />
                    <source srcSet={`/img/tablet/${juego.image}.jpg`} media="(min-width: 800px)" />
                    <img src={`/img/phone/${juego.image}.jpg`} alt={`${juego.name}`}/>
                </picture>
                <div className={styles.cajaPropiedades}  >
                    <h2 className={styles.nombre}>{juego.name}</h2>
                    <div className={styles.cajaPrecio} onClick={()=>addCart(juego)}>
                        <p>{juego.price} € </p>
                        <FaShoppingCart/>
                    </div>
                </div>
            </div>
        
        </Link>
        
    )
}

export default Card