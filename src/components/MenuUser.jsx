import { GiMeepleKing  } from "react-icons/gi";
import styles from '../styles/header.module.css';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";

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
                <MdClose onClick={()=>visibleMenu()}></MdClose>
                <ul>
                    <Link to='/usuario' onClick={()=>visibleMenu()}>
                        <li>TU CUENTA</li>
                    </Link>
                    <Link to='/historialpedidos' onClick={()=>visibleMenu()}>
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