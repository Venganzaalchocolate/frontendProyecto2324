import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin"
import { Link, useNavigate } from 'react-router-dom';
import { obtenerToken } from "../../lib/serviceToken";
import { historyOrders } from "../../lib/data";
import { Historialpedidos } from "./Historialpedidos";

import { Pedido } from "./Pedido";

export const Pedidos = () => {
    const [orders, setOrders] = useState(null)
    const [order, serOrder] =useState(null)
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

   const verPedido=(pedido)=>{
    serOrder(pedido)
  }

  if (orders != null){
    if(order==null) return <Historialpedidos ver={(x)=>verPedido(x)}></Historialpedidos>
    else return <Pedido pedido={order}></Pedido>
  } else return <p>no hay pedidos todavía</p>
}