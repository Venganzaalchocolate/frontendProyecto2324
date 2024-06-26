import stylesDos from '../../../styles/panelControl.module.css';
import { useState } from 'react';
import { validText} from '../../../lib/valid';
import { textErrors } from '../../../lib/textErrors';
import { gameId, gamesWithFilter, historyOrders, modificarPedido, userWithFilter } from '../../../lib/data';
import styles from '../../../styles/form.module.css';
import stylesTres from '../../../styles/pedido.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { crearPedido } from '../../../lib/data';
import { formatDateTime } from '../../../lib/utils';

const DeshabilitarPedido = ({ cancelarAccion, addMensaje, token }) => {
    const [usuarioSeleccionado, setUsuario] = useState(null)
    const [products, setProducts] = useState([])
    const [orders, setOrders]=useState(null)
    const [listaBusqueda, setListaBusqueda] = useState(null)
    const [confirmacion, setConfirmacion] = useState(null)
    const [datos, setDatos] = useState({
        pedido:null,
        usuario: null,
        juego: null,
        juego_buscar: null,
        name_buscar: null,
        email: null,
        password: '',
        nombre: null,
        direccion: null,
        passwordR: '',
        role: null
    })

    let precioTotal = 0;

    const seleccionarPedido=()=>{
        const productsInOrderAux=orders.filter((x)=>x._id==datos.pedido)[0]
        let productsAux= productsInOrderAux.listaJuegos.map( (x)=>{
            return {
                _id:x.gameId,
                name:x.nameGame,
                price:x.price,
                quantity:x.quantity,
                stock:x.quantity
            }
        })
        setProducts(productsAux)
    }

    const buscar = async () => {
        const textoBuscar = datos.name_buscar
        const respuesta = await userWithFilter(textoBuscar.toLowerCase(), token)
        if (respuesta.error) {
            let auxErrores = { ...errores }
            auxErrores['mensajeError'] = respuesta.message;
            setError(auxErrores)
        } else {
            setUsuario(null)
            setOrders(null)
            setConfirmacion(null)
            setListaBusqueda(respuesta)
        }
    }


    const seleccionarUsuario = async () => {
        const usuarioAux = listaBusqueda.filter((x) => x._id == datos.usuario)[0]
        if (usuarioAux != undefined) {
            setUsuario(usuarioAux)
            let pedidosAux = await historyOrders(token, usuarioAux._id)
            pedidosAux=pedidosAux.filter((x)=>x.state=='Pagado'||x.state=='Pendiente de pago')
            setOrders(pedidosAux);
            const datosAux = {
                usuario: usuarioAux._id,
                name_buscar: datos.name_buscar,
                email: usuarioAux.email,
                nombre: usuarioAux.name,
                direccion: usuarioAux.direction,
            }
            setDatos(datosAux)
        }
    }

    const [errores, setError] = useState({
        direccion: null,
    })


    const handleChange = (e) => {
        let auxErrores = { ...errores }
        let auxDatos = { ...datos }
        auxErrores['mensajeError'] = null
        let valido = false;
        if (e.target.name == 'direccion') valido = validText(e.target.value, 1, 200, true)
        auxDatos[e.target.name] = e.target.value
        setDatos(auxDatos)
        if (!valido) {
            auxErrores[e.target.name] = textErrors(e.target.name)
        } else {
            auxErrores[e.target.name] = null
        }
        setError(auxErrores)
    }

    const borrarPedido=async()=>{
        const modificarPedidoAux=await modificarPedido(datos.pedido, token)
        setOrders(null)
        setUsuario(null)
        if (modificarPedidoAux.error) addMensaje('Error al dehabilitar el pedido', 'No se ha podido dehabilitar el pedido, vuelva a intentarlo más tarde')
            else {
                addMensaje('Pedido Dehabilitado', `Pedido Dehabilitado con éxito`, '/admin');
            }
    }



    return (
        <div className={styles.cajaForm}>
            <h2>DESHABILITAR PEDIDO</h2>
            <div className={stylesDos.cajausuarios}>
                <h3>BUSCAR USUARIO</h3>
                <div className={styles.cajaInputs}>
                    <label for='name_buscar'>Nombre del usuario</label>
                    <input type="text" id='name_buscar' name='name_buscar' onChange={(e) => handleChange(e)} value={datos.name_buscar} />
                    <span className='errorSpan'>{errores.name_buscar}</span>
                </div>
                <button onClick={() => buscar()}>BUSCAR</button>
                
            </div>
            {listaBusqueda != null &&
                <div className={stylesDos.cajaPedidos}>
                    <h3>SELECCIONA UN USUARIO</h3>

                    <select name='usuario' id='usuario' onChange={(e) => handleChange(e)} value={datos.usuario}>
                        <option>Selecciona un usuario</option>
                        {listaBusqueda.map((x) => {
                            return <option value={x._id}>{x.name}</option>
                        })}
                    </select>

                    <button onClick={() => seleccionarUsuario()}>SELECCIONAR</button>
                </div>
            }

            {orders != null &&
                <div className={stylesDos.cajaPedidos}>
                    <h3>SELECCIONA UN PEDIDO</h3>
                    <select name='pedido' id='pedido' onChange={(e) => handleChange(e)} value={datos.pedido}>
                        <option>Selecciona un pedido</option>
                        {orders.map((x) => {
                            return <option value={x._id}>{x._id} {formatDateTime(x.date)}</option>
                        })}
                    </select>
                    <button onClick={() => seleccionarPedido()}>SELECCIONAR</button>
                </div>
            }


            {usuarioSeleccionado != null &&
                <>
                    <div className={stylesTres.cajaDatosUsuario}>
                        <p className={stylesTres.tituloDatos} >Nombre:</p>
                        <p>{usuarioSeleccionado.name}</p>
                        <p className={stylesTres.tituloDatos} >CORREO ELECTRONICO:</p>
                        <p>{usuarioSeleccionado.email}</p>
                        <p className={stylesTres.tituloDatos} >DIRECCIÓN:</p>
                        <p>{datos.direccion}</p>
                    </div>

                    <p className={stylesTres.tituloDatos} >PRODUCTOS:</p>
                    {products.map((x) => {
                        precioTotal += x.quantity * x.price
                        return <div className={stylesTres.cajaJuego}>
                            <h3>{x.name}</h3>
                            <div className={stylesTres.cajaDato}>
                                <label>Precio:</label>
                                <p>{x.price} €</p>
                            </div>
                            <div className={stylesTres.cajaDato}>
                                <label>Qt:</label>
                                <p>{x.quantity}</p>
                            </div>
                            <div className={stylesTres.cajaDato}>
                                <label>Total:</label>
                                <p>{(x.quantity * x.price).toFixed(2)} €</p>
                            </div>
                        </div>
                    })}
                    <p className={stylesTres.precioTotal}>TOTAL: {precioTotal.toFixed(2)} €</p>
                    <p className={stylesTres.tituloDatos} >METODO DE PAGO:</p>
                    <div>
                        <input id='pago' name='pago' type='radio' checked />
                        <label htmlFor="pago">Tranferencia</label>
                    </div>
                    <button onClick={() => setConfirmacion(true)}>DESHABILITAR</button>
                    {confirmacion != null &&
                        <div className={stylesDos.cajaPedidos}>
                            <p>¿Estas seguro que quieres borrar el juego con id: {datos.juego}?</p>
                            <button onClick={() => borrarPedido()}>Si</button>
                            <button onClick={() => setConfirmacion(null)}>Cancelar</button>
                        </div>
                    }

                </>
            }
        <button onClick={() => cancelarAccion()}>CANCELAR</button>
        </div>
    )
}

export default DeshabilitarPedido;