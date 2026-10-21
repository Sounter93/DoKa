import { HttpError } from '../utils/HttpError.js';

// Sprawdza req.body schematem Zod; poprawne dane trafiają z powrotem do req.body
export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body ?? {});
  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return next(new HttpError(400, 'VALIDATION_ERROR', 'Niepoprawne dane', details));
  }
  req.body = result.data;
  next();
};
