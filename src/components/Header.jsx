import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { GiMeeple } from "react-icons/gi";
import styles from '../styles/header.module.css';

const Header=()=>{
    return(
        <header className={styles.header}>
            <div className={styles.contenedorLogo}>
                <img src="/img/logo.svg" alt="logotipo mesaMágica" />
            </div>
            <div className={styles.contenedorIconos}>
                <span>23</span>
                <FaShoppingCart onClick={()=>console.log('carrito')}></FaShoppingCart>
                <GiMeeple onClick={()=>console.log('login')}/>
            </div>
        </header>
    )
}

export default Header;