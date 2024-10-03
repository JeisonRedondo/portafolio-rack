# Creando un Proyecto con React desde Cero

## Creando Cofiguración Básica

Para esta parte vamos a inicializar el proyecto con un comando rapido que colocara solo lo necesario,
esta descripción la podemos encontrar en el archivo package.json que se creara al ejecutar:

```bash
npm init -y
```

## Instalando libreria de react.

Bueno, react es el centro de la aplicación ya que esta nos permite generar reacciones entre los componentes de manera más eficientes que por defecto, además de ayudarnos a gestionar diferentes situaciones que se pueden desarrollar en nuestro proceso de creación de aplicaciones.

```bash
npm install react react-dom
```

## Configuración de Babel y Webpack

Empecemos por lo imoprtante, la mayoria de las veces cuando inicializamos un proyecto y vamos a mecha con el curso no tocamos fondo de algunos conceptos, quedamos en el limbo (o por lo menos así me paso a mi), entonces quedan cosas como "Bueno y esto pa' que sirve" - yo mirando el archivo de configuración de Babel...

Así que decidido a que no me vuelva a pasar pregunte cuando hice este proyecto a GPT "Oye tu pa' que sirve esto" y me dijo, obviamente. Babel es un **Traspilador** , este intrepreta el código que hemos escrito y que ya sea por que tiene partes que no en todos los navegadores son compatibles o por el hecho ya que trabajamos con jsx, el cual por defecto no entiende el navegador, babel lo procesa para que este pueda ser visualizable y ejecutable en todos (o la mayoria) de los navegadores.

Aquí la linea de comandos que usamos para implementar Babel en nuestro proyecto:

```bash
npm install --save-dev @babel/core @babel/preset-react @babel/preset-env babel-loader
```

#### Aquí está el desglose del comando:

- --save-dev: Instala los paquetes como dependencias de desarrollo. Estas dependencias solo son necesarias durante el desarrollo y no en el entorno de producción.
- @babel/core: Núcleo de Babel, necesario para la transformación del código.
- @babel/preset-react: Preajuste para transformar JSX en JavaScript.
- @babel/preset-env: Preajuste para convertir características modernas de JavaScript en una versión compatible con navegadores.
- babel-loader: Loader para Webpack que permite usar Babel para transformar archivos JavaScript.

Luego de aplicar este comando, crearemos un archivo donde generaremos la configuración que requiere Babel para su funcionamento. Esto lo haremos en el directorio raiz de nuestro proyecto, el archivo se llamara ".babelrc" y tendra el siguiente contenido:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## Webpack

No hay necesidad de volver a repetir lo que ya hemos dicho, esto también suele pasar desapercibido, y es webpack. Este es un "empaquetador", su funcion principal es optimizar el proyecto de manera que se pueda cargar mas rapido, usando varios métodos, optimización y modularidad especificamente.

#### ¿Por qué necesitamos Webpack?

- Modularidad: Permite trabajar con archivos modulares (importando y exportando módulos).
- Optimización: Webpack optimiza los archivos agrupados (bundled) para mejorar el rendimiento de la aplicación, lo que incluye minimizar el código, dividirlo en fragmentos (chunks), etc.
- Compatibilidad con Babel: Al usar Webpack con Babel, podemos transformar el código JS moderno y JSX antes de que sea empaquetado y ejecutado en el navegador.

Para instalarlo ejecutaremos estor códigos con los paquetes necesarios para su funcionamiento:

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
```

Aquí está el desglose del comando:

- webpack: El motor que realiza el empaquetado.
- webpack-cli: Proporciona una interfaz de línea de comandos para interactuar con Webpack.
- webpack-dev-server: Un servidor de desarrollo que permite ver en tiempo real los cambios en tu proyecto sin recargar manualmente el navegador.
- html-webpack-plugin: Genera un archivo HTML para tu aplicación e incluye automáticamente los archivos JavaScript empaquetados.

Y como no podria ser de otra forma usaremos un archivo para su configuración, de igual manera que con el de babel, lo crearemos en la carpeta raiz del proyecto, se llamara "webpack.config.js" y sera así:

```json

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output:{
    path: path.resolve(__dirname,'dist'),
    filename:'bundle.js',
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader:'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve:{
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer:{
    static: './dist',
  },
  mode:'development',
};
```

Desglose de la configuración de Webpack:

- entry: Define el archivo de entrada de la aplicación (en este caso, src/index.js). Este es el punto de inicio desde donde Webpack comienza a empaquetar todos los archivos.
- output: Define dónde debe ir el archivo empaquetado final. Aquí se crea una carpeta llamada dist con un archivo bundle.js.
- module.rules: Reglas para manejar diferentes tipos de archivos. Por ejemplo:
  - babel-loader: Aplica Babel a los archivos .js y .jsx.
  - css-loader y style-loader: Para manejar archivos CSS e inyectarlos en el HTML.
- resolve: Permite importar archivos JavaScript y JSX sin necesidad de escribir la extensión (.js o .jsx).
- plugins: Los plugins añaden funcionalidades extra. Usamos HtmlWebpackPlugin para generar automáticamente un archivo HTML que incluya nuestro script de JavaScript empaquetado.
- devServer: Configura el servidor de desarrollo para servir los archivos desde la carpeta dist.
- mode: Especifica que estamos en modo de desarrollo (development). Puedes cambiarlo a production cuando estés listo para desplegar la aplicación.

** ¿Esto es todo? **
No, para poder usarlo necesitamos implementar los scripts de ejecución en el package.json del proyecto, dentro de la sección de "scripts" , así:

```json
"scripts":{
  "start": "webpack serve --mode development",
  "build": "webpack --mode production"
}
```

Ahora con "npm start" iniciaras el servidor y con "npm run build" Empaquetaras los archivos y los optimizaras para el modo de producción, **pero todavia no los puedes usar, así que esperate para los siguientes pasos**

## Creando el archivo "index.html"

Este si es el archivo el que le da vida al proyecto, aqui implementaremos la carga de la aplicación, en este archivo generaremos el "ancla" para que react pueda cargar nuestro componentes y nuestro código de js, el cual estara en la carpeta (que tenemos que crear) "src/index.html". Lo necesario es generar el div de id"root" el cual sera el pundo de entrada de react, y se deberia ver asi:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

#### ¿Por qué usamos el id="root"?

El ID root es el lugar donde React "controla" el DOM. En React, no interactuamos directamente con el DOM como lo haríamos con JavaScript puro o jQuery, sino que usamos el sistema de componentes de React para describir cómo debería verse la interfaz, y React actualiza el DOM de manera eficiente.

## Creando el archivo index.js

Ahora que tenemos el HTML listo, necesitamos el código JavaScript que React usará para generar y actualizar la interfaz de usuario. Crearemos un archivo index.js como punto de entrada para nuestra aplicación.

1. Crear el archivo index.js:

Dentro de la carpeta src, crea un archivo llamado index.js con el siguiente contenido:

```js
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
    </div>
  );
}

root.render(<App />);
```

Desglose del archivo:

- import React from 'react';: Importa React, que es necesario para utilizar JSX (JavaScript XML) y construir componentes.
- import ReactDOM from 'react-dom/client';: Importa ReactDOM, que se encarga de montar los componentes de React en el DOM. El método createRoot es usado para iniciar el punto de entrada a la aplicación.
- ReactDOM.createRoot(document.getElementById('root'));: Con esto, seleccionamos el div con id="root" en el HTML como el lugar donde montaremos nuestra aplicación.
- function App(): Definimos un componente funcional llamado App, que es la unidad básica de React. Este componente retorna un bloque JSX que representa la UI que queremos mostrar.
- root.render(<App />);: Este comando renderiza el componente App dentro del div con ID root. En este caso, el componente App muestra un encabezado h1 con el texto "Hello, React!".

#### 2. ¿Qué es un componente en React?

Un componente es una función o clase que retorna un fragmento de la interfaz de usuario (UI). Los componentes son reutilizables y permiten dividir la interfaz en partes pequeñas y manejables. En nuestro caso, App es un componente funcional que genera una parte de la interfaz, y podemos crear muchos más componentes dentro de nuestra aplicación.

## Organizar la estructura de <carpetas>

Conforme vamos avanzando en el proyecto, debemos tener claro como vamos a organizar el proyecto, existen varias metodologias para mantener claro el flujo de construcción del proyecto así como arquitecturas para organizar los archivos en el mismo. Por el momento generaremos la arquitectura que tiene por defecto react la cual es así:

```bash
src/
├── components/
├── styles/
├── App.js
├── index.js
└── index.html
```

Desglose de la estructura:

- components/: Aquí es donde guardarás los componentes React. Cada componente es una pieza reutilizable de la interfaz. A medida que tu aplicación crezca, puedes crear subcarpetas adicionales según lo necesites.
- styles/: En esta carpeta puedes colocar tus archivos CSS para mantener los estilos separados del código JavaScript. Alternativamente, puedes usar CSS-in-JS o alguna solución de estilo en línea, pero por ahora usaremos archivos CSS simples.
- App.js: Este es el archivo donde escribiremos el componente principal de la aplicación. Lo llamaremos App, y desde aquí puedes manejar la navegación o incluir otros componentes.
- index.js: El punto de entrada principal para la aplicación, que ya hemos configurado. Aquí es donde se inicia React y donde se renderiza el componente App en el DOM.
- index.html: Ya lo tenemos configurado y contiene el punto de montaje de nuestra aplicación.

## Creando el archivo App.js

Si queremos mantener un orden adecuado es necesario darle a cada parte del proyecto su propio espacio, el componente "App.js" no es la excepción, por eso lo llevaremos a un archivo aparte para poder manejarlo y/o usarlo dado sea necesario. Este archivo lo generaremos en la carpeta "src" y este sera el código que agregaremos:

```js
import React from "react";

function App() {
  return (
    <div>
      <h1>Welcome to my React App!</h1>
      <p>This is a basic React setup from scratch.</p>
    </div>
  );
}

export default App;
```

Explicación del código:

import React from 'react';: Necesitamos importar React en cada archivo donde vayamos a usar JSX (HTML dentro de JavaScript).
function App(): Este es un componente funcional, que simplemente retorna una estructura JSX que describe lo que queremos que se muestre en la página.
export default App;: Exporta el componente App, permitiendo que otros archivos lo importen y lo usen.

### Actualizando index.js

Al generar un archivo aparte para index.js necesitaremos modificar el index.js teniendo en cuenta la imoprtación de App.js:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Importamos el componente App

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

Explicación del cambio:

import App from './App';: Importa el componente App que acabamos de crear. Ahora el archivo index.js está más limpio y centrado en la inicialización de la aplicación.
