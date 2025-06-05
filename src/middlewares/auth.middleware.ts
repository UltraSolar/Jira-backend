import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    try{
        const token = authHeader?.split(' ')[1];
        const payload = verifyToken(token);
        // const {id, email } = payload;
        // req.user = payload;
        next();
    } catch(error) {
        res.status(401).json({message: "Invalid token"})
        return;
    }
}