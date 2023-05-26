import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

export const expressValidator = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(
            validations.map((validation: any) => validation.run(req))
        );

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        return res.status(400).json({ message: 'Validation Errors', errors: errors.array() });
    };
};