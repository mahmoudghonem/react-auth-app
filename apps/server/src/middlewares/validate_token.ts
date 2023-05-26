import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({
        message: 'Unauthorized'
    });
    try {
        const decoded = await jwt.verify(token, process.env['SECRET_KEY'] as string);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

}