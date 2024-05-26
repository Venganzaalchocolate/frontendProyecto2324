import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/detallejuego.module.css';
import { useCart } from '../hooks/useCart';
import { useNavigate, useParams } from 'react-router-dom';
import { gameId } from '../lib/data';

const DetalleJuego=({juego})=>{
    const [game, setGame]=useState(null)
    const { id } = useParams();
    const {addCart} = useCart()

    const navigate=useNavigate();
    useEffect(()=>{
        const cargarDatos = async () => {
          const respuesta = await gameId(id)
          if(respuesta.error) navigate('/notfound')
          else setGame(respuesta); // Actualiza el estado con los datos recibidos
        };
        cargarDatos();
      }, []);

    console.log(game)
    return (
        <>
        {game!=null 
        ? <div className={styles.contenedorDetalleJuego}>
            <picture className={styles.imagen}>
                <source srcSet="https://uce56eff5ed5ffabf97294936135.previews.dropboxusercontent.com/p/thumb/ACTE2ykofDwugSiCckNJoWfZi78j3fEnLPQvdKYSfkPcDcwpH2-w67u-MtuvRZfkxXfxiLKl84X8kzgr23UXgCm71oZOmjUGsJzG0aCG4REic-fv0w5zkL733eh5pHd61Is9L_THx39kpxf-m0lgKCEV5RN7ENjEHkU6osvY9tzEAtA5GdVfPUj81J9B5S5PMpLMmU2YhQbXv-_JSmk6dGRCW3uWoDeakcJ6JnDUr6f67uHJnfurPAowMN1rnS5bSCcy_LmCVsp_jQzST5VLEqe9QBhM3O_jibG4J0mXVBXvKgOtPDP5cyGch3vRjyBTj7jCO8WPsta_3s-dhwU8IxFirOQ-fNv5ZbzYsqgPdKQ5FgPKCNyuScJAmsd-Iq5uBr4/p.jpeg?is_prewarmed=true" media="(min-width: 1200px)" />
                <source srcSet="https://uc4058979d5e8eacd75e0ab9f201.previews.dropboxusercontent.com/p/thumb/ACQ7_DbvC6ERTXshD0r46heZOLeunek0DfhmjcvSqN65Q1NbjOuydPbD6TlwmkpNA-eNMVqIVDGL5kVoUmpHci3X5hZDwjAEhCDW-1tenxNG2pkhMMlAOWTV8JXBbAh7I90M-MH1xiuxfcSWjK-oi2GU9XBfMmyF_1Wz3Hv7KMNjI9GwsX8JQQl20VBtVTc9iil2EixBmwh58-eGlkcyCqZXtllXm4EfDo-YEZeUYmT66vHAv_j4d0Ru-i9jOOUJxw3hj71Fd5imt06dAgGf8icD-H3tuduWUO4jSUwA55-IC2ZZJfZFtNUy6G_t9WyGVjG22kRAkp5WR7WtGkukQNcXb-wgJs9d7mFzUVcDAmwaqlHEF_1BLyocA2CdwvzzD_0/p.jpeg" media="(min-width: 800px)" />
                <img src="https://ucefe277b5be9afd4815e0c9c42c.previews.dropboxusercontent.com/p/thumb/ACRotkNUAT1lsG0q11Hvl6oXGPBuWsldMjpmbkVq8QjgHvy8t62nwe_rH2cvMOBBIJ2aLH1LrcUo7kFDFEkGDvaSqT_nmSB3UthnrH7iFD0fAQ1PquJsc3D1U1V5vHMU7h_SNb1_JBfdSQc9Neq3dczw3cW3dQOvDRWuHeKSn5H0O5SIbysYOxRcYvH5Hikq_Bhk0cWtAu9oEyMu7Qsd5l8onRrzEqe4-j4vhKHy-aG3qNgWpV1UcRXv4Gdo5nkpLEE5U9SdFmti0UggSLnus63lQpmblE7MWu6RoIOjNMFgmZ9p-CsDAh98A3y5KN24OtIaq55Pz6J8jp1zjnWb9yB_E-eWkOsXCzDgaTF5c-5SNTSgS8YLxT8rHBUqnX_cp90/p.jpeg" alt={`${game.name}`}/>
            </picture>
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
            <div onClick={()=>addCart(game)}>
                    <p>{game.price} € </p>
                    <FaShoppingCart/>
            </div>
        </div>
        : <p>Problemas al cargar el juego</p>}
        </>
        
    )
}

export default DetalleJuego