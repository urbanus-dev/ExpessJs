import { NextFunction, Response, Request } from "express";

interface CustomError extends Error {
    status?: number; 
}

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => { 
    const statusCode = error.status || 500;
    const errorMessage = error.message || "Internal server error";
    res.status(statusCode).json({
        status: statusCode,
        message: errorMessage
    });
};

export { errorHandler, CustomError };