import mongoose, { model, Schema } from "mongoose";
mongoose.connect("mongodb+srv://moonkakran:moonak9456@cluster.gayslvm.mongodb.net/");
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String }
});
export const UserModel = model("User", UserSchema);
const ContentSchema = new Schema({
    title: String, // Title of the content
    link: String, // link to the content
    tags: [{ type: mongoose.Types.ObjectId, ref: "tag" }], // Array of tag IDs, referencing the 'tag' collection
    userId: [{
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true // The 'userId' field is mandatory to link content to a user
        }],
});
export const ContentModel = model("Content", ContentSchema);
const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
});
export const LinkModel = model("Links", LinkSchema);
//# sourceMappingURL=db.js.map