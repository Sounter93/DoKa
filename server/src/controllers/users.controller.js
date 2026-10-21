import { db, newId } from '../data/store.js';
import { HttpError, notFoundError } from '../utils/HttpError.js';

export function listUsers(req, res) {
  res.json(db.users);
}

export function getUser(req, res) {
  const user = db.users.find((u) => u.id === req.params.id);
  if (!user) throw notFoundError('Użytkownik');
  res.json(user);
}

export function createUser(req, res) {
  const { username, displayName } = req.body;
  if (db.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    throw new HttpError(409, 'USERNAME_TAKEN', 'Ta nazwa użytkownika jest zajęta');
  }
  const user = {
    id: newId(),
    username,
    displayName: displayName ?? username,
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  res.status(201).json(user);
}
