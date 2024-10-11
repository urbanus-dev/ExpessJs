import { body, validationResult, checkSchema } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { DateValidationSchema } from "../SchemaValidations/dateValidation";

const validateEvent: RequestHandler[] = [
    (req: Request, res: Response, next: NextFunction): void | Promise<void> => {
        checkSchema(DateValidationSchema).run(req).then(() => next()).catch(next);
    },
    body('Company').notEmpty().withMessage('Company is required'),
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