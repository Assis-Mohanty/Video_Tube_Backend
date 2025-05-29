import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/Users.model.js";
import { uploadonCloundinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {Video} from "../models/Video.model.js"
import { upload } from './../middlewares/multer.middleware.js';

const publishVideo=asyncHandler(async(req,res)=>{
    const {title,description}=req.body;
    const owner =req.user._id;
    const videofile=req.files.videoFile[0].path;
    const thumbnail=req.files.thumbnail[0].path;
    if(!videoFile || !thumbnail || !title){
        throw new ApiError(400,"Video file ,thumbnail and title are required")
    }
    const videoFile=await uploadonCloundinary(videoFile);
    const thumbNail=await uploadonCloundinary(thumbnail);
    if(!videofile || !thumbnail ){
        throw new ApiError(401,"Something went wrong while uploading Video file or Thumb nail")
    }
    const newVideo=Video.create({
        title,
        owner,
        videoFile:videofile.url,
        thumbnai:thumbNail.url,
        description
    })
    return res.status(201).json(new ApiResponse(201,newVideo,"Video Published"))
})
const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const video=await Video.findById(videoId)
    if(!video){
        throw new ApiError(401,"No Such Video Exists")
    }
    return res.status(201).json(new ApiResponse(201,video))
});
const updateVideo=asyncHandler(async(req,res)=>{
    const { videoId}=req.params
    const {title,description}=req.body;
    const newVideo=req.files.videoFile[0].path;
    if(!newVideo){
        throw new ApiError(401,"Error while updating video")
    }
    const newvideo=await uploadonCloundinary(newVideo);
    const updatedVideo=await Video.findByIdAndUpdate(videoId,{
        $set:{videoFile: newvideo.url,
                title,
                description
        }
    },
    {new:true}
    );
    if(!updatedVideo){
        throw new ApiError(401,"No Such Video Exists")
    }
    return res
    .status(201)
    .json(201,"updatedfile succesfully",updatedVideo);
});
const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const video=await Video.findById(videoId)
    await Video.findByIdAndDelete(videoId);
    return res
    .status(201)
    .json(201,video,"Video deleted succesfully")    
})
const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const video =await Video.findById(videoId)
    if (!video) {
        throw new ApiError(401, "No Such Video Exists");
    }
    video.published=!video.published;
    await video.save();
    return res.status(200)
    .json(new ApiResponse(200,video,"Publish status toggled succesfully"))
})



export {publishVideo,getVideoById,updateVideo,deleteVideo,togglePublishStatus};