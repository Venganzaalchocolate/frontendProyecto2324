import { useEffect, useState } from 'react'
import {gamesWithFilter, gamesCantidad} from './lib/data.js'
import Listcards from './components/Listacards.jsx'
import Filters from './components/Filters.jsx'
import Header from './components/Header.jsx'
import Login from './components/Login.jsx'
import { CartProvider } from './context/CartProvider.jsx'
import { Footer } from './components/Footer.jsx'
import { BrowserRouter, Route, Link, Router, Routes } from 'react-router-dom';



function App() {
  const [limit, setLimit]=useState([0,20])
  const [cantidad,setCantidad]=useState(0)
  const [filter, setFilter]=useState({})
  const [games, setGames]=useState(null)
  const [componente,setComponente]=useState('Home')
  

  useEffect(()=>{
    const cargarDatos = async () => {
      const respuesta = await gamesWithFilter(filter, limit)
      const cantidad=await gamesCantidad(filter);
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
            <Route path="/login" element={<Login/>} />
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    
    </CartProvider>
  )
}

export default App
