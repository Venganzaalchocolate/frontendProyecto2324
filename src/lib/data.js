
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

export const loggear = async (email, pass) => {
    const datos = {
        email,
        pass,
    };
    const url=`${import.meta.env.VITE_API}/login`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    if(response.status==403) return {error:true,message:'Usuario o contraseña incorrecta'}
    const data = await response.json();
    return data.data
}

export const tokenUser = async (token) => {
    const datos = {
        token,
    };
    const url=`${import.meta.env.VITE_API}/validtoken`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    if(response.status==403) return {error:true,message:'Token no valido'}
    const data = await response.json();
    return data.data
}

export const historyOrders = async (token, id) => {
    const datos = {
        id:id,
    };
    const url=`${import.meta.env.VITE_API}/orders`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(datos)
    });
    if(response.status==409) return {error:true,message:'Token no valido'}
    const data = await response.json();
    return data.data
}