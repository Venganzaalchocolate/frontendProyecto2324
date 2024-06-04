import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin"
import { Link, useNavigate } from 'react-router-dom';
import { obtenerToken } from "../../lib/serviceToken";
import { historyOrders } from "../../lib/data";
import styles from '../../styles/form.module.css';
import stylesDos from '../../styles/panelControl.module.css';
import CrearJuego from "./juego/CrearJuego";
import ModificarJuego from "./juego/ModificarJuego";
import BorrarJuego from "./juego/EliminarJuego";
import CrearUsuario from "./usuario/CrearUsuario";
import ModificarUsuario from "./usuario/ModificarUsuario";
import EliminarUsuario from "./usuario/EliminarUsuario";
import CrearPedido from "./pedido/CrearPedido";
import ModificarPedido from "./pedido/ModificarPedido";
import DeshabilitarPedido from "./pedido/DeshabilitarPedido";



const MenuAdmin=({addMensaje})=>{
    const { logged } = useLogin()
    const [accion, setAccion]=useState(null)
    const [token, setToken]=useState(null)
    const navigate = useNavigate()
    
  useEffect(() => {
    if (!logged.estaLogueado || (logged.estaLogueado && logged.user.role!='admin')) navigate('/')
    const token=obtenerToken()
    setToken(token)
  }, [logged]);

    const mostrarAccion=()=>{
        switch (accion) {
            case 'jadd':
                return <CrearJuego addMensaje={(x,y,z)=>addMensaje(x,y,z)} cancelarAccion={()=>setAccion(null)}></CrearJuego>
            case 'jmod':
                return <ModificarJuego addMensaje={(x,y,z)=>addMensaje(x,y,z)} cancelarAccion={()=>setAccion(null)}/>
            case 'jdel':
                return <BorrarJuego addMensaje={(x,y,z)=>addMensaje(x,y,z)} cancelarAccion={()=>setAccion(null)}/>
            case 'uadd':
                return <CrearUsuario addMensaje={(x,y,z)=>addMensaje(x,y,z)} cancelarAccion={()=>setAccion(null)} token={token}></CrearUsuario>
            case 'umod':
                return <ModificarUsuario addMensaje={(x,y,z)=>addMensaje(x,y,z)} cancelarAccion={()=>setAccion(null)} token={token}></ModificarUsuario>
            case 'udel':
                return <EliminarUsuario addMensaje={(x,y,z)=>addMensaje(x,y,z)} cancelarAccion={()=>setAccion(null)} token={token}></EliminarUsuario>
            case 'padd':
                return <CrearPedido addMensaje={(x,y,z)=>addMensaje(x,y,z)} cancelarAccion={()=>setAccion(null)} token={token}></CrearPedido>
            case 'pmod':
                return <ModificarPedido addMensaje={(x,y,z)=>addMensaje(x,y,z)} cancelarAccion={()=>setAccion(null)} token={token}></ModificarPedido>
            case 'pdel':
                    return <DeshabilitarPedido addMensaje={(x,y,z)=>addMensaje(x,y,z)} cancelarAccion={()=>setAccion(null)} token={token}></DeshabilitarPedido>
            default:
                setAccion(null)
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
        <button onClick={()=>setAccion('uadd')}>AÑADIR</button>
        <button onClick={()=>setAccion('umod')}>MODIFICAR</button>
        <button onClick={()=>setAccion('udel')}>ELIMINAR</button>
    </div>
    <div className={stylesDos.cajaPedidos}>
        <h3>PEDIDOS</h3>
        <button onClick={()=>setAccion('padd')}>AÑADIR</button>
        <button onClick={()=>setAccion('pmod')}>MODIFICAR</button>
        <button onClick={()=>setAccion('pdel')}>ELIMINAR</button>
    </div>
    </div>    }
    </>
    

    )
    
}

export default MenuAdmin;