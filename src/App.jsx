import { useEffect, useState } from 'react'
import {allgames, gamesWithFilter, gamesCantidad} from './lib/data.js'
import Listcards from './components/Listacards.jsx'
import Filters from './components/Filters.jsx'
import Header from './components/Header.jsx'

function App() {
  const [logged, setlogged]=useState(false)
  const [limit, setLimit]=useState([0,20])
  const [cantidad,setCantidad]=useState(0)
  const [filter, setFilter]=useState({})
  const [games, setGames]=useState(null)

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

  return (
    <>
    <Header></Header>
    <main>
      <Filters cambiarLimit={(x)=>addLimit(x)} pasarFiltros={(x)=>addFilter(x)}></Filters>
      {games!=null 
        ? (cantidad==0) 
          ?<p>No tenemos juegos con esos filtros</p>
          :<Listcards games={games} cambiarLimit={(x)=>addLimit(x)} cantidad={cantidad} numeroCardXPagina={limit} />
        :<p>cargando....</p>}
    </main>
    </>
  )
}

export default App
