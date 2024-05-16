
import { GiMeeple, GiMeepleKing  } from "react-icons/gi";
import styles from '../styles/header.module.css';
import Carrito from './Carrito';
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import MenuUser from './MenuUser';



const Header = () => {
    const { logged } = useLogin()

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
                <MenuUser/>   
                }
                {!logged.estaLogueado &&
                    <Link to='/login'>
                        <GiMeeple/>
                    </Link>
                }
            </div>
        </header>
    )
}

export default Header;