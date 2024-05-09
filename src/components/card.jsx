import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/card.module.css';

const Card=({juego})=>{
    return (
        <div className={styles.cajaCard} key={juego.id}>
            <img src="https://juegosdelamesaredonda.com/43766-large_default/gloomhaven-segunda-edicion-castellano.jpg" alt="juego"/>
            <div className={styles.cajaPropiedades}  >
                <h2 className={styles.nombre}>{juego.name}</h2>
                <div className={styles.cajaPrecio} onClick={()=>console.log('funciona')}>
                    <p>{juego.price} € </p>
                    <FaShoppingCart/>
                </div>
            </div>
        </div>
    )
}

export default Card