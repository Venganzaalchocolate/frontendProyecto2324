import Filters from "./Filters";
import Listcards from "./Listacards";
import styles from "../styles/inicio.module.css"
import Spinner from "./spinner";

export const Inicio=(props)=>{
  return <div className={styles.cajainicio}>
    <Filters filtros={props.filtros} cambiarLimit={(x)=>props.addLimit(x)} pasarFiltros={(x)=>props.addFilter(x)}></Filters>
    {props.games!=null 
        ? (props.cantidad==0) 
          ?<p>No tenemos juegos con esos filtros</p>
          : <Listcards games={props.games} cambiarLimit={(x)=>props.addLimit(x)} cantidad={props.cantidad} numeroCardXPagina={props.limit} />
        :<p><Spinner></Spinner></p>}
    </div>
}
