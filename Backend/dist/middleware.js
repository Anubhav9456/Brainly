import { JWT_SECRET } from "./config.js";
import jwt from "jsonwebtoken";
export const userMiddleware = async (req, res, next) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header, JWT_SECRET);
    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id; // Store the decoded user ID for later use in request handling.
        next(); // Call the next middleware or route handler.
    }
    else {
        res.status(401).json({ message: "Unauthorized User" });
    }
};
//# sourceMappingURL=middleware.js.map