import { HttpException } from "@nestjs/common"
import { extname } from "path"

export const uploadPetsFile =(req, file, callback)=>{
    if(!file.originalName.match(/\.(jpeg|jpg|png)$/)){
     return new HttpException('Try again', 404 )
    }
    callback(null,true)
}


export const editFiles =(req, file, callback)=>{
   const name = file.originalName.split('.')[0];
   const fileExtName = extname(file.originalName);
   const requiredLenght = 6;
   const randomArr = [];
   for(let i=0; i<= requiredLenght; i++){
    const randomString = (Math.floor(Math.random() *16).toString(16));
    randomArr.push(randomString);  
   }
   const string =  randomArr.join('');
   callback (null,`${name}, ${string}, ${fileExtName}`)
}
