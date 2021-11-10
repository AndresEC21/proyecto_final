Para el despliegue y el correcto funcionamiento de la aplicacion de analisis biometrico debemos realizar los siguientes pasos
1. Crear un almacenamiento en AWS S3 , crear una carpeta y añadir la foto de la persona de referencia para el analisis biometrico.
2. Crear las bases de datos correspondientes, una desde AWS RDS la cual va a ser una base de datos mysql la cual contenga las variables de documento y y similitud y otra en dynamodb donde se van a ingrear en una tabla todas las peticiones post que se realicen en la pagina.
3.Crear las funciones lambda, en este caso serán dos , una para redireccion de las paginas web y otra para el reconocimiento biometrico , las cuales contendran los siguientes codigos :
Para la funcion del reconocimiento biometrico escogemos el entorno de ejecucion nodejs y para el de redireccionamiento python 3.8
Codigo principal para la funcion lambda_biometria 



Codigo principal para la funcion dojowebfunction



4.Por ultimo debemos crear dos apigatewar para vicularlos a nuestras funciones, en este caso contendran metodos get y post , los vincularemos a las funciones.


5. Debemos implementar la api en etapas de desarrollo que creemos y asi se generará un link , el cual servirá tanto para recibir peticiones de otras funciones o de mostrar el contenido de las paginas. 

6. Para la utilización de la aplicación , lo que haremos será llenar los datos de la página web y verificar en la base de datos la similitud que se tiene entre la persona de la foto almacenada y la foto tomada con la camara web del dispositivo , esto nos permitirá posteriormente realizar un login de ser necesario con datos biometricos. 
