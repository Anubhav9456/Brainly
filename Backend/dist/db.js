import mongoose, { model, Schema } from "mongoose";
// Connecting to the MongoDB database using a connection string
mongoose.connect("mongodb+srv://moon:%40moonak9456@brainly.hiczxss.mongodb.net/");
// Defining a schema for the 'User' collection
// Each user will have a unique 'username' and a 'password'
const UserSchema = new Schema({
    username: { type: String, unique: true }, // Unique username to ensure no duplicates
    password: { type: String } // Password for the user
});
// Creating a model for the 'User' collection, enabling interactions with the database
export const UserModel = model("User", UserSchema);
//# sourceMappingURL=db.js.map