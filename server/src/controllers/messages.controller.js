import { db, newId } from '../data/store.js';
import { HttpError, notFoundError } from '../utils/HttpError.js';
import { findChannelOr404 } from './channels.controller.js';

function findMessageOr404(id) {
  const message = db.messages.find((m) => m.id === id);
  if (!message) throw notFoundError('Wiadomość');
  return message;
}

// GET /api/channels/:channelId/messages?limit=20&q=tekst
export function listMessages(req, res) {
  const channel = findChannelOr404(req.params.channelId);
  const limit = Math.min(Number(req.query.limit) || 50, 100);
  const q = req.query.q?.toLowerCase();

  let messages = db.messages.filter((m) => m.channelId === channel.id);
  if (q) messages = messages.filter((m) => m.content.toLowerCase().includes(q));

  // Najnowsze na końcu, zwracamy ostatnie `limit` wiadomości
  messages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  res.json(messages.slice(-limit));
}

export function createMessage(req, res) {
  const channel = findChannelOr404(req.params.channelId);
  if (channel.type !== 'text') {
    throw new HttpError(400, 'NOT_TEXT_CHANNEL', 'Wiadomości można pisać tylko w kanale tekstowym');
  }
  const { authorId, content } = req.body;
  if (!db.users.some((u) => u.id === authorId)) {
    throw new HttpError(400, 'INVALID_AUTHOR', 'Autor nie istnieje');
  }
  const message = {
    id: newId(), channelId: channel.id, authorId, content,
    createdAt: new Date().toISOString(), editedAt: null,
  };
  db.messages.push(message);
  res.status(201).json(message);
}

export function updateMessage(req, res) {
  const message = findMessageOr404(req.params.id);
  message.content = req.body.content;
  message.editedAt = new Date().toISOString();
  res.json(message);
}

export function deleteMessage(req, res) {
  findMessageOr404(req.params.id);
  db.messages = db.messages.filter((m) => m.id !== req.params.id);
  res.status(204).end();
}
