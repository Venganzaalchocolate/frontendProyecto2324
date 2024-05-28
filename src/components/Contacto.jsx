import { useState } from 'react';
import styles from '../styles/form.module.css';
import { validEmail, validPassword, validText, validPasswordRepeat, validUser } from '../lib/valid';
import { textErrors } from '../lib/textErrors';
import { modificarusuario, tokenUser } from '../lib/data';
import { useLogin } from '../hooks/useLogin';
import { guardarToken, obtenerToken } from '../lib/serviceToken';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

export const Contacto = () => {
    const { logged, cambiarLogged, logout } = useLogin()
    const [noEditar, setEditar] = useState(true)
    const [datos, setDatos] = useState({
        email: null,
        nombre: null,
        contenido:null
    })
    const [errores, setError] = useState({
        email: null,
        nombre: null,
        contenido:null
    })

    const navigate = useNavigate()
    useEffect(() => {
        if (logged.estaLogueado) {
            const auxDatos = {
                email: logged.user.email,
                nombre: logged.user.name,
                contenido: ''
            }
            setDatos(auxDatos)
        }
    }, [])


    


    const handleChange = (e) => {
        let auxErrores = { ...errores }
        let auxDatos = { ...datos }
        auxErrores['mensajeError'] = null
        let valido = false;

        if (e.target.name == 'email') valido = validEmail(e.target.value)
        if (e.target.name == 'nombre') valido = validText(e.target.value, 1, 50, false)
        if (e.target.name == 'contenido') valido = validText(e.target.value, 10, 500, true)

        auxDatos[e.target.name] = e.target.value
        setDatos(auxDatos)
        if (!valido) {
            auxErrores[e.target.name] = textErrors(e.target.name)
        } else {
            auxErrores[e.target.name] = null
        }
        setError(auxErrores)
    }


    const enviar = async () => {
        
        
    }


    return (
        <div className={styles.cajaForm}>
            <h2>CONTACTO</h2>
            <div className={styles.cajaInputs}>
                <label for='nombre'>Nombre Completo</label>
                <input type="nombre" id='nombre' name='nombre'  onChange={(e) => handleChange(e)} value={datos.nombre} />
                <span className='errorSpan'>{errores.nombre}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='email'>Email</label>
                <input type="email" id='email' name='email' onChange={(e) => handleChange(e)} value={datos.email} />
                <span className='errorSpan'>{errores.email}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='contenido'>Motivo</label>
                <textarea  name='contenido' onChange={(e) => handleChange(e)} value={datos.contenido} />
                <span className='errorSpan'>{errores.contenido}</span>
            </div>

            <button onClick={()=>enviar()}>Enviar</button>
            <Link className='enlace' to="/">
                <p className={styles.enlace}>VOLVER</p>
            </Link>
            <span className='errorSpan'>{errores.mensajeError}</span>
        </div>
    )
}

export default Contacto;