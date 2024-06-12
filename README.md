# 🎲 Proyecto Frontend MesaMágica
## 📄 Descripción

Este proyecto es una aplicación de eCommerce para la venta de juegos de mesa, desarrollada con Vite y React. La aplicación se conecta con un backend desarrollado en Node.js y Express, utilizando un archivo .env.local para configurar la URL de la API.

## 📂 Estructura del Proyecto

La estructura del proyecto es la siguiente:

~~~
frontendProyecto2324_2/
│
├── node_modules/
├── public/
│   └── img/
│       └── react.svg
│
├── src/
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── user/
│   │   ├── card.jsx
│   │   ├── Carrito.jsx
│   │   ├── Contacto.jsx
│   │   ├── Creacuenta.jsx
│   │   ├── DetalleJuego.jsx
│   │   ├── Filters.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Inicio.jsx
│   │   ├── Listacards.jsx
│   │   ├── Login.jsx
│   │   ├── Mensajes.jsx
│   │   ├── MenuUser.jsx
│   │   ├── NotFound.jsx
│   │   ├── spinner.jsx
│   │   ├── states.jsx
│   │   └── TramitarPedido.jsx
│   │
│   ├── context/
│   │   ├── CartProvider.jsx
│   │   └── LoggedProvider.jsx
│   │
│   ├── hooks/
│   │   ├── useCart.jsx
│   │   └── useLogin.jsx
│   │
│   ├── lib/
│   │   ├── data.js
│   │   ├── serviceToken.js
│   │   ├── textErrors.js
│   │   ├── tokenDecoder.js
│   │   ├── utils.js
│   │   └── valid.js
│   │
│   └── styles/
│       ├── fonts/
│       ├── card.module.css
│       └── detallejuego.module.css
│
├── .gitignore
├── .env.local
└── README.md
~~~


## 🚀 Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

###  Clonar el repositorio:

~~~
git clone <URL_DEL_REPOSITORIO>
cd frontendProyecto2324_2
~~~

### Instalar las dependencias:
~~~
npm install
~~~

### Configurar las variables de entorno:
Crea un archivo .env.local en la raíz del proyecto y define la URL de la API del backend:

env.local

~~~
VITE_API=http://localhost:10000
~~~


### Ejecutar la aplicación:

~~~
npm run dev
~~~

## 🌟 Componentes Principales
### 📦 Components

* admin/ 
Componentes relacionados con la administración del sitio.
* user/
Componentes relacionados con los usuarios.
* card.jsx
Componente para mostrar una tarjeta de juego.
* Carrito.jsx
Componente para el carrito de compras.
* Contacto.jsx
Componente para la página de contacto.
* Creacuenta.jsx
Componente para la creación de cuentas de usuario.
* DetalleJuego.jsx
Componente para mostrar los detalles de un juego.
* Filters.jsx
Componente para filtrar los juegos.
* Footer.jsx
Componente para el pie de página.
* Header.jsx
Componente para el encabezado.
* Inicio.jsx
Componente para la página de inicio.
* Listacards.jsx
Componente para listar las tarjetas de juegos.
* Login.jsx
Componente para el inicio de sesión.
* Mensajes.jsx
Componente para mostrar mensajes.
* MenuUser.jsx
Componente para el menú de usuario.
* NotFound.jsx
Componente para la página de no encontrado.
* spinner.jsx
Componente de carga.
* states.jsx
Componente para manejar los estados de la aplicación.
* TramitarPedido.jsx
Componente para tramitar los pedidos.

### 📚 Context

* CartProvider.jsx
Proveedor de contexto para el carrito de compras.
* LoggedProvider.jsx
Proveedor de contexto para el estado de autenticación del usuario.

### 🪝 Hooks
* useCart.jsx
Hook personalizado para manejar la lógica del carrito.
* useLogin.jsx
Hook personalizado para manejar la lógica de inicio de sesión.

### 📦 Lib
* data.js
Módulo de datos.
* serviceToken.js
Módulo para manejar tokens.
* textErrors.js
Módulo para manejar errores de texto.
* tokenDecoder.js
Módulo para decodificar tokens.
* utils.js
Módulo de utilidades.
* valid.js
Módulo para validaciones.

### 🎨 Styles

* fonts/
Carpeta para las fuentes.
* card.module.css
Estilos para el componente de tarjeta.
* detallejuego.module.css
Estilos para el componente de detalle de juego.
* filters.module.css
Estilos para el componente de filtros.
* footer.module.css
Estilos para el pie de página.
* form.module.css
Estilos para los formularios.
* header.module.css
Estilos para el encabezado.
* historialPedidos.module.css
Estilos para el historial de pedidos.
* inicio.module.css
Estilos para la página de inicio.
* mensaje.module.css
Estilos para los mensajes.
* panelControl.module.css
Estilos para el panel de control.
* pedido.module.css
Estilos para el componente de pedido.
* spinner.module.css
Estilos para el componente de carga.
* state.module.css
Estilos para los estados de la aplicación.


### 🐳 Uso de Docker

Para construir y ejecutar la imagen Docker de la aplicación, usa los siguientes comandos:

Construir la imagen:

~~~
docker build -t nombre-imagen .
~~~

### Ejecutar el contenedor:

~~~
docker run -d -p <PUERTO_LOCAL>:<PUERTO_CONTENEDOR> --env-file .env nombre-imagen
~~~

#### ☁️ Despliegue en Render.com

Para desplegar la aplicación en Render.com, sigue estos pasos:
* Crear un nuevo servicio en Render:
Ve a la consola de Render.com y crea un nuevo servicio web, seleccionando tu repositorio.
* Configurar el Dockerfile:
Asegúrate de que Render detecte y use tu Dockerfile para construir la aplicación.
* Definir las variables de entorno:
En la configuración del servicio en Render, define las variables de entorno como se indicó en el archivo .env.
* Desplegar:
Render se encargará de construir y desplegar la aplicación automáticamente.

### 📜 Creador
Este proyecto está ha sido creado por Elisabet D'Acosta Almirón