
import { useState } from 'react';
import styles from '../styles/form.module.css';
import { validEmail, validPassword } from '../lib/valid';
import { textErrors } from '../lib/textErrors';
import { loggear } from '../lib/data';

const Login=()=>{
    const [email, setEmail]=useState(null)
    const [pass,setPass]=useState(null)
    const [errores,setError]=useState({
        email:null,
        password:null
    })

    const handleChange=(e)=>{
        if(e.target.name=='email') 
        {
            let auxErrores={...errores}
            if(!validEmail(e.target.value)){            
                auxErrores['email']=textErrors('email')
                setError(auxErrores)
            } else {
                auxErrores['email']=null
                setError(auxErrores)
            }
            setEmail(e.target.value)
        }
        if(e.target.name=='pass') 
            {
                let auxErrores={...errores}
                if(!validPassword(e.target.value)){            
                    auxErrores['password']=textErrors('password')
                    setError(auxErrores)
                } else {
                    auxErrores['password']=null
                    setError(auxErrores)
                }
                setPass(e.target.value)
            }
    }

    const loguear=async ()=>{
        if(errores.email==null && errores.password==null){
            const login= await loggear(email,pass);
            console.log(login)
        }
    }
    return (
        <div className={styles.cajaForm}>
            <h2>LOGIN</h2>
            <div className={styles.cajaInputs}>
                <label for='email'>Email</label>
                <input type="email" id='email' name='email' onChange={(e)=>handleChange(e)} value={email}/>
                <span className='errorSpan'>{errores.email}</span>
            </div>
            <div className={styles.cajaInputs}>
            <label for='pass'>Contraseña</label>
                <input type="password" id='pass' name='pass' onChange={(e)=>handleChange(e)} value={pass}/>
                <span className='errorSpan'>{errores.password}</span>
            </div>
            <p className='fuenteCourier enlace'>¿Has olvidado tu contraseña?</p>
            <button onClick={()=>loguear()}>Entrar</button>
            <p className='enlace'>CREAR CUENTA</p>
        </div>    
    )
}

export default Login;