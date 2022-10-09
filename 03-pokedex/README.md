<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Ejecutar en desarrollo

1. Clonar el repositorio
```
git clone <repositorio>
```

2. EJecutar
```
yarn install
```

3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renombrar a __.env__

6. Llenar las variables de entorna definidas en el __.env__

7. Ejecurar la aplicación en desarrollo:
```
yarn start:dev
```

8. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/seed
```

## Stack usado
* MongoDB
* Nest


## Production Build
1. Crear el archivo __.env.prod__
2. Llenar las variables de entorno de producción
3. Crear la imagen
```
docker-compose -f docker-compose.prod.yml --env-file .env.prod up --build
```