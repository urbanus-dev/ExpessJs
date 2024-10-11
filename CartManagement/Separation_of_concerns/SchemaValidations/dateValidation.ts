import { Schema } from 'express-validator';

export const DateValidationSchema: Schema = {
    Date: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Date is required'
        },
        isDate: {
            errorMessage: 'Invalid date format ,Please use YYYY-MM-DD'
        }
    }
};