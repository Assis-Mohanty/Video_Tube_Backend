import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(404, "Invalid videoId");
  }
  try {
    const existingLike = await Like.findOne({
      video: videoId,
      likedBy: req.user._id,
    });
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      res.status(201).json(201, "Like is removed from the video");
    } else {
      const newLike = await Like.create({
        video: videoId,
        likedBy: req.user._id,
      });
      res.status(201).json(201, "Video has been liked");
    }
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while toggling video like",
      error
    );
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!isValidObjectId(commentId)) {
    throw new ApiError(404, "Invalid commentId");
  }
  try {
    const existingLike = await Like.findOne({
      comment: commentId,
      likedBy: req.user._id,
    });
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      res.status(201).json(201, "Like is removed from the comment");
    } else {
      const newLike = await Like.create({
        comment: commentId,
        likedBy: req.user._id,
      });
      res.status(201).json(201, "Video has been liked");
    }
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while toggling comment like",
      error
    );
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(404, "Invalid commentId");
  }
  try {
    const existingLike = await Like.findOne({
      tweet: tweetId,
      likedBy: req.user._id,
    });
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      res.status(201).json(201, "Like is removed from the comment");
    } else {
      const newLike = await Like.create({
        tweet: tweetId,
        likedBy: req.user._id,
      });
      res.status(201).json(201, "Video has been liked");
    }
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while toggling tweet like",
      error
    );
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  try {
    const likedVideos = await Like.find({
      video: { $ne: null },
      likedBy: req.user._id,
    });
    if (!likedVideos || likedVideos.length === 0) {
      throw new ApiError(401, "No liked Videos found");
    }
    res
      .status(201)
      .json(
        new ApiResponse(201, likedVideos, "Liked Vidoes fetched succesfully")
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while fetching liked videos",
      error
    );
  }
});

const getLikedTweets = asyncHandler(async (req, res) => {
  try {
    const likedTweets = await Like.find({
      tweet: { $ne: null },
      likedBy: req.user._id,
    }); // Find documents where the "tweet" field is not empty

    if (!likedTweets || likedTweets.length === 0) {
      throw new ApiError(404, "No liked tweets found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, likedTweets, "Liked tweets fetched successfully")
      );
  } catch (error) {
    throw new ApiError(
      500,
      error,
      "Some error occurred while getting liked tweets"
    );
  }
}); //DONE!

const getLikedComments = asyncHandler(async (req, res) => {
  try {
    const likedComments = await Like.find({
      comment: { $ne: null },
      likedBy: req.user._id,
    }); // Find documents where the "comment" field is not empty

    if (!likedComments || likedComments.length === 0) {
      throw new ApiError(404, "No liked comments found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          likedComments,
          "Liked comments fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error,
      "Some error occurred while getting liked comments"
    );
  }
}); //DONE!

export {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getLikedVideos,
  getLikedComments,
  getLikedTweets,
};
