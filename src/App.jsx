import { useEffect, useState } from 'react'
import {gamesWithFilter, gamesCantidad, tokenUser} from './lib/data.js'
import Header from './components/Header.jsx'
import Login from './components/Login.jsx'
import { CartProvider } from './context/CartProvider.jsx'
import { Footer } from './components/Footer.jsx'
import { BrowserRouter, Route, Link, Router, Routes } from 'react-router-dom';
import { obtenerToken } from './lib/serviceToken.js'
import { useLogin } from './hooks/useLogin.jsx'
import { Cuentausuario } from './components/Cuentausuario.jsx'
import { Pedidos } from './components/Pedidos.jsx'
import { Tramitarpedido } from './components/TramitarPedido.jsx'
import { Inicio } from './components/Inicio.jsx'
import Crearcuentausuario from './components/Creacuenta.jsx'
import Spinner from './components/spinner.jsx'
import DetalleJuego from './components/DetalleJuego.jsx'
import NotFound from './components/NotFound.jsx'
import Contacto from './components/Contacto.jsx'
import { Mensajes } from './components/Mensajes.jsx'
import MenuAdmin from './components/Administrador.jsx'



function App() {
  const [limit, setLimit]=useState([0,10])
  const [cantidad,setCantidad]=useState(0)
  const [filter, setFilter]=useState({})
  const [games, setGames]=useState(null)
  const {cambiarLogged, logged, logout}=useLogin()
  const [mensajeVisible, setMensajeVisible]=useState({
    visible:false,
    titulo:'',
    contenido:''
  })

  
  useEffect(()=>{
    const cargarDatos = async () => {
      const respuesta = await gamesWithFilter(filter, limit)
      const cantidad=await gamesCantidad(filter);
      const token= obtenerToken();
      if(token!=null) {
        const user= await tokenUser(token)
        if(user==null||user.error ){
          logout()
        } else {
          cambiarLogged(user)
        }
      } else {
        logout()
      }
      setCantidad(cantidad)
      setGames(respuesta); // Actualiza el estado con los datos recibidos
    };
    cargarDatos();
    
  }, [filter, limit]);

 

  
  const addFilter=(filters)=>{
    setFilter(filters)
  }

  const addLimit=(num)=>{
    setLimit(num)
  }

  const addMensaje=(titulo, mensaje)=>{

    setMensajeVisible({
      visible:true,
      titulo:titulo,
      contenido:mensaje
    })
  }

  const cerrarMensaje=()=>{
    setMensajeVisible({
      visible:false,
      titulo:'',
      contenido:''
    })
  }


  return (
    <CartProvider>
      <BrowserRouter>
        <Header></Header>
        {games!=null 
        ?  <main>
            <Routes>
              <Route path="/"  element={<Inicio filtros={filter} limit={limit} cantidad={cantidad} games={games} addLimit={(x)=>addLimit(x)} addFilter={(x)=>addFilter(x)}/>} />
              <Route path='/admin' element={<MenuAdmin/>}/>
              <Route path="/usuario" element={<Cuentausuario addMensaje={(x,y)=>addMensaje(x,y)}/>}/>
              <Route path='/historialpedidos' element={<Pedidos/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/crearcuenta" element={<Crearcuentausuario addMensaje={(x,y)=>addMensaje(x,y)}/>} />
              <Route path='/tramitarpedido' element={<Tramitarpedido addMensaje={(x,y)=>addMensaje(x,y)}/>}/>
              <Route path='/juego/:id' element={<DetalleJuego/>}/>
              <Route path='/contacto' element={<Contacto addMensaje={(x,y)=>addMensaje(x,y)}/>}/>
   
              <Route path='/*' element={<NotFound/>}/>
            </Routes>
          </main>
        : <Spinner></Spinner>
        }
        
        {mensajeVisible.visible && <Mensajes cerrarMensaje={()=>cerrarMensaje()} titulo={mensajeVisible.titulo} contenido={mensajeVisible.contenido}></Mensajes>}
        <Footer></Footer>
      </BrowserRouter>
    
    </CartProvider>
  )
}

export default App
