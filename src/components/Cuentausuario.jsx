import { useState } from 'react';
import styles from '../styles/form.module.css';
import { validEmail, validPassword, validText, validPasswordRepeat, validToken } from '../lib/valid';
import { textErrors } from '../lib/textErrors';
import { modificarusuario } from '../lib/data';
import { useLogin } from '../hooks/useLogin';
import { guardarToken, obtenerToken } from '../lib/serviceToken';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect} from 'react';

export const Cuentausuario=()=>{
    const { logged, cambiarLogged, logout } = useLogin()
    const [noEditar, setEditar]=useState(true)
    const [datos,setDatos]=useState({
        email: null,
        password: '',
        nombre: null,
        direccion: null,
        passwordR: ''
    })

    const navigate = useNavigate()
    useEffect(()=>{
        if(logged.estaLogueado){
            const auxDatos={
                email: logged.user.email,
                password: '',
                nombre: logged.user.name,
                direccion: logged.user.direction,
                passwordR: ''
            }
            setDatos(auxDatos)
        }
    }, [])

    
    useEffect(() => {
      if (!logged.estaLogueado) navigate('/')
    }, [logged]);

    const [errores, setError] = useState({
        email: null,
        password: null,
        nombre: null,
        direccion: null,
        passwordR: null
    })


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

    const editar=()=>{
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
        if(datos['password']!='' && datos['passwordR']=='') {
            auxErrores['passwordR'] = textErrors('vacio');
            valido = false;
        }
        setError(auxErrores)
        if (valido) {
            const token= obtenerToken();
            const passwordNueva=(datos.password!='')?datos.password:null
            const usuarioModificado=await modificarusuario(logged.user._id, datos.nombre, datos.email,passwordNueva, datos.direccion, token)
            console.log('valid token')
            console.log(!validToken(usuarioModificado))
            if (!validToken(usuarioModificado)){
                logout();
                navigate('/login');
            } else{
                cambiarLogged(usuarioModificado)
                editar()
            }
            
        }
    }

    
    return (
        <div className={styles.cajaForm}>
            <h2>CREAR CUENTA</h2>
            <div className={styles.cajaInputs}>
                <label for='nombre'>Nombre Completo</label>
                <input type="nombre" id='nombre' name='nombre' disabled={noEditar} onChange={(e) => handleChange(e)} value={datos.nombre} />
                <span className='errorSpan'>{errores.nombre}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='email'>Email</label>
                <input type="email" id='email' name='email' disabled={noEditar}  onChange={(e) => handleChange(e)} value={datos.email} />
                <span className='errorSpan'>{errores.email}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='direccion'>Dirección</label>
                <input type="direccion" id='direccion' disabled={noEditar}  name='direccion' onChange={(e) => handleChange(e)} value={datos.direccion} />
                <span className='errorSpan'>{errores.direccion}</span>
            </div>
            {!noEditar && <>
                <div className={styles.cajaInputs}>
                <label for='password'>Contraseña</label>
                <input type="password" id='password' disabled={noEditar} name='password' onChange={(e) => handleChange(e)} value={datos.password} />
                <span className='errorSpan'>{errores.password}</span>
            </div>
            <div className={styles.cajaInputs}>
                <label for='passwordR'>Repita la Contraseña</label>
                <input type="password" id='passwordR'disabled={noEditar}  name='passwordR' onChange={(e) => handleChange(e)} value={datos.passwordR} />
                <span className='errorSpan'>{errores.passwordR}</span>
            </div>
            <button onClick={() => guardarCambios()}>GUARDAR</button>
            </>}

            <button onClick={() => editar()}>{(noEditar)?'EDITAR':'CANCELAR'}</button>
            <Link className='enlace' to="/login">
                <p className={styles.enlace}>LOGIN</p>
            </Link>
            <span className='errorSpan'>{errores.mensajeError}</span>
        </div>
    )
}

export default Cuentausuario;