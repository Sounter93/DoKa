// Własna klasa błędu: niesie kod HTTP i kod błędu dla klienta
export class HttpError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const notFoundError = (what) =>
  new HttpError(404, 'NOT_FOUND', `${what} nie istnieje`);
