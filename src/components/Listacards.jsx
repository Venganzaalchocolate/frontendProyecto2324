import { useEffect, useState } from 'react'
import Card from './card';
import styles from '../styles/card.module.css';

const Listcards=({games, cambiarLimit, cantidad, numeroCardXPagina})=>{
    const numPag=Math.ceil((((cantidad/numeroCardXPagina[1]))<1)?0:(cantidad/numeroCardXPagina[1]));

    const cambiarPagina=(numPag)=>{
        const inicio=numPag*numeroCardXPagina[1];
        cambiarLimit([inicio,numeroCardXPagina[1]])
    }

    const paginacion=()=>{
        const pag=[]
        pag.push(<p onClick={()=>cambiarPagina(0)}>&lt;&lt;</p>)
        for (let index = 1; index <= numPag; index++) {
            if(Math.ceil(numeroCardXPagina[0]/numeroCardXPagina[1])==index-1) pag.push(<p className={styles.pagActual} onClick={()=>cambiarPagina(index-1)}>{index}</p>)
            else pag.push(<p onClick={()=>cambiarPagina(index-1)}>{index}</p>)
        }
        pag.push(<p onClick={()=>cambiarPagina(numPag-1)}>&gt;&gt;</p>)
        return pag
    }
    const juegos=games;
    return <div className={styles.contenedor}>
        {numPag>0 && <div className={styles.divPaginacion}>
            {paginacion()}
        </div>}
        <div className={styles.gridCard}>
            {juegos.map((juego)=><Card juego={juego}/>)}
        </div> 
        {numPag>0 && <div className={styles.divPaginacion}>
            {paginacion()}
        </div>}
    </div>
        
}

export default Listcards