import express from "express";
import {  UserModel,ContentModel,LinkModel } from "./db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { userMiddleware } from "./middleware.js";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
   
    const username = req.body.username;
    const password = req.body.password;

    try {
        
        await UserModel.create({ username, password });
        res.json({ message: "User signed up" }); 
    } catch (e) {
       
        res.status(409).json({ message: "User already exists" }); 
    }
});

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

   
    const existingUser = await UserModel.findOne({ username, password });
    if (existingUser) {
        
        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
        res.json({ token }); 
    } else {
       
        res.status(403).json({ message: "Incorrect credentials" });
    }
});

// Route 3: Add Content
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const  link  = req.body.link
    const type = req.body.type
    const title = req.body.title

    
    await ContentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId, 
        tags: [] 
    });

    res.json({ message: "Content added" }); // Send success response.
});

// Route 4: Get User Content
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;  
    const content = await ContentModel.find({ userId: userId }).populate("userId", "username");
    res.json(content);  // Send the content as response
});

// Route 5: Delete User Content
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

   
    //@ts-ignore
    await ContentModel.deleteMany({ contentId, userId: req.userId });
    res.json({ message: "Deleted" }); // Send success response.
});




app.listen(3000);
