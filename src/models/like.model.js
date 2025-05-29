import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const likeSchema = new mongoose.Schema(
    {
    comment:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    },
    likedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    tweet:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
    },
    video:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Video",
    },
},
{timestamps:true}
);

likeSchema.plugin(mongooseAggregatePaginate);
export const Like = mongoose.model("Like", likeSchema);