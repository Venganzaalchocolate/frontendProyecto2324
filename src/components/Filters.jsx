import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/filters.module.css';
import { gamesCategory } from '../lib/data';

const Filters=({pasarFiltros, cambiarLimit})=>{
    const [inputsCheket, setInputsChecked]=useState({})
    const [categorias, setCategorias]=useState(null)
    const [precio, setPrecio]=useState([0,0])

    const handleChangeFilter=(e)=>{
        const category=e.target.value;
        let inputsAux={...inputsCheket };
        inputsAux[category]=!inputsAux[category]
        setInputsChecked(inputsAux)
    }

    const handleChangePrice=(e)=>{
        const tipo=e.target.name
        const valor=e.target.value;
        if(!isNaN(valor) && parseFloat(valor)>=0){
            let priceAux = [...precio];
            (tipo=="rangoMin") 
                ? priceAux=[parseFloat(valor),(parseFloat(valor)>priceAux[1])?parseFloat(valor):priceAux[1]]
                :(parseFloat(valor)<priceAux[0])?priceAux=[0,parseFloat(valor)]:priceAux[1]=parseFloat(valor)
            setPrecio(priceAux)
        }
    }


    const addFilter=()=>{
        const arrayFiltros=[]
        const paresClaveValor = Object.entries(inputsCheket);
        paresClaveValor.map(([clave, valor])=>{
            if(valor)arrayFiltros.push(clave)
        })
        const filtroAux={
            categorias:arrayFiltros,
            precioMinimo:precio[0],
            precioMaximo:precio[1]
        }
        cambiarLimit([0,10])
        pasarFiltros(filtroAux)
    }

    

    useEffect(()=>{
        const cargarDatos = async () => {
          const respuesta = await gamesCategory()
          setCategorias(respuesta); // Actualiza el estado con los datos recibidos
          const listaInputs={}
          respuesta.map((x)=>{
            listaInputs[x]=false
          })
          setInputsChecked(listaInputs)
        };
        
        cargarDatos();
      }, []);

    return(
        <div className={styles.cajafilters}>
            <h2 className={styles.h2}>Filtrar</h2>
            <h3 className={styles.h3}>Categorias</h3>
            {categorias!=null ? categorias.map((x)=>{
                return (
                    <div className={styles.cajaCategorias}>
                    <input className={styles.input}  name={x} id={x} type='checkbox' value={x} onChange={(e)=>handleChangeFilter(e)}/>
                    <label className={styles.label} for={x}>{x}</label>
                    </div>
            )
            }) : null}
            <h3 className={styles.h3}>Precios</h3>
            <div className={styles.cajaprecios}>
                <div>
                    <label className={styles.label} for="rangoMin">Mínimo: </label>
                    <input className={styles.input} type="text" id="rangoMin" name="rangoMin" onChange={(e)=>handleChangePrice(e)} value={precio[0]}/>
                </div>
                <div>
                    <label className={styles.label} for="rangoMax">Máximo: </label>
                    <input className={styles.input}  type="text" id="rangoMax" name="rangoMax" onChange={(e)=>handleChangePrice(e)} value={precio[1]}/>
                </div>
                
            </div>
           
            <button onClick={()=>addFilter()}>Filtrar</button>
        </div>
    )
}

export default Filters;