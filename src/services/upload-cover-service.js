const stream = require('stream');
const path=require('path');
const { google } = require('googleapis');

const KEYPATH=path.resolve( "credentials.json");
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const GOOGLELINK='https://drive.google.com/uc?id=';

const auth = new google.auth.GoogleAuth({
    keyFile: KEYPATH,
    scopes: SCOPES,
  });

const uploadCover= async(file)=>{
   const bufferStream= new stream.PassThrough();
   bufferStream.end(file.buffer); 
   const {data}= await google.drive({ version: 'v3',auth:auth })
   .files.create({
    media:{mimeType:file.mimeType,body:bufferStream},
    requestBody:{name:file.originalname,parents:['1yopN5pkFVwpqrf3iibzkdU5zQA8DDaeh']},
    fields:'id,name'
   });
   return {name:data.name,url:GOOGLELINK+data.id}
   
};

module.exports={
    uploadCover
}