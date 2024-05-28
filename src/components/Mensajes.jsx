
import styles from '../styles/form.module.css';
import stylesDos from '../styles/mensaje.module.css';


import { Link, useNavigate } from 'react-router-dom';


export const Mensajes = ({ titulo, mensaje,cerrarMensaje }) => {

    const navigate = useNavigate()


    return (
        <div className={stylesDos.contenedor}>
            <div className={`${styles.cajaForm}`}>
                <h2 className={stylesDos.titulo}>{titulo}</h2>
                <p>{mensaje}</p>
                <Link to={'/'} onClick={()=>cerrarMensaje()}>
                    <button>CERRAR</button>
                </Link>
            </div>

        </div>

    )
}