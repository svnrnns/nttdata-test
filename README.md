# NTTData Test

## Tecnologias

Esta aplicación ha sido desarrollada en Vue 3 (ver 3.5.13), Vite 6 y TailwindCSS 4.

## Despliegue

La aplicación está desplegada en su rama `main` [aquí](https://nttdata-test.vercel.app).

## Instalación

Clona el repositorio usando HTTP o SSH. Una vez clonado, muevete al directorio `nttdata-test` e instala las dependencias necesarias con el siguiente comando:

```bash
npm install
```

Lanza el proyecto en modo desarrollo con:

```bash
npm run dev
```

## Configuración

Para que el proyecto pueda compilar se necesita crear y rellenar el archivo `.env`. Hay una plantilla en `.env.example` donde se indican las variables y su tipo de dato.

> Spoiler: para este proyecto, solo hay que introducir la variable VITE_APP_URL con la url de la PokeApi https://pokeapi.co/api/v2

## Estructura de proyecto

### Árbol de ficheros

```
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   ├── composables
│   ├── main.js
│   ├── router
│   ├── utils
│   └── views
```

- `App.vue` - Componente principal de la aplicación. El punto de entrada.
- `/assets` - Carpeta que contiene, en este caso, el CSS de la aplicación. Si la aplicación require de media, también irá ahí.
- `/components` - Carpeta de componentes de Vue.
- `/composables` - Carpeta de composables de Vue. También conocidos como "hooks" en React.
- `main.js` - Punto de entrada JavaScript de la aplicación.
- `/router` - Carpeta que contiene la información referente al router de Vue.
- `/utils` - Carpeta que contiene funciones de ayuda útiles para la aplicación.
- `/views` - Carpeta de vistas de la aplicación.

### Vistas

#### PokemonList

Esta vista renderiza los Pokémon en base a la PokeApi en formato Tarjeta o Tabla, a escoger por el usuario, a través de `ModeSelector.vue`.
Se renderizan elementos de 10 en 10 ya que la vista está paginada. La paginación se gestiona a través de `PokemonPagination.vue`.
Cada elemento contiene la imagen/icono de un Pokémon junto con su nombre.

Al hacer click en un elemento se abrirá la vista `PokemonDetail`.

**Configuración:**

- Se guarda en tiempo real es estado del `offset` en los queryParams para que al volver a la vista se recupere la paginación y no se vuelva a la página 1.

#### PokemonDetail

Esta vista renderiza la información detallada de cada Pokémon, enseñando el nombre, tipo, especie y habilidades junto con su imagen.

### API

Las llamadas a la API se gestionan a través del composable `useGetEndpoint.js` ya que no existe, de momento, ninguna llamada de un metodo diferente al `GET`.

`useGetEndpoint.js` exporta una función que recibe un endpoint y un payload como parametros, que pasará a la API como queryParams.
Devulve una variable `computed` de vue, que contiene un objeto en su `.value` con las siguientes propiedades:

- **response**: La respuesta de la API, si existe.
- **error**: El error al hacer la llamada, si existe.
- **isLoading**: El estado de carga de la llamada.

Un ejemplo de uso de esta función sería.

```js
const data = useGetEndpoint("pokemon", { offset: 10 });
```

## Tests

Para lanzar los tests, usa el siguiente comando:

```bash
npm run test
```

Los tests han sido realizados con `Vitest` usando el motor `happy-dom` para crear un DOM virtual.

Se testea si la funcionalidad core de todas las vistas es correcta en base a las diferentes respuestas que puede dar la PokeApi:

- Cargando infinitamente.
- La llamada falla.
- La llamada no falla.
