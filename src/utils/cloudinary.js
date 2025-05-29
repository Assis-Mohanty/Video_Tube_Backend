import {v2 as cloudinary} from "cloudinary"
import { log } from "console";
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_API, 
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
});

const uploadonCloundinary = async(localfilepath)=>{
    try{
        if(!localfilepath){
            return null
        }
        const response=await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
        //file has been successfully uploaded
        console.log("file has been uploaded on cloudinary",response.url)
        fs.unlinkSync(localfilepath)
        return response
    }
    catch(error){
        fs.unlinkSync(localfilepath) //removes the locally saved temporary file 
        return null;
    }

}

export {uploadonCloundinary}