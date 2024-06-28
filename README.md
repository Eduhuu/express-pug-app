Proyecto desarrollado con Node, Express js y postgres

- Instalamos node con:

sudo apt install nodejs

- Instalamos Express con:

npm install express

- Instalamos npm con:

sudo apt install npm

- Instalamos nodemon con:
npm install nodemon --save-dev

En src/app/db/index.js se tienen las variables para conectarse a postgres.

Pasos a seguir para instalar postgres:
- Instalar postgres:
sudo apt install postgresql

- Compruebe que el servidor de postgres esta corriendo con:
pg_lsclusters
Si no esta corriendo reinicie postgres con: 
sudo service postgresql restart

- El proyecto utiliza una base de datos con las siguientes caracteristicas:
    - user: 'postgres',
    - host: 'localhost',
    - database: 'postgres',
    - password: 'postgres',
    - port: 5432,

    Por lo que debemos cambiar las credenciades del usuarios postgres

- Utilizamos el usuario 'postgres':
sudo -i -u postgres

- Ejecutamos postgres con el comando:
psql

- Para cambiar la contrasena utilizamos:
ALTER USER postgres WITH PASSWORD 'postgres';

- Nos salimos de la base de datos con: exit

- Por ultimo queda crear las migraciones, estas se encuentra ubicadas en src/app/db/migrations.js. Las cuales son un archivo .js que crea todas las tablas de la base de datos. Para ejecutarlas utilizamos:
npm run migrate

- Ya podemos ejecutar el proyecto con:

npm run dev