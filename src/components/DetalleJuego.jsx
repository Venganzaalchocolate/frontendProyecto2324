import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/detallejuego.module.css';
import { useCart } from '../hooks/useCart';
import { useNavigate, useParams } from 'react-router-dom';
import { gameId } from '../lib/data';

const DetalleJuego=({juego})=>{
    const [game, setGame]=useState(null)
    const { id } = useParams();
    const {addCart, products, reduceProduct} = useCart()
    const [productSelect, setProductSelect] = useState(null)

    const navigate=useNavigate();
    useEffect(()=>{
        const cargarDatos = async () => {
          const respuesta = await gameId(id)
          if(respuesta.error) navigate('/notfound')
          else setGame(respuesta); // Actualiza el estado con los datos recibidos

          products.filter((x)=>{
            if(x._id==id) setProductSelect(x)
          })
        };
        cargarDatos();
      }, [products]);

    const quitarProducto=()=>{
        reduceProduct(game)
        if(productSelect!=null && productSelect.quantity==1) setProductSelect(null)
    }
    return (
        <>
        {game!=null 
        ? <div className={styles.contenedorDetalleJuego}>
            <picture>
                    <source srcSet={`/img/desktop/${game.image}.jpg`} media="(min-width: 1200px)" />
                    <source srcSet={`/img/tablet/${game.image}.jpg`} media="(min-width: 800px)" />
                    <img src={`/img/phone/${game.image}.jpg`} alt={`${game.name}`}/>
            </picture>
            <div>
            <div className={styles.contenedorCaracteristicas}>
                <div className={styles.caracteristica}>
                 <p>Jugadores</p>   
                 <p>{game.numberOfPlayers}</p>
                </div>
                <div className={styles.caracteristica}>
                 <p>Edad</p>   
                 <p>{game.recommendedAge}</p>
                </div>
                <div className={styles.caracteristica}>
                 <p>Categoria</p>   
                 <p>{game.category}</p>
                </div>
                <div className={styles.caracteristica}>
                 <p>Duración</p>   
                 <p>{game.duration}</p>
                </div>
            </div>
            <div className={styles.contenedorInfoPrincipal}>
                <h2>{game.name}</h2>
                <p>{game.description}</p>
            </div>
            <div className={styles.contenedorEditorial}>
                <p>Editorial</p>
                <p>{game.publisher}</p>
            </div>
            <div className={styles.botones}>
                <div>
                    <button onClick={()=>addCart(game)}>+</button>
                    <p>{(productSelect!=null)?productSelect.quantity:0}</p>
                    <button onClick={()=>quitarProducto()}>-</button>
                </div>
                <button onClick={()=>addCart(game)}>
                    {(productSelect!=null)?(game.price*productSelect.quantity).toFixed(2):game.price} €
                </button>
            </div>
            </div>
            
            
        </div>
        : <p>Problemas al cargar el juego</p>}
        </>
        
    )
}

export default DetalleJuego