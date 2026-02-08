import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // subscription: {
    //     endpoint: String,
    //     keys: {
    //         p256dh: String,
    //         auth: String
    //     }
    // }
    subscription: {type:String}
}, { timestamps: true });

export default mongoose.model("Subscription", subscriptionSchema);
