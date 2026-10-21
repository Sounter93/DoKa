import { HttpError } from '../utils/HttpError.js';

export function notFound(req, res, next) {
  next(new HttpError(404, 'ROUTE_NOT_FOUND', `Brak trasy ${req.method} ${req.originalUrl}`));
}
