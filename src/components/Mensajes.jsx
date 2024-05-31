
import styles from '../styles/form.module.css';
import stylesDos from '../styles/mensaje.module.css';


import { Link, useNavigate } from 'react-router-dom';


export const Mensajes = ({ titulo, contenido,cerrarMensaje, navegacion}) => {

    const navigate = useNavigate()

    return (
        <div className={stylesDos.contenedor}>
            <div className={`${styles.cajaForm} ${stylesDos.cajaMensaje}`}>
                <h2 className={stylesDos.titulo}>{titulo}</h2>
                <p>{contenido}</p>
                <Link to={navegacion} onClick={()=>cerrarMensaje()}>
                    <button>CERRAR</button>
                </Link>
            </div>

        </div>

    )
}