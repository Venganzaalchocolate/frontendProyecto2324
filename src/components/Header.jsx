import { useContext, useState } from 'react'
import { FaShoppingCart, FaRegUser } from 'react-icons/fa';
import { GiMeeple } from "react-icons/gi";
import styles from '../styles/header.module.css';
import { LoggedContext } from '../context/LoggedProvider';
import Carrito from './Carrito';
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Link } from 'react-router-dom';



const Header = () => {
    const { logged, setLogged } = useContext(LoggedContext)


    const login = () => {
        setLogged({
            estaLogueado: !logged.estaLogueado,
            user: logged.user
        })
    }

    return (
        <header className={styles.header}>
            <div className={styles.contenedorEnvioSociales}>
                <p>ENVIO GRATIS A PARTIR DE 40€</p>
                <div>
                    <FaFacebookF></FaFacebookF>
                    <FaInstagram></FaInstagram>
                </div>
            </div>
            <div className={styles.contenedorLogo}>
                <Link to={'/'}>
                    <img src="/img/logo.svg" alt="logotipo mesaMágica" />
                </Link>
            </div>


            <div className={styles.contenedorIconos}>
                <Carrito></Carrito>
                {logged.estaLogueado &&
                    <GiMeeple onClick={() => login()} />
                }
                {!logged.estaLogueado &&
                    <Link to='/login'>
                        <FaRegUser onClick={() => login()} />
                    </Link>
                }
            </div>
        </header>
    )
}

export default Header;