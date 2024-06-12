import { useState } from 'react';
import styles from '../styles/form.module.css';
import { validEmail, validPassword, validText, validPasswordRepeat } from '../lib/valid';
import { textErrors } from '../lib/textErrors';
import { loggear, crearusuario } from '../lib/data';
import { useLogin } from '../hooks/useLogin';
import { guardarToken } from '../lib/serviceToken';
import { useNavigate, Link } from 'react-router-dom';


export const Crearcuentausuario = ({addMensaje}) => {
    const { logged, cambiarLogged } = useLogin()
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

            //const crearUsuario = await loggear(datos.email, datos.password).catch((error) => console.log(error));
            if (usuarioNuevo.error) {
                let auxErrores = { ...errores }
                auxErrores['mensajeError'] = usuarioNuevo.message;
                setError(auxErrores)
            } else {
                const login = await loggear(datos.email, datos.password).catch((error) => console.log(error));
                if (login.error) {
                    let auxErrores = { ...errores }
                    auxErrores['mensajeError'] = login.message;
                    setError(auxErrores)
                } else {
                    addMensaje(`Bienvenido ${usuarioNuevo.name}`, 'Tu cuenta se ha creado con éxito', '/')
                    cambiarLogged(login.usuario)
                    guardarToken(login.token)
                    navigate('/')
                }
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
            <Link className='enlace' to="/login">
                <p className={styles.enlace}>LOGIN</p>
            </Link>
            <span className='errorSpan'>{errores.mensajeError}</span>
        </div>
    )
}

export default Crearcuentausuario;