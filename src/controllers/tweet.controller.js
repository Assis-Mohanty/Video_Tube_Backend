import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
const createTweet = asyncHandler(async (req, res) => {
    const {ownerId}=req.user?._id
    const {content}=req.body

    if(!content){
        throw new ApiError(201,"Coundnt access content")
    }
    const tweet =await Tweet.create({content:content,owner:ownerId},{new:true})
    return res.status(201)
    .json(new ApiResponse(201,tweet,"Tweet added succesfully"))
})
const getUserTweets = asyncHandler(async (req, res) => {
    const {ownerId}=req.user?._id
    if(!ownerId){
        throw new ApiError(401,"User doesnt exist")
    }
    const tweet=await Tweet.find({owner:ownerId})
    return res.status(201)
    .json(new ApiResponse(201,tweet,"All Tweets of User"))
    
})
const updateTweet = asyncHandler(async (req, res) => {
    const {TweetId}=req.params
    
    const {content}=req.body
    const tweet=await Tweet.findByIdAndUpdate(TweetId,{
        content:content
    },{new:true})
    return res.status(201)
    .json(new ApiResponse(201,tweet,"Updated Tweet Successfully"))
})

const deleteTweet = asyncHandler(async (req, res) => {
    const {TweetId}=req.params
    const tweet=await Tweet.findById(TweetId);
    await Tweet.findByIdAndDelete(TweetId)
    return res.status(201)
    .json(new ApiResponse(201,tweet,"Deleted Tweet"))
})

export {
    createTweet,getUserTweets,updateTweet
}