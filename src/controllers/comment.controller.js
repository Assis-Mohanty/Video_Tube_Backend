import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from './../models/Video.model';

const addComment = asyncHandler(async (req, res) => {
    const {videoId}=req.params 
    const {content}=req.body
    if(!content){
        throw new ApiError(401,"Comment cannot be empty")
    }
    const comment =await Comment.create({content:content,video:videoId,owner:req.user._id})
    if(!comment){
        throw new ApiError(404,"Comment couldnt get created")
    }
    return res.status(201)
    .json(new ApiResponse(201,"comment added succesfully"))
})
const updateComment = asyncHandler(async (req, res) => {
    const {commentId}=req.params 
    const {content}=req.body
    if(!content){
        throw new ApiError(401,"Comment cannot be empty")
    }
    const comment = await Comment.findByIdAndUpdate(commentId,
        {
            comment:content
        },
        {new:true}
    )
    return res.status(201)
    .json(new ApiResponse(201,comment,"Updated Comment Successfull"))
})
const deleteComment = asyncHandler(async (req, res) => {
    const {commentId}=req.params
    const comment =await Comment.findById(commentId)
    await Comment.findByIdAndDelete(commentId)
    return res.status(201)
    .json(new ApiResponse(201,comment,"Comment deleted succesfully"))
})
const getVideoComments = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    const comment =await Comment.find({video:videoId})
    if(!comment){
        throw new ApiError(404,"Something went wrong while fetching comments")
    }
    return res.status(201)
    .json(new ApiResponse(201,"Comments of video"))
})

export {addComment,updateComment,deleteComment,getVideoComments}