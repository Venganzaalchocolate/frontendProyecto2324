import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/card.module.css';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

const Card=({juego})=>{
    const {addCart} = useCart()
    return (
        <Link to={`/juego/${juego._id}`}>
            <div className={styles.cajaCard} key={juego._id}>
                <picture>
                    <source srcSet="https://uce56eff5ed5ffabf97294936135.previews.dropboxusercontent.com/p/thumb/ACTE2ykofDwugSiCckNJoWfZi78j3fEnLPQvdKYSfkPcDcwpH2-w67u-MtuvRZfkxXfxiLKl84X8kzgr23UXgCm71oZOmjUGsJzG0aCG4REic-fv0w5zkL733eh5pHd61Is9L_THx39kpxf-m0lgKCEV5RN7ENjEHkU6osvY9tzEAtA5GdVfPUj81J9B5S5PMpLMmU2YhQbXv-_JSmk6dGRCW3uWoDeakcJ6JnDUr6f67uHJnfurPAowMN1rnS5bSCcy_LmCVsp_jQzST5VLEqe9QBhM3O_jibG4J0mXVBXvKgOtPDP5cyGch3vRjyBTj7jCO8WPsta_3s-dhwU8IxFirOQ-fNv5ZbzYsqgPdKQ5FgPKCNyuScJAmsd-Iq5uBr4/p.jpeg?is_prewarmed=true" media="(min-width: 1200px)" />
                    <source srcSet="https://previews.dropbox.com/p/thumb/ACTt6XhGhzOJNkM8HEvWMElGMxFBJEHm3pKzNHXOIbqq2TM5iXgKhmpFkLgC-U_XimO2v6M6WYqJ7ojOj4kGNX31zNTKgjnsbL4YgDShelRZbtWv0Lm0Wqj6vgwIS9IBEh9jNoTDCqFqZj-DwX_e9aUDjpctFftfNEPxvOc24Exgb9_kAwX5FcwNEURa0HPpbp9sI2SdNRDQ34rGhMVuBirDKGXMQGCySbledbo337R7h0ipFx9wGDPD_WVHrwxMzVcPXZkV3lsFvv-ukXuQRnrPeEsf60UluG60FmvKs19TM7h7p3e3ikfE1yxzwAl_3QrIg9AL--TRBLr0tYeSoV1f/p.jpeg" media="(min-width: 800px)" />
                    <img src="https://previews.dropbox.com/p/thumb/ACTBqykoS9mSw4kwkn0ZmbgWAzPmPdtZBSjhwSWGuH3JJMBDnlblyTulYM0X2QLoTsEWhx7_7Olzxh9q-s9gIW4gZSqi1fZMx50USQUMgH04_qBWsHOyiJMZiPL23mY0JctvKe120DbH3U3-6F8rTxFLt6IxChtRmzSkPedix5tOBazhZ7LWZk2QA-sjXoA1RJD9zKPdEF1BhIhPUN_ATLy93V_Q9cRf5K7vyH8kqUgcqND0q9vouJGxjPyLsQe80q_U4k1efV3q5CbINiIezJFk3lGylOz5_mJM1rT1PWEPbg44bzpG-4WkuRzwSDnUjzXhhoiNoGS04dYKt6Ss_w5J/p.jpeg" alt={`${juego.name}`}/>
                </picture>
                <div className={styles.cajaPropiedades}  >
                    <h2 className={styles.nombre}>{juego.name}</h2>
                    <div className={styles.cajaPrecio} onClick={()=>addCart(juego)}>
                        <p>{juego.price} € </p>
                        <FaShoppingCart/>
                    </div>
                </div>
            </div>
        
        </Link>
        
    )
}

export default Card