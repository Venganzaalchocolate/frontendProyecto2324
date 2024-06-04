import { useState } from 'react';
import styles from '../../../styles/form.module.css';
import stylesDos from '../../../styles/panelControl.module.css';
import { validEmail, validPassword, validText, validPasswordRepeat, validUser } from '../../../lib/valid';
import { textErrors } from '../../../lib/textErrors';
import { borrarUsuario} from '../../../lib/data';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { userWithFilter } from '../../../lib/data';

export const EliminarUsuario = ({ addMensaje, token, cancelarAccion }) => {
    const [usuarioSeleccionado, setUsuario] = useState(null)
    const [listaBusqueda, setListaBusqueda] = useState(null)
    const [confirmacion, setConfirmacion] = useState(null)
    const [datos, setDatos] = useState({
        usuario: null,
        name_buscar: null,
        email: null,
        password: '',
        nombre: null,
        direccion: null,
        passwordR: '',
        role:null
    })

    const borrarUser= async () => {
        const usuarioBorrado = await borrarUsuario(datos.usuario, token)
        console.log(usuarioBorrado)
        if (usuarioBorrado.error) {
            let auxErrores = { ...errores }
            auxErrores['mensajeError'] = usuarioBorrado.message;
            setError(auxErrores)
        } else {
            addMensaje('USUARIO BORRADO', `Usuario: ${datos.nombre} borrado con éxito`, '/admin')
            cancelarAccion()
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

    const seleccionarUsuario = () => {
        const usuarioAux = listaBusqueda.filter((x) => x._id == datos.usuario)[0]
        if (usuarioAux != undefined) {
            console.log(usuarioAux)
            setUsuario(usuarioAux)
            const datosAux = {
                usuario:usuarioAux._id,
                name_buscar: datos.name_buscar,
                email: usuarioAux.email,
                password: '',
                nombre: usuarioAux.name,
                direccion: usuarioAux.direction,
                passwordR: '',
                role:usuarioAux.role
            }
            setDatos(datosAux)
        }

    }

    const [errores, setError] = useState({
        email: null,
        password: null,
        nombre: null,
        direccion: null,
        passwordR: null
    })


    const handleChange = (e) => {
        let auxErrores = { ...errores }
        let auxDatos = { ...datos }
        auxErrores['mensajeError'] = null
        let valido = false;

        if (e.target.name == 'email') valido = validEmail(e.target.value)
        if (e.target.name == 'nombre') valido = validText(e.target.value, 1, 50, false)
        if (e.target.name == 'direccion') valido = validText(e.target.value, 1, 200, true)
        if (e.target.name == 'role') valido = (e.target.value==('admin'||'normal'))
        if (e.target.name == 'password') valido = validPassword(e.target.value)
        if (e.target.name == 'passwordR') valido = validPasswordRepeat(e.target.value, datos.password)

        auxDatos[e.target.name] = e.target.value
        setDatos(auxDatos)
        if (!valido) {
            auxErrores[e.target.name] = textErrors(e.target.name)
        } else {
            auxErrores[e.target.name] = null
        }
        setError(auxErrores)
    }




    return (
        <div className={styles.cajaForm}>
            <h2>ELIMINAR USUARIO</h2>
            <div className={stylesDos.cajausuarios}>
                <h3>BUSCAR USUARIO</h3>
                <div className={styles.cajaInputs}>
                    <label for='name_buscar'>Nombre del usuario</label>
                    <input type="text" id='name_buscar' name='name_buscar' onChange={(e) => handleChange(e)} value={datos.name_buscar} />
                    <span className='errorSpan'>{errores.name_buscar}</span>
                </div>
                <button onClick={() => buscar()}>BUSCAR</button>
                <button onClick={() => cancelarAccion()}>CANCELAR</button>
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
                <>
                    <div className={styles.cajaInputs}>
                        <label for='nombre'>Nombre Completo</label>
                        <input type="nombre" id='nombre' name='nombre' disabled  value={datos.nombre} />
                        <span className='errorSpan'>{errores.nombre}</span>
                    </div>
                    <div className={styles.cajaInputs}>
                        <label for='email'>Email</label>
                        <input type="email" id='email' name='email' disabled  value={datos.email} />
                        <span className='errorSpan'>{errores.email}</span>
                    </div>
                    <div className={styles.cajaInputs}>
                        <label for='direccion'>Dirección</label>
                        <input type="direccion" id='direccion' disabled name='direccion'  value={datos.direccion} />
                        <span className='errorSpan'>{errores.direccion}</span>
                    </div>
                    <div className={styles.cajaInputs}>
                        <label for='role'>ROL</label>
                        <select id='role' name='role'disabled value={datos.role}>
                            {datos.role!=null && <option selected value={datos.role}>{datos.role}</option>}
                            <option value={datos.role=='admin'?'normal':'admin'}>{datos.role=='admin'?'normal':'admin'}</option>
                        </select>
                        <span className='errorSpan'>{errores.role}</span>
                    </div>
                    <button onClick={() => setConfirmacion(true)}>BORRAR</button>
                {confirmacion != null &&
                    <div className={stylesDos.cajaPedidos}>
                        <p>¿Estas seguro que quieres borrar el usuario con id: {datos.usuario} y nombre {datos.nombre}?</p>
                        <button onClick={() => borrarUser()}>Si</button>
                        <button onClick={() => setConfirmacion(null)}>Cancelar</button>
                    </div>
                }
                <button onClick={() => cancelarAccion()}>CANCELAR</button>
                    <span className='errorSpan'>{errores.mensajeError}</span>
                </>
            }

        </div>
    )
}

export default EliminarUsuario;