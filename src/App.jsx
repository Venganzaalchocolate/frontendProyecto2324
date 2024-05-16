import { useEffect, useState } from 'react'
import {gamesWithFilter, gamesCantidad, tokenUser} from './lib/data.js'
import Listcards from './components/Listacards.jsx'
import Filters from './components/Filters.jsx'
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
        if(!user.error){
          cambiarLogged(user)
        } else {
          logout()
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

  const home=()=>{
    return <>
    <Filters cambiarLimit={(x)=>addLimit(x)} pasarFiltros={(x)=>addFilter(x)}></Filters>
    {games!=null 
        ? (cantidad==0) 
          ?<p>No tenemos juegos con esos filtros</p>
          :<Listcards games={games} cambiarLimit={(x)=>addLimit(x)} cantidad={cantidad} numeroCardXPagina={limit} />
        :<p>cargando....</p>}
    </>
  }

  return (
    <CartProvider>
      <BrowserRouter>
        <Header></Header>
        <main>
          <Routes>
            <Route path="/" element={home()} />
            <Route path="/usuario" element={<Cuentausuario/>}/>
            <Route path='/historialpedidos' element={<Pedidos/>} />
            <Route path="/login" element={<Login/>} />
            <Route path='/tramitarpedido' element={<Tramitarpedido/>}/>
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    
    </CartProvider>
  )
}

export default App
