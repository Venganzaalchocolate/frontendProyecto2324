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



function App() {
  const [limit, setLimit]=useState([0,20])
  const [cantidad,setCantidad]=useState(0)
  const [filter, setFilter]=useState({})
  const [games, setGames]=useState(null)
  const [componente,setComponente]=useState('Home')
  const {cambiarLogged, logged, logout}=useLogin()
  
  useEffect(()=>{
    const cargarDatos = async () => {
      const respuesta = await gamesWithFilter(filter, limit)
      const cantidad=await gamesCantidad(filter);
      const token= obtenerToken();
      if(token!=null) {
        const user= await tokenUser(token)
        if(user.error){
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


  return (
    <CartProvider>
      <BrowserRouter>
        <Header></Header>
        {games!=null 
        ?  <main>
            <Routes>
              <Route path="/"  element={<Inicio limit={limit} cantidad={cantidad} games={games} addLimit={(x)=>addLimit(x)} addFilter={(x)=>addFilter(x)}/>} />
              <Route path="/usuario" element={<Cuentausuario/>}/>
              <Route path='/historialpedidos' element={<Pedidos/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/crearcuenta" element={<Crearcuentausuario/>} />
              <Route path='/tramitarpedido' element={<Tramitarpedido/>}/>
              <Route path='/juego/:id' element={<DetalleJuego/>}/>
              <Route path='/*' element={<NotFound/>}/>
            </Routes>
          </main>
        : <Spinner></Spinner>
        }
        
        <Footer></Footer>
      </BrowserRouter>
    
    </CartProvider>
  )
}

export default App
