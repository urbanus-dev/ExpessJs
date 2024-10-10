import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

const validateEvent: RequestHandler[] = [
    body('Company').notEmpty().withMessage('Company is required').isString().withMessage('Company must be a string').
    isLength({ min: 3 }).withMessage('Company must be at least 3 characters long'),
    body('Date').notEmpty().withMessage('Date is required'),
    body('Location').notEmpty().withMessage('Location is required'),
    body('Price').notEmpty().withMessage('Price is required'),
    body('Title').notEmpty().withMessage('Title is required'),
    body('imageUrl').notEmpty().withMessage('Image URL is required'),
    (req: Request, response: Response, next: NextFunction): void | Promise<void> => {   
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            response.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
];

export { validateEvent };