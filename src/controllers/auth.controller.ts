import { Request, Response } from "express";
import {AuthService} from "../services/auth.service";

export const loginHandler = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        if(!result){
            res.status(401).json({message: "Invalid credentials"});
            return;
        }
        res.json(result);
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
        return;
    }
}

export const registerHandler = async (req: Request, res: Response) => {
    try{
        const result = await AuthService.register(req.body);
        if(!result) res.status(400).json({message: "Cannot register this user"});
        res.status(201).json(result);
        return;
    } catch (error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
        return;
    }
}