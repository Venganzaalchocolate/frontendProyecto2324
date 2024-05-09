import { useEffect, useState } from 'react'
import Card from './card';
import styles from '../styles/card.module.css';

const Listcards=({games, cambiarLimit, cantidad})=>{
    const [pagActual, setPagActual]=useState(1);
    
    const numPag=(((cantidad/10))<1)?0:(cantidad/10)+1;

    const cambiarPagina=(numPag)=>{
        cambiarLimit([numPag*10,((numPag*10)+10)])
    }
    const paginacion=()=>{
        const pag=[]
        for (let index = 1; index <= numPag; index++) {
           pag.push(<p key={`${index}pag`} onClick={()=>cambiarPagina(index-1)}>{index}</p>)
        }
        return pag
    }
    const juegos=games;
    return <div className={styles.contenedor}>
        <div className={styles.divPaginacion}>
            {paginacion()}
        </div>
        <div className={styles.gridCard}>
            {juegos.map((juego)=><Card juego={juego}/>)}
        </div> 
    </div>
        
}

export default Listcards