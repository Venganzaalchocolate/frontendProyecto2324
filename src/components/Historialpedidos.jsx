import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from 'react-router-dom';
import { obtenerToken } from "../lib/serviceToken";
import { historyOrders } from "../lib/data";
import styles from '../styles/form.module.css';
import stylesDos from '../styles/historiaslPedidos.module.css';
import { formatDateTime } from "../lib/utils";
import Spinner from "./spinner";
import { validToken } from "../lib/valid";


export const Historialpedidos = ({ver}) => {
  const [orders, setOrders] = useState(null)
  const { logged, logout } = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    if (!logged.estaLogueado) navigate('/login')
    const cargarDatos = async () => {
      const id = logged.user._id
      const token = obtenerToken();
      const respuesta = await historyOrders(token, id)
      if (!validToken(respuesta)){
        logout();
        navigate('/login');
      } else{
        setOrders(respuesta); 
      }
    };
    cargarDatos();
  }, [logged]);

  const pedido=(pedido)=>{

    ver(pedido)
  }


  if (orders != null) return (
    <div className={styles.cajaForm}>
      <h2>HISTORIAL PEDIDOS</h2>
      {orders.length < 1 
      ? <p>TODAVÍA NO HAS HECHO NINGÚN PEDIDO</p>
      : orders==null ? <Spinner></Spinner>
      : orders.map((order) => {
        return (
            <div onClick={()=>pedido(order)} className={stylesDos.listaPedidos}>
              <p>Nº PEDIDO: {order._id}</p>
              <p>{formatDateTime(order.date)}</p>
              <p>{order.totalPrice}</p>
            </div>          
        )
      })
    }
      
    </div>
  )
  else {
    <p>No hay pedidos</p>
  }
}