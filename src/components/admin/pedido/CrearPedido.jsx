import stylesDos from '../../../styles/panelControl.module.css';
import { useState } from 'react';
import { validText} from '../../../lib/valid';
import { textErrors } from '../../../lib/textErrors';
import { gamesWithFilter, userWithFilter } from '../../../lib/data';
import styles from '../../../styles/form.module.css';
import stylesTres from '../../../styles/pedido.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { crearPedido } from '../../../lib/data';

const CrearPedido = ({ cancelarAccion, addMensaje, token }) => {
    const [usuarioSeleccionado, setUsuario] = useState(null)
    const [products, setProducts] = useState([])
    const [listaBusqueda, setListaBusqueda] = useState(null)
    const [direccion, setDireccion] = useState('')
    const [listaBusquedaJuego, setlistaBusquedaJuego] = useState(null)
    const [cambiarDireccion, setCambiarDireccion] = useState(false)
    const [datos, setDatos] = useState({
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

    const buscarJuego = async () => {
        const textoBuscar = datos.juego_buscar
        let respuesta = await gamesWithFilter(textoBuscar.toLowerCase())
        respuesta=respuesta.filter((x)=>x.stock>0)
        if (respuesta.error) {
            let auxErrores = { ...errores }
            auxErrores['mensajeError'] = respuesta.message;
            setError(auxErrores)
        } else {
            setlistaBusquedaJuego(respuesta)
        }
    }

    const addQuantity = (x) => {
        const productInCart = products.findIndex(item => item._id == x._id)
        if (productInCart >= 0) {
            const auxCart = structuredClone(products)
            if (auxCart[productInCart].stock > auxCart[productInCart].quantity) auxCart[productInCart].quantity += 1
            return setProducts(auxCart)
        }
    }

    const reduceQuantity = (x) => {
        const productInCart = products.findIndex(item => item._id == x._id)
        if (productInCart >= 0) {
            const auxCart = structuredClone(products)
            if (auxCart[productInCart].quantity == 1) auxCart.splice(productInCart, 1)
            else auxCart[productInCart].quantity -= 1
            return setProducts(auxCart)
        }
    }

    const removeProduct = product => {
        const productInCart = products.findIndex(item => item._id == product._id)

        if (productInCart >= 0) {
            const auxCart = structuredClone(products)
            auxCart.splice(productInCart, 1)
            return setProducts(auxCart)
        }
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
            setListaBusqueda(respuesta)
        }
    }

    const seleccionarJuego = () => {
        let listaJuegosAux = [...products]
        if(products.findIndex(item => item._id == datos.juego)==-1){
            let juego = listaBusquedaJuego.filter((x) => x._id == datos.juego)
            juego[0]['quantity'] = 1
            listaJuegosAux.push(juego[0])
            setProducts(listaJuegosAux) 
        }
        
    }

    const seleccionarUsuario = () => {
        const usuarioAux = listaBusqueda.filter((x) => x._id == datos.usuario)[0]
        if (usuarioAux != undefined) {
            setUsuario(usuarioAux)
            const datosAux = {
                usuario: usuarioAux._id,
                name_buscar: datos.name_buscar,
                email: usuarioAux.email,
                nombre: usuarioAux.name,
                direccion: usuarioAux.direction,
                role: usuarioAux.role
            }
            setDatos(datosAux)
        }
    }

    const [errores, setError] = useState({
        direccion: null,
    })


    const crearOrder = async () => {
        const auxPedido = await crearPedido(datos.usuario, products, datos.direccion, token, precioTotal);
        if (auxPedido.error) addMensaje('Error al tramitar el pedido', 'No se ha podido tramitar el pedido, vuelva a intentarlo más tarde')
        else {
            addMensaje('Pedido Tramitado', `Pedido tramitado con éxito, en breve el usuario ${datos.name} recibirá un email de confirmación`, '/admin');
        }
    }

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

    const cambiarDir = () => {
        setCambiarDireccion(!cambiarDireccion)
    }



    return (
        <div className={styles.cajaForm}>
            <h2>CREAR PEDIDO</h2>
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
            {usuarioSeleccionado != null &&
                <div className={stylesDos.cajaJuegos}>
                    <h3>BUSCAR JUEGO</h3>
                    <div className={styles.cajaInputs}>
                        <label for='juego_buscar'>Nombre del juego</label>
                        <input type="text" id='juego_buscar' name='juego_buscar' onChange={(e) => handleChange(e)} value={datos.juego_buscar} />
                        <span className='errorSpan'>{errores.juego_buscar}</span>
                    </div>
                    <button onClick={() => buscarJuego()}>BUSCAR</button>
                    
                </div>
            }

            {listaBusquedaJuego != null &&
                <div className={stylesDos.cajaPedidos}>
                    <h3>SELECCIONA UN JUEGO</h3>
                    <select name='juego' id='juego' onChange={(e) => handleChange(e)} value={datos.juego}>
                        <option>Selecciona un juego</option>
                        {listaBusquedaJuego.map((x) => {
                            return <option value={x._id}>{x.name}</option>
                        })}
                    </select>

                    <button onClick={() => seleccionarJuego()}>AÑADIR JUEGO</button>
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
                        {!cambiarDireccion && <p>{datos.direccion}</p>}
                        {!cambiarDireccion && <button onClick={() => cambiarDir()}>Cambiar dirección de envio</button>}
                        {cambiarDireccion && <input type="text" id='direccion' name='direccion' onChange={(e) => handleChange(e)} value={datos.direccion} />}
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
                                <p><label onClick={() => addQuantity(x)}>+&nbsp;&nbsp;</label>{x.quantity}<label onClick={() => reduceQuantity(x)}>&nbsp;&nbsp;-</label></p>
                            </div>
                            <div className={stylesTres.cajaDato}>
                                <label>Total:</label>
                                <p>{(x.quantity * x.price).toFixed(2)} €</p>
                            </div>
                            <FaTrashAlt onClick={() => removeProduct(x)}></FaTrashAlt>
                        </div>
                    })}
                    <p className={stylesTres.precioTotal}>TOTAL: {precioTotal.toFixed(2)} €</p>
                    <p className={stylesTres.tituloDatos} >METODO DE PAGO:</p>
                    <div>
                        <input id='pago' name='pago' type='radio' checked />
                        <label htmlFor="pago">Tranferencia</label>
                    </div>
                    {products.length>0 && <button className={stylesTres.button} onClick={() => crearOrder()}>TRAMITAR PEDIDO</button>}
                    <button onClick={() => cancelarAccion()}>CANCELAR</button>

                </>
            }
        <button onClick={() => cancelarAccion()}>CANCELAR</button>
        </div>
    )
}

export default CrearPedido;