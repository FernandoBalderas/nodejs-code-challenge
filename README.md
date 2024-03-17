# Pokemon API

Mi implementación del ejercicio de API de pokemon.

## Consideraciones tecnicas

Al leer los requerimientos me percaté de que se tiene una tabla Pokemon para guardar los pokemon capturados por un entrenador, pero identifiqué que una especie de pokemon podria ser capturado muchas veces y para evitar la duplicación de información creé una tabla intermedia que representa los pokemon capturados por x entrenador, y una tabla de pokemon que guarda la información de pokemon.

Creé una tabla intermedia explicitamente para representar a los Capturados en vez de dejar a Prisma hacerlo por la siguiente consideración: Un entrenador puede marcar como favoritos a pokemons QUE EL TENGA CAPTURADOS, significa que un entrenador no puede tener de favorito cualquier pokemon por lo cual no hay una relación entre Entrenador <-> Pokemon sino a Entrenador <-> Capturados y la forma más simple de representar esta relacion es agregando un campo para verificar si un pokemon capturado esta marcado como favorito o no y este nuevo campo requiere que se creé formalmente en la tabla intermedia.

Si, el entrenador pudiera marcar como favorito cualquier pokemon independientemente de si lo tiene capturado o no entonces se pueden crear dos relaciones de Prisma para contener Pokemon[] y se puede pasar de la tabla intermedia.

Por cuestiones de tiempo no implementé un sistema mas robusto de logging ni error handling.

**Optimización**: Gracias a separar el registro de pokemon capturado del registro del pokemon podemos ahorrar llamadas a PokeAPIs para pokemons que ya han sido capturados por cualquier otro entrenador, igualmente los tipos se van poblando en la BD conforme se vayan registrando pokemon con tipos nuevos lo cual permite una flexibilidad y permite a la aplicación funcionar sin pre-cargar valores.

## Uso de la API

POST `/register` -> Envia un objeto json con usuario y contraseña para registrar tu usuario y recibir tu JWT de auth

POST `/login` -> Envia un objeto json con usuario y contraseña previamente registerado y recibe tu JWT de auth

## Rutas protegidas

GET `/api/pokemon/captured` -> Recibe la lista de pokemons capturados por un usuario según su JWT

POST `/api/pokemon/captured` -> Envia un objeto json con propiedades `id` o `name` para agregar un pokemon a la colección de un usuario según su JWT. `name` es case-insensitive

GET `/api/pokemon/favorite` -> Recibe la lista de pokemons favoritos por un usuario según su JWT

POST `/api/pokemon/favorite` -> Envia un objeto json con propiedades `id` o `name` para marcar un pokemon como favorito previamente capturado de un usuario según su JWT. `name` es case-insensitive

## Setup del proyecto

### Correr en local

```
  pnpm i
  pnpm dev
```

### Correr en docker

Construye la imagen según el dockerfile y ejecuta con variables de ambiente

```
  docker run -d \
  --name pokeapi \
  -p 8000:8000 \
  -e PORT=8000 \
  -e SECRET_KEY='string' \
  -e POKEMON_API_URL='https://pokeapi.co/api/v2' \
  [image id]
```
