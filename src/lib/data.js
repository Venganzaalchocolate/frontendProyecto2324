
export const allgames=async()=>{
    const url=`${import.meta.env.VITE_API}/games`
    const respuesta = await fetch(url).catch((error)=>`Error al realizar el fectha de la funcion allgames: ${error}`);
    const datos = await respuesta.json().catch((error)=>`Error al realizar el .json() de la respuesta en la funcion allgames: ${error}`);
    return datos.data
}

export const gamesCategory= async()=>{
    const url=`${import.meta.env.VITE_API}/gamescategory`
    const respuesta = await fetch(url).catch((error)=>`Error al realizar el fectha de la funcion gamesCategory: ${error}`);
    const datos = await respuesta.json().catch((error)=>`Error al realizar el .json() de la respuesta en la funcion gamesCagetory: ${error}`);
    return datos.data
}

export const gamesWithFilter=async (datos, limite)=>{
    let dates={...datos};
    dates["minimo"]=limite[0];
    dates["maximo"]=limite[1]
    const url = `${import.meta.env.VITE_API}/gamesfilter/`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dates)
    });
    const data = await response.json();
    return data.data
  }

  export const gamesCantidad=async (datos)=>{
    const url = `${import.meta.env.VITE_API}/gamescountgames/`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    const data = await response.json();
    return data.data
  }

// export const loggear = async (email, pass) => {
//     const data = {
//         email,
//         pass,
//     };
//     const url=`${import.meta.env.VITE_API}/login`
//     const response = await axios.post(
//         url,
//         data,
//     ).catch((error)=>{
//         return error.response.data
//     });
    
//     return (!!response.error==true)?response:response.data.data

// }