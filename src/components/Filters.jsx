import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/filters.module.css';
import { gamesCategory } from '../lib/data';
import { IoClose } from "react-icons/io5";

const Filters=({pasarFiltros, cambiarLimit, filtros})=>{
    const [inputsCheket, setInputsChecked]=useState({})
    const [categorias, setCategorias]=useState(null)
    const [precio, setPrecio]=useState([filtros.precioMinimo,filtros.precioMaximo])
    const [visible, setVisible]=useState(false)



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
                ? priceAux=[parseFloat(valor),priceAux[1]]
                : priceAux=[priceAux[0], parseFloat(valor)]
            setPrecio(priceAux)
        } else {
            let priceAux = [...precio];
            (tipo=="rangoMin") 
                ? priceAux=[0,priceAux[1]]
                : priceAux=[priceAux[0], 0]
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
            precioMinimo:(precio[0]==undefined)?0:precio[0],
            precioMaximo:(precio[1]==undefined)?999999999:precio[1]
        }
        cambiarLimit([0,10])
        pasarFiltros(filtroAux)
    }

    const filtrosVisibles=()=>{
        setVisible(!visible)
    }

    const quitarFiltros=()=>{
        setInputsChecked({})
        setPrecio([0,0])
        pasarFiltros({})
    }
    

    useEffect(()=>{
        const cargarDatos = async () => {
          const respuesta = await gamesCategory()
          setCategorias(respuesta); // Actualiza el estado con los datos recibidos
          const listaInputs={}
          respuesta.map((x)=>{
            listaInputs[x]=false
          })
          if(Object.keys(filtros).length>0){
            if(Object.keys(filtros).includes('categorias')){
                filtros.categorias.map((x)=>{
                    listaInputs[x]=true
                })
            }
          }
          setInputsChecked(listaInputs)
        };
        cargarDatos();
      }, []);
      
    return(
        <>

        {!!visible && <div className={styles.cajafilters}>
            <div className={styles.contenedorX}><IoClose onClick={()=>filtrosVisibles()}/></div>
            <h2 className={styles.h2}>Filtrar</h2>
            <h3 className={styles.h3}>Categorias</h3>
            {categorias!=null ? categorias.map((x,i,a)=>{
                return (
                    <div className={styles.cajaCategorias} key={`${x}${i}`}>
                        {inputsCheket[x]==true 
                        ? <input className={styles.input} checked name={x} id={x} type='checkbox' value={x} onChange={(e)=>handleChangeFilter(e)}/>
                        : <input className={styles.input}  name={x} id={x} type='checkbox' value={x} onChange={(e)=>handleChangeFilter(e)}/>
                    } 
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
            <button onClick={()=>quitarFiltros()}>Quitar Filtros</button>
        </div>}
        {!visible && <button id={styles.botonFiltroMobile} onClick={()=>filtrosVisibles()}>FILTRAR</button>}
        
        </>
        
    )
}

export default Filters;