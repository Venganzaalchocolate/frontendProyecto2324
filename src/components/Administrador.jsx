import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin"
import { Link, useNavigate } from 'react-router-dom';
import { obtenerToken } from "../lib/serviceToken";
import { historyOrders } from "../lib/data";
import styles from '../styles/form.module.css';
import stylesDos from '../styles/panelControl.module.css';
import CrearJuego from "./CrearJuego";


const MenuAdmin=()=>{
    const { logged } = useLogin()
    const [accion, setAccion]=useState(null)
    const navigate = useNavigate()
    
  useEffect(() => {
    if (!logged.estaLogueado || (logged.estaLogueado && logged.user.role!='admin')) navigate('/')
    const cargarDatos = async () => {
    };
    cargarDatos();
  }, [logged]);

    const mostrarAccion=()=>{
        switch (accion) {
            case 'jadd':
                return <CrearJuego cancelarAccion={()=>setAccion(null)}></CrearJuego>
            break;
            case 'jmod':
                return <p>modificar</p>
            break;
            case 'jdel':
                return <p>borrar</p>
            break;
            default:
                return null;
                break;
        }
    }

    return(
    <>
    {accion!=null
    ? mostrarAccion()
    : <div className={styles.cajaForm}>
    <h2>PANEL DE CONTROL</h2>
    <div className={stylesDos.cajaJuegos}>
        <h3>JUEGOS</h3>
        <button onClick={()=>setAccion('jadd')}>AÑADIR</button>
        <button onClick={()=>setAccion('jmod')}>MODIFICAR</button>
        <button onClick={()=>setAccion('jdel')}>ELIMINAR</button>
    </div>
    <div className={stylesDos.cajaUsuarios}>
        <h3>USUARIOS</h3>
        <button>AÑADIR</button>
        <button>MODIFICAR</button>
        <button>ELIMINAR</button>
    </div>
    <div className={stylesDos.cajaPedidos}>
        <h3>PEDIDOS</h3>
        <button>AÑADIR</button>
        <button>MODIFICAR</button>
        <button>ELIMINAR</button>
    </div>
    </div>    }
    </>
    

    )
    
}

export default MenuAdmin;