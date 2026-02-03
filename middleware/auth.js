import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => { 
    try {
        const token = req.headers.token;
        //If no token STOP execution
        if (!token) {
            return res.status(401).json({
                success: false, 
                message: "Not Authorized, Login again"
            });
        } 

        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken.id; // add user id to request
        next(); //go to the next route

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;
