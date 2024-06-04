import styles from '../../../styles/form.module.css';
import stylesDos from '../../../styles/panelControl.module.css';
import { useState, useEffect } from 'react';
import { validText, validNumber, validDecimalNumber, validCategory } from '../../../lib/valid';
import { textErrors } from '../../../lib/textErrors';
import { gamesCategory, gamesWithFilter, gamesPut, gamesDelete } from '../../../lib/data';
import { useLogin } from '../../../hooks/useLogin';
import { obtenerToken } from '../../../lib/serviceToken';
import { useNavigate } from 'react-router-dom';

const BorrarJuego = ({ cancelarAccion, addMensaje }) => {
    const [category, setCategorias] = useState([])
    const [juegosSeleccionado, setJuego] = useState(null)
    const [listaBusqueda, setListaBusqueda] = useState(null)
    const [confirmacion, setConfirmacion] = useState(null)
    const { logged } = useLogin()

    const [datos, setDatos] = useState({
        juego: null,
        name_buscar: null,
        name: null,
        category: category[0],
        author: null,
        publisher: null,
        numberOfPlayers: null,
        recommendedAge: null,
        duration: null,
        description: null,
        image: 'dulcecaos',
        price: null,
        stock: null
    })


    const [errores, setError] = useState({
        name_buscar: null,
        name: null,
        category: null,
        author: null,
        publisher: null,
        numberOfPlayers: null,
        recommendedAge: null,
        duration: null,
        description: null,
        price: null,
        stock: null
    })

    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatos = async () => {
            const respuesta = await gamesCategory()
            setCategorias(respuesta)
        }
        cargarDatos();
    }, [])

    const handleChange = (e) => {

        let auxErrores = { ...errores }
        let auxDatos = { ...datos }
        auxErrores['mensajeError'] = null
        let valido = false;

        if (e.target.name == 'name') valido = validText(e.target.value, 1, 200, true)
        if (e.target.name == 'category') valido = validCategory(category, e.target.value)
        if (e.target.name == 'author') valido = validText(e.target.value, 1, 50, false)
        if (e.target.name == 'publisher') valido = validText(e.target.value, 1, 50, true)
        if (e.target.name == 'numberOfPlayers') valido = validNumber(e.target.value)
        if (e.target.name == 'recommendedAge') valido = validNumber(e.target.value)
        if (e.target.name == 'duration') valido = validNumber(e.target.value)
        if (e.target.name == 'description') valido = validText(e.target.value, 1, 500, true)
        //if (e.target.name == 'image') valido = validText(e.target.value, datos.password)
        if (e.target.name == 'price') valido = validDecimalNumber(e.target.value)
        if (e.target.name == 'stock') valido = validNumber(e.target.value, true)

        auxDatos[e.target.name] = e.target.value

        setDatos(auxDatos)
        if (!valido) {
            auxErrores[e.target.name] = textErrors(e.target.name)
        } else {
            auxErrores[e.target.name] = null
        }
        setError(auxErrores)
    }

    const borrarJuego = async () => {
        const token = obtenerToken()
        
        const juegoBorrado = await gamesDelete(token, datos.juego)

        if (juegoBorrado.error) {
            let auxErrores = { ...errores }
            auxErrores['mensajeError'] = juegoModificado.message;
            setError(auxErrores)
        } else {
            addMensaje('JUEGO BORRADO', `Juego: ${datos.juego} borrado con éxito`, '/admin')
            cancelarAccion()
        }

    }

    const buscar = async () => {
        const textoBuscar=datos.name_buscar
        const respuesta = await gamesWithFilter(textoBuscar.toLowerCase())
        if (respuesta.error) {
            let auxErrores = { ...errores }
            auxErrores['mensajeError'] = respuesta.message;
            setError(auxErrores)
        } else {
            setJuego(null)
            setListaBusqueda(respuesta)
        }

    }

    const seleccionarJuego = () => {
        setConfirmacion(null)
        const juegoAux = listaBusqueda.filter((x) => x._id == datos.juego)[0]
        if (juegoAux != undefined) {
            setJuego(juegoAux)
            const datosAux = {
                juego: juegoAux._id,
                name_buscar: datos.name_buscar,
                name: juegoAux.name,
                category: juegoAux.category,
                author: juegoAux.author,
                publisher: juegoAux.publisher,
                numberOfPlayers: juegoAux.numberOfPlayers,
                recommendedAge: juegoAux.recommendedAge,
                duration: juegoAux.duration,
                description: juegoAux.description,
                image: juegoAux.image,
                price: juegoAux.price,
                stock: juegoAux.stock
            }
            setDatos(datosAux)
        }
    }

    return <div className={styles.cajaForm}>
        <h2>BORRAR JUEGO</h2>
        <div className={stylesDos.cajaJuegos}>
            <h3>BUSCAR JUEGO</h3>
            <div className={styles.cajaInputs}>
                <label for='name_buscar'>Nombre del juego</label>
                <input type="text" id='name_buscar' name='name_buscar' onChange={(e) => handleChange(e)} value={datos.name_buscar} />
                <span className='errorSpan'>{errores.name_buscar}</span>
            </div>
            <button onClick={() => buscar()}>BUSCAR</button>
            <button onClick={() => cancelarAccion()}>CANCELAR</button>
        </div>
        {listaBusqueda != null &&
            <div className={stylesDos.cajaPedidos}>
                <h3>SELECCIONA UN JUEGO</h3>

                <select name='juego' id='juego' onChange={(e) => handleChange(e)} value={datos.juego}>
                    <option>Selecciona un juego</option>
                    {listaBusqueda.map((x) => {
                        return <option value={x._id}>{x.name}</option>
                    })}
                </select>

                <button onClick={() => seleccionarJuego()}>BORRAR</button>
            </div>
        }
        {juegosSeleccionado != null &&
            <>
                <div className={styles.cajaInputs}>
                    <label for='name'>Nombre del juego</label>
                    <input type="text" disabled id='name' name='name' onChange={(e) => handleChange(e)} value={datos.name} />
                    <span className='errorSpan'>{errores.name}</span>
                </div>
                <div className={styles.cajaInputs}>
                    <label for='category'>Categoria del juego</label>
                    <select id='category' name='category' disabled onChange={(e) => handleChange(e)}>
                        {category.map((x) => {
                            return <option value={x}>{x}</option>
                        })}
                    </select>
                    <span className='errorSpan'>{errores.category}</span>
                </div>
                <div className={styles.cajaInputs}>
                    <label for='author'>Autor del juego</label>
                    <input type="text" id='author' disabled name='author' onChange={(e) => handleChange(e)} value={datos.author} />
                    <span className='errorSpan'>{errores.author}</span>
                </div>
                <div className={styles.cajaInputs}>
                    <label for='publisher'>Editorial del juego</label>
                    <input type="text" id='publisher' disabled name='publisher' onChange={(e) => handleChange(e)} value={datos.publisher} />
                    <span className='errorSpan'>{errores.publisher}</span>
                </div>
                <div className={styles.cajaInputs}>
                    <label for='numberOfPlayers'>Número de jugadores</label>
                    <input type="text" id='numberOfPlayers' disabled name='numberOfPlayers' onChange={(e) => handleChange(e)} value={datos.numberOfPlayers} />
                    <span className='errorSpan'>{errores.numberOfPlayers}</span>
                </div>
                <div className={styles.cajaInputs}>
                    <label for='recommendedAge'>Edad recomendada del juego</label>
                    <input type="text" id='recommendedAge' disabled name='recommendedAge' onChange={(e) => handleChange(e)} value={datos.recommendedAge} />
                    <span className='errorSpan'>{errores.recommendedAge}</span>
                </div>
                <div className={styles.cajaInputs}>
                    <label for='duration'>Duración del juego</label>
                    <input type="text" id='duration' disabled name='duration' onChange={(e) => handleChange(e)} value={datos.duration} />
                    <span className='errorSpan'>{errores.duration}</span>
                </div>
                <div className={styles.cajaInputs}>
                    <label for='description'>Descripción del juego</label>
                    <textarea id='description' disabled name='description' onChange={(e) => handleChange(e)} value={datos.description} />
                    <span className='errorSpan'>{errores.description}</span>
                </div>
                <div className={styles.cajaInputs}>
                    <label for='price'>Precio del juego</label>
                    <input type="text" id='price' disabled name='price' onChange={(e) => handleChange(e)} value={datos.price} />
                    <span className='errorSpan'>{errores.price}</span>
                </div>
                <div className={styles.cajaInputs}>
                    <label for='stock'>Stock actual</label>
                    <input type="text" id='stock' disabled name='stock' onChange={(e) => handleChange(e)} value={datos.stock} />
                    <span className='errorSpan'>{errores.stock}</span>
                </div>

                <button onClick={() => setConfirmacion(true)}>BORRAR</button>
                {confirmacion != null &&
                    <div className={stylesDos.cajaPedidos}>
                        <p>¿Estas seguro que quieres borrar el juego con id: {datos.juego}?</p>
                        <button onClick={() => borrarJuego()}>Si</button>
                        <button onClick={() => setConfirmacion(null)}>Cancelar</button>
                    </div>
                }
                <button onClick={() => cancelarAccion()}>CANCELAR</button>
                <span className='errorSpan'>{errores.mensajeError}</span>
            </>
        }

    </div>
}

export default BorrarJuego;