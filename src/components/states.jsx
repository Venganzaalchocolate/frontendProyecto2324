import styles from '../styles/state.module.css';
export const Estados=({estado})=>{
    return (estado=='Pagado') 
        ? <span className={`${styles.forma} ${styles.pagado}`}>PAGADO</span>
        : (estado=='Preparando') 
            ? <span className={`${styles.forma} ${styles.preparando}`}>EN PREPARACIÓN</span>
            : (estado=='Enviado')
                ? <span className={`${styles.forma} ${styles.enviado}`}>ENVIADO</span>
                : <span className={`${styles.forma} ${styles.entregado}`}>ENTREGADO</span>

}

//Pagado', 'Preparando', 'Enviado', 'Entregado