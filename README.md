# ADMIN-COLORES
API con operaciones CRUD, que permite administrar los datos de colores con 2 perfiles 
 1. Administrador
    - Acceso a los metoos de POST, UPDATe y DELETE
 2. Usuario
    - Acceso a los metoos de GET


La API valida los permisos SIMULANDO la existencia de un tocken, el cual en su hash 
cotiene el peril del usuario logueado.

En esta actuvidad no se genera un token, pero si se valida segun la informacion contenida en el HEADER de la peticion.

# TECNOLOGIAS
- Angular (frontend)
- Nodejs (backend)
- MongoDB (base de datos)


# REQUSITOS
Tener docker instalado


# DOCKER 
ejecutar : ```docker-compose up``` en linea de comandos, esto levantara toda la solucion en localhost.


# PARA REVISAR LA DOCUMENTACION DE LA API 
Esta documentacion es "referencial" para facilitar su lectura, se puede abrirl el contenido del archivo ```./apy.yml ``` en https://editor.swagger.io/


# OBSERVACION 
Para desarrollar o probar la solucion se debe modificar la url  y debe ser ```localhost:port```, en modo ejecucion la url debe ser ```mongodb:port``` en el backend archivo ```/config/enviroment.js```


