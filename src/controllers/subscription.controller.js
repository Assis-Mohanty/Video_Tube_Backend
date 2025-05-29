import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/Users.model.js";
import { uploadonCloundinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import { Video } from "../models/Video.model.js";
import { Tweet } from "../models/tweet.model.js";
import { Comment } from "../models/comment.model.js";
import{Like} from "../models/like.model.js"
import { Subscription } from "../models/subscription.model.js";
const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    const userId=req.user?._id
    const subscription=await Subscription.findById(channelId)
    if(!subscription){
        throw new ApiError(401,"Coudnt find the channel")
    }
    const isSubscribed=await Subscription.findOne({channel:channelId,subscriber:userId})
    if (isSubscribed) {
        await Like.findByIdAndDelete(isSubscribed._id);
      } else {
        await Like.create({channel:channelId,subscriber:userId});
      }
    return res.status(200).json(new ApiResponse(200, "Subscription Toggled"));
})

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    const UserSubs=await Subscription.find({channel:channelId})
    if(!UserSubs){
        throw new ApiError(401,"Coundnt get the User Subscribers")
    }
    return res.status(201)
    .json(new ApiResponse(201,UserSubs,"UserSubs fetched"))
})


const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;

    // Find all subscriptions where the subscribers array contains the subscriberId
    const subscriptions = await Subscription.find({ subscribers: subscriberId }).populate('channel');

    if (!subscriptions.length) {
        throw new ApiError(404, "No subscriptions found for this user");
    }

    return res.status(200).json(new ApiResponse(200, subscriptions, "Subscribed channels fetched successfully"));
});

export{
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}