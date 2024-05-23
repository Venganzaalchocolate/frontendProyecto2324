import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from 'react-router-dom';
import { obtenerToken } from "../lib/serviceToken";
import { historyOrders } from "../lib/data";
import styles from '../styles/form.module.css';
import stylesDos from '../styles/historiaslPedidos.module.css';
import { formatDateTime } from "../lib/utils";


export const Historialpedidos = ({ver}) => {
  const [orders, setOrders] = useState(null)
  const { logged } = useLogin()
  const navigate = useNavigate()
  useEffect(() => {
    if (!logged.estaLogueado) navigate('/')
    const cargarDatos = async () => {
      const id = logged.user._id
      const token = obtenerToken();
      const respuesta = await historyOrders(token, id)
      setOrders(respuesta); // Actualiza el estado con los datos recibidos
    };
    cargarDatos();
  }, [logged]);

  const pedido=(pedido)=>{
    ver(pedido)
  }

  console.log(orders)
  if (orders != null) return (
    <div className={styles.cajaForm}>
      <h2>HISTORIAL PEDIDOS</h2>
      {orders.length == 0 && <p>TODAVÍA NO HAS HECHO NINGÚN PEDIDO</p>}
      {orders.map((order) => {
        return (
            <div onClick={()=>pedido(order)} className={stylesDos.listaPedidos}>
              <p>Nº PEDIDO: {order._id}</p>
              <p>{formatDateTime(order.date)}</p>
              <p>{order.totalPrice}</p>
            </div>          
        )
      })}
    </div>
  )
  else {
    <p>No hay pedidos</p>
  }
}