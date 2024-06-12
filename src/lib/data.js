
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

export const gameId=async(id)=>{
    const url=`${import.meta.env.VITE_API}/games/${id}`
    const response = await fetch(url);
    const data = await response.json();
    if(data.error) return data
    return data.data
}

export const gamesWithFilterLimit=async (datos, limite)=>{
    let dates={...datos};
    dates["minimo"]=limite[0];
    dates["maximo"]=limite[1]
    const url = `https://backendproyecto2324.onrender.com/api/gamesfilterlimit/`;
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


export const gamesWithFilter=async (nombre)=>{
    const dates={
        name:nombre
    };

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

export const gamesAdd=async(token, datos)=>{
    const datosAux = {
        name: datos.name,
        category: datos.category,
        author: datos.author,
        publisher: datos.publisher,
        numberOfPlayers: datos.numberOfPlayers,
        recommendedAge: datos.recommendedAge,
        duration: datos.duration,
        description: datos.description,
        image: 'dulcecaos',
        price: datos.price,
        stock: datos.stock
    };
    const url=`${import.meta.env.VITE_API}/creargames`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosAux)
    });
    //if(response.status!=200) return {error:true,message:response.body.message}
    const data = await response.json();
    if(data.error){
        return {error:true, message: data.message}
    }
    else return data.data
}

export const gamesPut=async(token, datos)=>{
    
    const datosAux = {
        id:datos.juego,
        name: datos.name,
        category: datos.category,
        author: datos.author,
        publisher: datos.publisher,
        numberOfPlayers: datos.numberOfPlayers,
        recommendedAge: datos.recommendedAge,
        duration: datos.duration,
        description: datos.description,
        image: 'dulcecaos',
        price: datos.price,
        stock: datos.stock
    };

    const url=`${import.meta.env.VITE_API}/actualizargames`
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosAux)
    });
    //if(response.status!=200) return {error:true,message:response.body.message}
    const data = await response.json();
    if(data.error){
        return {error:true, message: data.message}
    }
    else return data.data
}



export const gamesDelete=async(token, id)=>{
    const datosAux = {
        id:id,
    };
    const url=`${import.meta.env.VITE_API}/borrargames`
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosAux)
    });
    //if(response.status!=200) return {error:true,message:response.body.message}
    const data = await response.json();
    if(data.error){
        return {error:true, message: data.message}
    }
    else return data.data
}

export const loggear = async (email, password) => {
    const datos = {
        email,
        password,
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

export const userWithId=async(id, token)=>{
    const url=`${import.meta.env.VITE_API}/user/${id}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    if(response.status!=200) return data;
    else return data.data
}

export const borrarUsuario=async(id, token)=>{
    const url=`${import.meta.env.VITE_API}/borrarusuario/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    if(response.status!=200) return data;
    else return data.data
}

export const userWithFilter=async(filter, token)=>{
    const dates={
        name:filter
    };
    const url=`${import.meta.env.VITE_API}/usersfilter`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dates)
    });
    const data = await response.json();
    if(response.status!=200) return data;
    else return data.data
}


export const crearusuario = async (nombre, email, password, direccion) => {
    const datos = {
        nombre,
        email,
        password,
        direccion
    };
    const url=`${import.meta.env.VITE_API}/crearusuario`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    //if(response.status!=200) return {error:true,message:response.body.message}
    const data = await response.json();
    if(data.error){
        if(data.message.includes("E11000 duplicate key error collection: test.users index: email_1")) return {error:true, message:"Este email ya existe, porfavor inicia sesión"}
        return {error:true, message: data.message}
    }
    else return data.data
}

export const modificarusuario = async (id,nombre, email, password, direccion, token, role='normal') => {
    const datos = {
        id,
        nombre,
        email,
        password,
        direccion,
        role
    };
    const url=`${import.meta.env.VITE_API}/actualizarusuario`
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    });
    //if(response.status!=200) return {error:true,message:response.body.message}
    const data = await response.json();
    if(data.error){
        if(data.message.includes("E11000 duplicate key error collection: test.users index: email_1")) return {error:true, message:"Este email ya existe, porfavor inicia sesión"}
        return {error:true, message: data.message}
    }
    else return data.data
}

export const tokenUser = async (token) => {
    const datos = {
        token,
    };
    const url=`${import.meta.env.VITE_API}/validtoken`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    });
    if(response.status==401) return {error:true,message:'Token no valido'}
    const data = await response.json();
    if(data.error) return data
    return data.data
}

export const historyOrders = async (token, id) => {
    const datos = {
        id,
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
    const data = await response.json();
    if(data.error) return data
    return data.data
}

export const modificarPedido=async(pedido, token)=>{
    const datos = {
        idPedido:pedido,
    };
    const url=`${import.meta.env.VITE_API}/modificarpedido`
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(datos)
    });
    const data = await response.json();
    if(data.error) return data
    return data.data
}


export const crearPedido= async (id, listaJuegos, address,token, precioTotal ) => {
    
    let arrayListaJuegos=[]
    listaJuegos.map((x)=>{
        let aux={
            gameId:x._id,
            nameGame:x.name,
            quantity:x.quantity,
            price:x.price
        }
        arrayListaJuegos.push(aux)
    })
    const datos = {
        userId: id,
        listaJuegos: arrayListaJuegos,
        address: address,
        totalPrice: precioTotal,
    };
    const url=`${import.meta.env.VITE_API}/crearorder`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify(datos)
    });
    //if(response.status!=200) return {error:true,message:response.body.message}
    const data = await response.json();
    if(data.error){
        return {error:true, message: data.message}
    }
    else return data.data
}


export const sendEmail=async (data)=>{
    console.log('pasa')
    const datos = {
        to:data.to,
        from:data.from,
        name:data.name,
        subject:data.subject,
        message:data.message

    };
    const url=`${import.meta.env.VITE_API}/contacto`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(datos)
    });
    const resp = await response.json();
    if(resp.error) return resp
    return resp.data
}