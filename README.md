# nodejs-code-challenge

# Instrucciones

- Crear una rama del proyecto con el siguiente formato nombre_apellido
- Crear proyecto en nodejs con typescript
- Instalar las dependencias necesarias
- Instalar prisma que será el ORM para usar en el proyecto (https://www.prisma.io/)
- Instalar mysql de forma local en tu maquina
- La estructura que se use en el proyecto es opcional (es uno de los puntos a calificar)
- Usar pnpm para gestionar los paquetes del proyecto
- Dockernizar tu proyecto

[![ash.png](https://i.postimg.cc/dtkh6kyj/ash.png)](https://postimg.cc/RNmCV0GW)

Ash Ketchum, después de años de aventuras, finalmente se ha convertido en un Campeón Pokémon. Tras alcanzar su sueño, decide emprender una nueva aventura, pero esta vez en el mundo de la tecnología. Nintendo, impresionado por su determinación y habilidad para alcanzar objetivos, lo ha contratado como programador backend en Node.js. Su primer proyecto es desarrollar una API que interactúe con la PokéAPI (https://pokeapi.co/docs/v2), gestionando datos de usuarios y sus Pokémon dentro de una aplicación.

# Objetivos del Proyecto

Desarrollar una API en Node.js que permita a los usuarios registrarse, iniciar sesión y gestionar una colección de Pokémon.
Integrar la API con PokéAPI para obtener información sobre Pokémon.
Utilizar MySQL como sistema de gestión de bases de datos y Prisma como ORM para modelar y manejar la base de datos.
Dockernizar tu proyecto para ejecutarlo como un servicio.

# Requisitos del Proyecto

# La base de datos debe contener las siguientes tablas:

- **Usuarios:** Para almacenar información sobre los usuarios de la aplicación.
- **Pokémon:** Para registrar los Pokémon que cada usuario ha capturado.
- **Tipo:** Para almacenar los tipos de pokemon (fuego, agua, lucha, normal)
- **Favoritos:** Para permitir a los usuarios marcar ciertos Pokémon como favoritos.

Cada tabla debe estar adecuadamente relacionada para reflejar las relaciones entre usuarios, sus Pokémon, las regiones de estos Pokémon, y los favoritos del usuario.

### **Incluir el archivo sql de la base de datos dentro del proyecto.**

# Dockerización del Proyecto

- **Dockerfile para este proyecto:** Debes crear un Dockerfile en la raíz de tu proyecto que especifique cómo se debe construir la imagen de tu aplicación Node.js. Este archivo debe incluir instrucciones para instalar las dependencias y arrancar la aplicación.

# API

# La API debe exponer endpoints para:

- **Registro de usuarios:** Permitir a los nuevos usuarios crear una cuenta.
- **Inicio de sesión:** Autenticar a los usuarios.
- **Listado de Pokémon:** Permitir a los usuarios ver los Pokémon que han capturado (nombre, tipo, usuario al que pertenece).
- **Agregar un Pokémon:** Los usuarios pueden añadir un Pokémon a su colección.
- **Marcar un Pokémon como favorito:** Los usuarios pueden marcar uno de sus Pokémon como favorito.

Al añadir un Pokémon a la colección de un usuario, la aplicación debe consultar la PokéAPI para obtener información sobre ese Pokémon (como su nombre, tipos, habilidades, etc.) y almacenarla en la base de datos.
Criterios de Evaluación

# Los proyectos serán evaluados según los siguientes criterios:

- **Calidad del código:** Claridad, mantenibilidad y uso de buenas prácticas de programación.
- **Uso de Docker:** Usar Docker para ejecutar el proyecto.
- **Estructura de la base de datos:** Diseño lógico de las tablas, relaciones y cómo se manejan los datos.
- **Uso de Prisma:** Eficiencia y correcta implementación de Prisma para interactuar con la base de datos.
- **Integración con PokéAPI:** Cómo se realiza y se maneja la integración con la PokéAPI.
- **Seguridad:** Implementación de buenas prácticas de seguridad, especialmente en la autenticación de usuarios y el manejo de contraseñas.

# Ejemplo

## Añadir un Pokémon

- **Endpoint:** Crea un endpoint en tu API (por ejemplo, POST /pokemon) que permita a los usuarios añadir un Pokémon a su colección.
- **Solicitud a PokéAPI:** Cuando un usuario quiera añadir un Pokémon, tu API deberá primero realizar una solicitud a la PokéAPI para obtener la información de ese Pokémon específico. Esto se puede hacer utilizando Axios para realizar una solicitud GET a https://pokeapi.co/api/v2/pokemon/{nombre_o_id_del_pokemon}.
- **Procesar la respuesta:** Una vez que recibas la respuesta de la PokéAPI, extrae la información relevante que deseas almacenar en tu base de datos, como el nombre del Pokémon, su tipo, habilidades, y cualquier otro dato que consideres importante.
- **Almacenar en la base de datos:** Utiliza Prisma para crear un nuevo registro en tu tabla de Pokémon, asociando la información obtenida con el usuario correspondiente. Asegúrate de que el usuario esté autenticado y utiliza su ID para relacionar el Pokémon con su cuenta.

# Requisitos Adicionales del Proyecto

## Autenticación y Autorización

Registro e Inicio de Sesión: Al registrar un usuario nuevo, el sistema debe generar un token JWT y devolverlo al cliente. Este token será utilizado para las subsiguientes solicitudes que requieran autenticación.
Middleware de Autenticación: Deberás crear un middleware que verifique el token JWT en las rutas protegidas. Si el token es válido, el middleware permitirá el acceso a la ruta; de lo contrario, deberá rechazar la solicitud.

## Rutas Protegidas

### Las siguientes rutas deben estar protegidas y requerir un token JWT válido para acceder a ellas:

1. Listado de Pokémon registrados
2. Agregar un Pokémon
3. Marcar un Pokémon como favorito

Entrega
El proyecto debe ser entregado en la rama creada, incluyendo todas las fuentes del código, archivos de configuración de la base de datos, y cualquier documentación relevante para ejecutar y probar la aplicación.
