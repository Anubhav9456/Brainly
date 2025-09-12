import mongoose, { model, Schema } from "mongoose";

// Connecting to the MongoDB database using a connection string
mongoose.connect("mongodb+srv://moon:%40moonak9456@brainly.hiczxss.mongodb.net/");

// Defining a schema for the 'User' collection
// Each user will have a unique 'username' and a 'password'
const UserSchema = new Schema({
    username: { type: String, unique: true }, // Unique username to ensure no duplicates
    password: { type: String }               // Password for the user
});

// Creating a model for the 'User' collection, enabling interactions with the database
export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema ({

    title : {type :String},
    Link :{type :String},
    tage : [{type : mongoose.Types.ObjectId, ref :"tag"}],
    userId :[{ type : mongoose.Types.ObjectId , ref : "User",required : true}]

});

export const ContentModel = model("Content", ContentSchema);


const LinkSchema = new Schema ({
    hash : {type : String},
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
});

export const LinkModel = model("Links", LinkSchema);