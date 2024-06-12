
import { formatDateTime } from '../../lib/utils';
import styles from '../../styles/form.module.css';
import stylesDos from '../../styles/pedido.module.css';
import { Estados } from '../states';
import { Link } from 'react-router-dom';

export const Pedido = ({pedido}) => {
    return (
        <div className={styles.cajaForm}>
            <h2 className={stylesDos.titulo}>Nº PEDIDO: {pedido._id}</h2>
            <div className={stylesDos.contenedorEstado}>
                <p className={stylesDos.tituloDatos}>FECHA: {formatDateTime(pedido.date)}</p>
                <span><Estados estado={pedido.state}/></span>
            </div>
            <p className={stylesDos.tituloDatos} >DIRECCIÓN:</p>
            <p>{pedido.address}</p>
            <p className={stylesDos.tituloDatos} >PRODUCTOS:</p>
            {pedido.listaJuegos.map((x)=>{
                return <div className={stylesDos.cajaJuego}>
                    <h3>{x._id}</h3>
                    <div className={stylesDos.cajaDato}>
                        <label>Precio:</label>
                        <p>{x.price} €</p>
                    </div>
                    <div className={stylesDos.cajaDato}>
                        <label>Qt:</label>
                        <p>{x.quantity}</p>
                    </div>
                    <div className={stylesDos.cajaDato}>
                        <label>Total:</label>
                        <p>{x.quantity*x.price} €</p>
                    </div>
                </div>
            })}
            <p className={stylesDos.precioTotal}>TOTAL: {pedido.totalPrice} €</p>
            <p>¿Has tenido algún problema?</p>
            <Link className='enlace' to='/contacto'>
                <button>CONTACTAR</button>
            </Link>
            
        </div>
    )
}