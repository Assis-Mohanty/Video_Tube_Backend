import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
    channel:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    subscriber:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
const Subscription=mongoose.model("Subscription",subscriptionSchema)
export { Subscription };