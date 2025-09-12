import express from "express";
import { UserModel, ContentModel, LinkModel } from "./db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { userMiddleware } from "./middleware.js";
const app = express();
app.use(express.json());
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        // Create a new user with the provided username and password.
        await UserModel.create({ username, password });
        res.json({ message: "User signed up" }); // Send success response.
    }
    catch (e) {
        // Handle errors like duplicate usernames.
        res.status(409).json({ message: "User already exists" }); // Conflict status.
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Find a user with the provided credentials.
    const existingUser = await UserModel.findOne({ username, password });
    if (existingUser) {
        // Generate a JWT token with the user's ID.
        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
        res.json({ token }); // Send the token in response.
    }
    else {
        // Send error response for invalid credentials.
        res.status(403).json({ message: "Incorrect credentials" });
    }
});
// Route 3: Add Content
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title } = req.body;
    // Create a new content entry linked to the logged-in user.
    await ContentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId, // userId is added by the middleware.
        tags: [] // Initialize tags as an empty array.
    });
    res.json({ message: "Content added" }); // Send success response.
});
// Route 4: Get User Content
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId; // User ID is fetched from middleware
    // Fetch all content associated with the user ID and populate username
    // The `populate` function is used to include additional details from the referenced `userId`.
    // For example, it will fetch the username linked to the userId.
    // Since we specified "username", only the username will be included in the result, 
    // and other details like password won’t be fetched.
    const content = await ContentModel.find({ userId: userId }).populate("userId", "username");
    res.json(content); // Send the content as response
});
// Route 5: Delete User Content
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    // Delete content based on contentId and userId.
    //@ts-ignore
    await ContentModel.deleteMany({ contentId, userId: req.userId });
    res.json({ message: "Deleted" }); // Send success response.
});
app.listen(3000);
//# sourceMappingURL=index.js.map