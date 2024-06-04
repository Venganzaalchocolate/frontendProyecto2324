import styles from '../../../styles/form.module.css';
import stylesDos from '../../../styles/panelControl.module.css';
import { useState} from 'react';
import { validText, validPasswordRepeat, validPassword, validEmail} from '../../../lib/valid';
import { textErrors } from '../../../lib/textErrors';
import { useNavigate, Link } from 'react-router-dom';
import { crearusuario } from '../../../lib/data';

const CrearUsuario = ({ cancelarAccion, addMensaje }) => {
    const [datos,setDatos]=useState({
        email: null,
        password: null,
        nombre: null,
        direccion: null,
        passwordR: null
    })
    const [errores, setError] = useState({
        email: null,
        password: null,
        nombre: null,
        direccion: null,
        passwordR: null
    })

    const navigate=useNavigate();

    const handleChange = (e) => {
        let auxErrores = { ...errores }
        let auxDatos= {...datos}
        auxErrores['mensajeError'] = null
        let valido = false;

        if (e.target.name == 'email') valido = validEmail(e.target.value)
        if (e.target.name == 'nombre') valido = validText(e.target.value, 1, 50, false)
        if (e.target.name == 'direccion')valido = validText(e.target.value, 1, 200, true)
        if (e.target.name == 'password')valido = validPassword(e.target.value)
        if (e.target.name == 'passwordR') valido = validPasswordRepeat(e.target.value, datos.password)

        auxDatos[e.target.name]=e.target.value
        setDatos(auxDatos)
        if (!valido) {
            auxErrores[e.target.name] = textErrors(e.target.name)
        } else {
            auxErrores[e.target.name] = null
        }
        setError(auxErrores)
    }

    const crearCuenta = async () => {
        let valido = true;
        let auxErrores = { ...errores }
        for (const key in datos) {
            if (datos[key] == null) {
                auxErrores[key] = textErrors('vacio')
                setError(auxErrores)
                valido = false;
            }
        }

        if (valido) {
            const usuarioNuevo=await crearusuario(datos.nombre, datos.email, datos.password, datos.direccion)
            if (usuarioNuevo.error) {
                let auxErrores = { ...errores }
                auxErrores['mensajeError'] = usuarioNuevo.message;
                setError(auxErrores)
            } else {
                addMensaje('USUARIO CREADO', `Usuario: ${usuarioNuevo.name} añadido con éxito`, '/admin')
                cancelarAccion()
            }
        }
    }
    return (
        <div className={styles.cajaForm}>
            <h2>CREAR CUENTA</h2>
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
                <label for='password'>Contraseña</label>
                <input type="password" id='password' name='password' onChange={(e) => handleChange(e)} value={datos.password} />
                <span className='errorSpan'>{errores.password}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='passwordR'>Repita la Contraseña</label>
                <input type="password" id='passwordR' name='passwordR' onChange={(e) => handleChange(e)} value={datos.passwordR} />
                <span className='errorSpan'>{errores.passwordR}</span>
            </div>

            <button onClick={() => crearCuenta()}>GUARDAR</button>
            <button onClick={() => cancelarAccion()}>CANCELAR</button>
            <span className='errorSpan'>{errores.mensajeError}</span>
        </div>
    )
}

export default CrearUsuario;