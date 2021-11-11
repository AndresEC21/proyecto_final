const AWS = require('aws-sdk');
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'database-1.c5vhhsc8kyrb.us-east-2.rds.amazonaws.com',
  user: 'admin',
  port:"3306",
  password: 'proyectoc',
  database: 'bdproyectoc',
});


exports.handler = async (event) => { 
    
          // OBTENER FOTO S3 y lo PONEMOS EN BUFFER
          let Bucket = "ue2stglusoft2000/imagen";
          let Key = "Aristi.jpeg.jpeg";
          let requestBUCKET = {
            Bucket,
            Key,
          };
          let s3bucket = new AWS.S3();
          let fotografia = await  s3bucket.getObject(requestBUCKET).promise();
          const bufferFoto = await Buffer.from(fotografia.Body.toString('base64').replace(/^data:image\/\w+;base64,/, ""), "base64");
          // OBTENER FOTO POST y lo PONEMOS EN BUFFER.
          const bufferValidacion = await Buffer.from(event.imagen.replace(/^data:image\/\w+;base64,/, ""), "base64");
          //VALIDACION FACIAL
          const params_ = {
            SimilarityThreshold: 90, 
            SourceImage: { Bytes: bufferFoto}, 
            TargetImage: { Bytes: bufferValidacion}
          };
          var rekognition = new AWS.Rekognition();
          let compareFacesResponse = await rekognition.compareFaces(params_).promise();
          let resultado="Similitud : "+compareFacesResponse.FaceMatches[0].Similarity;
        
          // REGISTRAMOS EN LA BASE DATOS
           let sql = "INSERT INTO tb_biometria (documento,resultado) VALUES ('"+event.documento+"','"+resultado+"')";
           await new Promise((resolve, reject) => { 
              con.query(sql, (err, res) => {
                        if (err) {
                          throw err
                        }
              resolve("OK");

              });
            })
        const response = {
        statusCode: 200,
        body: JSON.stringify("Se registro BD y tu "+ resultado),
        };
        return response;
    
};
