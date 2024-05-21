import Filters from "./Filters";
import Listcards from "./Listacards";
import styles from "../styles/inicio.module.css"

export const Inicio=(props)=>{
  console.log(props.cantidad, props.games)
    return <div className={styles.cajainicio}>
    <Filters cambiarLimit={(x)=>props.addLimit(x)} pasarFiltros={(x)=>props.addFilter(x)}></Filters>
    {props.games!=null 
        ? (props.cantidad==0) 
          ?<p>No tenemos juegos con esos filtros</p>
          :<Listcards games={props.games} cambiarLimit={(x)=>props.addLimit(x)} cantidad={props.cantidad} numeroCardXPagina={props.limit} />
        :<p>cargando....</p>}
    </div>
}
