## README

Rails version 6.1.4.1
Ruby version 2.6.5

Para ejecutar el servidor: 

1. ```bundle install```
2. ```rails server```
3. abrir el navegador e ir a localhost:3000

Para ejecutar los tests:
```rspec```

La lógica de frontend se encuentra en ```/app/javascript/helpers.js```
La lectura de datos por socket se encuentra en ```/app/javascript/channels/prices_channel.js```
Los Unit Test se encuentran en ```/spec```
La lógica de conexión con la API de precios de las cryptos se encuentra en ```/app/services/crypto_api_service.rb```
