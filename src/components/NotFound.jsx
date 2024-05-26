
import { Link } from 'react-router-dom';


const NotFound=()=>{
   

    return (
        <div id='notfound'>
            <img src='/img/404.svg' alt='notFound'></img>
            <Link to={'/'}>
                <button>Volver</button>
            </Link>
            
        </div>
        
    )
}

export default NotFound