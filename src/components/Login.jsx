
import { useState } from 'react';
import styles from '../styles/form.module.css';
import { validEmail, validPassword } from '../lib/valid';
import { textErrors } from '../lib/textErrors';
import { loggear } from '../lib/data';
import { useLogin } from '../hooks/useLogin';
import { guardarToken } from '../lib/serviceToken';
import { useNavigate, Link } from 'react-router-dom';



const Login=()=>{
    const { logged, cambiarLogged } = useLogin()
    const [datos,setDatos]=useState({
        email: null,
        password: null,
    })
    const [errores, setError] = useState({
        email: null,
        password: null,
    })

    const navigate=useNavigate();

    const handleChange = (e) => {
        let auxErrores = { ...errores }
        let auxDatos= {...datos}
        auxErrores['mensajeError'] = null
        let valido = false;

        if (e.target.name == 'email') valido = validEmail(e.target.value)
        if (e.target.name == 'password')valido = validPassword(e.target.value)

        auxDatos[e.target.name]=e.target.value
        setDatos(auxDatos)
        if (!valido) {
            auxErrores[e.target.name] = textErrors(e.target.name)
        } else {
            auxErrores[e.target.name] = null
        }
        setError(auxErrores)
    }

    const loguear = async () => {
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
            const login = await loggear(datos.email, datos.password).catch((error) => console.log(error));
            if (login.error) {
                let auxErrores = { ...errores }
                auxErrores['mensajeError'] = login.message;
                setError(auxErrores)
            } else {
                cambiarLogged(login.usuario)
                guardarToken(login.token)
                navigate('/')
            }
        }
    }
    return (
        <div className={styles.cajaForm}>
            <h2>LOGIN</h2>
            <div className={styles.cajaInputs}>
                <label for='email'>Email</label>
                <input type="email" id='email' name='email' onChange={(e)=>handleChange(e)} value={datos.email}/>
                <span className='errorSpan'>{errores.email}</span>
            </div>
            <div className={styles.cajaInputs}>
            <label for='pass'>Contraseña</label>
                <input type="password" id='password' name='password' onChange={(e)=>handleChange(e)} value={datos.password}/>
                <span className='errorSpan'>{errores.password}</span>
            </div>
            <p className='fuenteCourier enlace'>¿Has olvidado tu contraseña?</p>
            <button onClick={()=>loguear()}>Entrar</button>
            <Link className='enlace' to="/crearcuenta">
                <p className={styles.enlace}>CREAR CUENTA</p>
            </Link>
            <span className='errorSpan'>{errores.mensajeError}</span>
        </div>    
    )
}

export default Login;