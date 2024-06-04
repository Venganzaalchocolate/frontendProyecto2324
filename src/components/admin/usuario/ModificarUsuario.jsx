import { useState } from 'react';
import styles from '../../../styles/form.module.css';
import stylesDos from '../../../styles/panelControl.module.css';
import { validEmail, validPassword, validText, validPasswordRepeat, validUser } from '../../../lib/valid';
import { textErrors } from '../../../lib/textErrors';
import { modificarusuario, tokenUser } from '../../../lib/data';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { userWithFilter } from '../../../lib/data';

export const ModificarUsuario = ({ addMensaje, token, cancelarAccion }) => {
    const [usuarioSeleccionado, setUsuario] = useState(null)
    const [listaBusqueda, setListaBusqueda] = useState(null)
    const [noEditar, setEditar] = useState(true)
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

    const navigate = useNavigate()

    const buscar = async () => {
        const textoBuscar = datos.name_buscar
        const respuesta = await userWithFilter(textoBuscar.toLowerCase(), token)
        console.log(respuesta)
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

    const editar = () => {
        setEditar(!noEditar)
    }


    const guardarCambios = async () => {
        let valido = true;
        let auxErrores = { ...errores }
        for (const key in datos) {
            if (datos[key] == null) {
                auxErrores[key] = textErrors('vacio')
                valido = false;
            }
        }
        if (datos['password'] != '' && datos['passwordR'] == '') {
            auxErrores['passwordR'] = textErrors('vacio');
            valido = false;
        }
        setError(auxErrores)
        if (valido) {
            const passwordNueva = (datos.password != '') ? datos.password : null
            console.log(datos.usuario)
            const usuarioModificado = await modificarusuario(datos.usuario, datos.nombre, datos.email, passwordNueva, datos.direccion, token, datos.role)
            if (usuarioModificado.error) {
                let auxErrores = { ...errores }
                let mensajeAux = (usuarioModificado.message.includes('E11000 duplicate key error collection: test.users index: name_1'))
                    ? textErrors('nombreDuplicado')
                    : (usuarioModificado.message.includes('E11000 duplicate key error collection: test.users index: email_1'))
                        ? textErrors('emailDuplicado')
                        : usuarioModificado.message
                auxErrores['mensajeError'] = mensajeAux;
                setError(auxErrores)
            } else {
                addMensaje('USUARIO MODIFICADO', `Usuario: '${usuarioModificado.name}' modificado con éxito`, '/admin')
                cancelarAccion()
            }


        }
    }


    return (
        <div className={styles.cajaForm}>
            <h2>MODIFICAR USUARIO</h2>
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

                    <button onClick={() => seleccionarUsuario()}>EDITAR</button>
                </div>
            }
            {usuarioSeleccionado != null &&
                <>
                    <div className={styles.cajaInputs}>
                        <label for='nombre'>Nombre Completo</label>
                        <input type="nombre" id='nombre' name='nombre' onChange={(e) => handleChange(e)} value={datos.nombre} />
                        <span className='errorSpan'>{errores.nombre}</span>
                    </div>
                    <div className={styles.cajaInputs}>
                        <label for='email'>Email</label>
                        <input type="email" id='email' name='email' onChange={(e) => handleChange(e)} value={datos.email} />
                        <span className='errorSpan'>{errores.email}</span>
                    </div>
                    <div className={styles.cajaInputs}>
                        <label for='direccion'>Dirección</label>
                        <input type="direccion" id='direccion' name='direccion' onChange={(e) => handleChange(e)} value={datos.direccion} />
                        <span className='errorSpan'>{errores.direccion}</span>
                    </div>
                    <div className={styles.cajaInputs}>
                        <label for='role'>ROL</label>
                        <select id='role' name='role' onChange={(e) => handleChange(e)} value={datos.role}>
                            {datos.role!=null && <option selected value={datos.role}>{datos.role}</option>}
                            <option value={datos.role=='admin'?'normal':'admin'}>{datos.role=='admin'?'normal':'admin'}</option>
                        </select>
                        <span className='errorSpan'>{errores.role}</span>
                    </div>
                    <div className={styles.cajaInputs}>
                        <label for='password'>Contraseña</label>
                        <input type="password" id='password'  name='password' onChange={(e) => handleChange(e)} value={datos.password} />
                        <span className='errorSpan'>{errores.password}</span>
                    </div>
                    <div className={styles.cajaInputs}>
                        <label for='passwordR'>Repita la Contraseña</label>
                        <input type="password" id='passwordR'  name='passwordR' onChange={(e) => handleChange(e)} value={datos.passwordR} />
                        <span className='errorSpan'>{errores.passwordR}</span>
                    </div>

                    <button onClick={() => guardarCambios()}>GUARDAR</button>
                    <button onClick={() => cancelarAccion()}>CANCELAR</button>
                    <span className='errorSpan'>{errores.mensajeError}</span>
                </>
            }

        </div>
    )
}

export default ModificarUsuario;