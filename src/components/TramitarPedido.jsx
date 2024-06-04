
import { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useLogin } from '../hooks/useLogin';
import styles from '../styles/form.module.css';
import stylesDos from '../styles/pedido.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { crearPedido } from '../lib/data';
import { obtenerToken } from '../lib/serviceToken';
import { calcularPrecio } from '../lib/utils';
import { Mensajes } from './Mensajes';


export const Tramitarpedido = ({ addMensaje }) => {
    const { products, removeProduct, reduceProduct, addCart, removeCart } = useCart()
    const { logged } = useLogin()
    const [direccion, setDireccion] = useState('')
    const [cambiarDireccion, setCambiarDireccion] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        if (!logged.estaLogueado) navigate('/login')
        if (products.length < 1) navigate('/')
    }, [logged, products]);


    const handleChange = (e) => {
        setDireccion(e.target.value)
    }

    const cambiarDir = () => {
        setCambiarDireccion(!cambiarDireccion)
    }

    let precioTotal = 0;

    const crearOrder = async () => {
        const token = obtenerToken();
        const auxPedido = await crearPedido(logged.user._id, products, direccion, token, precioTotal);
        if (auxPedido.error) addMensaje('Error al tramitar el pedido', 'No se ha podido tramitar el pedido, vuelva a intentarlo más tarde')
        else {
            removeCart();
            addMensaje('Pedido Tramitado', 'Gracias !!! en breve recibirá un email de confirmación');
        }


    }

    return (
        <div className={styles.cajaForm}>
            <h2 className={stylesDos.titulo}>CARRITO</h2>
            <div className={stylesDos.cajaDatosUsuario}>
                <p className={stylesDos.tituloDatos} >Nombre:</p>
                <p>{logged.user.name}</p>
                <p className={stylesDos.tituloDatos} >CORREO ELECTRONICO:</p>
                <p>{logged.user.email}</p>
                <p className={stylesDos.tituloDatos} >DIRECCIÓN:</p>
                {!cambiarDireccion && <p>{direccion}</p>}
                {!cambiarDireccion && <button onClick={() => cambiarDir()}>Cambiar dirección de envio</button>}
                {cambiarDireccion && <input type="text" id='direccion' name='direccion' onChange={(e) => handleChange(e)} value={direccion} />}
            </div>

            <p className={stylesDos.tituloDatos} >PRODUCTOS:</p>
            {products.map((x) => {
                precioTotal += x.quantity * x.price
                return <div className={stylesDos.cajaJuego}>
                    <h3>{x._id}</h3>
                    <div className={stylesDos.cajaDato}>
                        <label>Precio:</label>
                        <p>{x.price} €</p>
                    </div>
                    <div className={stylesDos.cajaDato}>
                        <label>Qt:</label>
                        <p><label onClick={() => addCart(x)}>+&nbsp;&nbsp;</label>{x.quantity}<label onClick={() => reduceProduct(x)}>&nbsp;&nbsp;-</label></p>
                    </div>
                    <div className={stylesDos.cajaDato}>
                        <label>Total:</label>
                        <p>{(x.quantity * x.price).toFixed(2)} €</p>
                    </div>
                    <FaTrashAlt onClick={() => removeProduct(x)}></FaTrashAlt>
                </div>
            })}
            <p className={stylesDos.precioTotal}>TOTAL: {precioTotal.toFixed(2)} €</p>
            <p className={stylesDos.tituloDatos} >METODO DE PAGO:</p>
            <div>
                <input id='pago' name='pago' type='radio' checked />
                <label htmlFor="pago">Tranferencia</label>
            </div>
            <button className={stylesDos.button} onClick={() => crearOrder()}>TRAMITAR PEDIDO</button>

        </div>
    )
}