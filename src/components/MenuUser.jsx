import { GiMeepleKing  } from "react-icons/gi";
import styles from '../styles/header.module.css';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link } from "react-router-dom";

const MenuUser=()=>{
    const [visible, setVisible]=useState(false)
    const {logout} = useLogin()

    const visibleMenu=()=>{
        setVisible(!visible)
    }

    return (
        <>
        <GiMeepleKing onClick={()=>visibleMenu()}></GiMeepleKing>
        {visible && 
            <div className={styles.menuUsuario}>
                <ul>
                    <Link to='/usuario'>
                        <li>TU CUENTA</li>
                    </Link>
                    <Link to='/historialpedidos'>
                        <li>HISTORIAL DE PEDIDOS</li>
                    </Link>
                </ul>

                <button onClick={()=>logout()}>CERRAR SESIÓN</button>
            </div>
        }
        </>
        
    )
}

export default MenuUser;