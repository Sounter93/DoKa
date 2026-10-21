import { HttpError } from '../utils/HttpError.js';

// Jedno miejsce, które zamienia każdy błąd na odpowiedź JSON
export function errorHandler(err, req, res, next) {
  // Niepoprawny JSON w body (błąd z express.json())
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: { code: 'INVALID_JSON', message: 'Body nie jest poprawnym JSON-em' },
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: { code: err.code, message: err.message, details: err.details },
    });
  }

  console.error(err);
  res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'Wewnętrzny błąd serwera' },
  });
}
