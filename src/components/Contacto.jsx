import { useState } from 'react';
import styles from '../styles/form.module.css';
import { validEmail, validPassword, validText, validPasswordRepeat, validUser } from '../lib/valid';
import { textErrors } from '../lib/textErrors';
import { modificarusuario, sendEmail, tokenUser } from '../lib/data';
import { useLogin } from '../hooks/useLogin';
import { guardarToken, obtenerToken } from '../lib/serviceToken';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

export const Contacto = () => {
    const { logged, cambiarLogged, logout } = useLogin()
    const [noEditar, setEditar] = useState(true)
    const [datos, setDatos] = useState({
        to:'mesamagicatienda@gmail.com',
        from:null,
        name:null,
        subject:null,
        message:null
    })
    const [errores, setError] = useState({
        to:null,
        from:null,
        name:null,
        subject:null,
        message:null
    })

    const navigate = useNavigate()
    useEffect(() => {
        if (logged.estaLogueado) {
            const auxDatos = {
                to:'mesamagicatienda@gmail.com',
                from: logged.user.email,
                name: logged.user.name,
                subject:null,
                message:null
            }
            setDatos(auxDatos)
        }
    }, [])


    


    const handleChange = (e) => {
        let auxErrores = { ...errores }
        let auxDatos = { ...datos }
        auxErrores['mensajeError'] = null
        let valido = false;
        if (e.target.name == 'from') valido = validEmail(e.target.value)
        if (e.target.name == 'name') valido = validText(e.target.value, 1, 50, false)
        if (e.target.name == 'subject') valido = validText(e.target.value, 10, 100, true)
        if (e.target.name == 'message') valido = validText(e.target.value, 10, 500, true)

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
        let valido = true;
        let auxErrores = { ...errores }
        for (const key in datos) {
            if (datos[key] == null) {
                auxErrores[key] = textErrors('vacio')
                setError(auxErrores)
                valido = false;
            }
        }
        console.log(valido)
        if (valido) {
        const data = {
            to:datos.to,
            from:datos.from,
            name:datos.name,
            subject:datos.subject,
            message:datos.message
        }
        const contacto=await sendEmail(data)
        console.log(contacto)
        }
        
    }


    return (
        <div className={styles.cajaForm}>
            <h2>CONTACTO</h2>
            <div className={styles.cajaInputs}>
                <label for='name'>Nombre Completo</label>
                <input type="text" id='name' name='name'  onChange={(e) => handleChange(e)} value={datos.name} />
                <span className='errorSpan'>{errores.name}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='from'>Email</label>
                <input type="email" id='from' name='from' onChange={(e) => handleChange(e)} value={datos.from} />
                <span className='errorSpan'>{errores.from}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='subject'>Asunto</label>
                <input type="text" id='subject' name='subject' onChange={(e) => handleChange(e)} value={datos.subject} />
                <span className='errorSpan'>{errores.subject}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='message'>Motivo</label>
                <textarea  name='message' onChange={(e) => handleChange(e)} value={datos.message} />
                <span className='errorSpan'>{errores.message}</span>
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