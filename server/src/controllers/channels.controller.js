import { db, newId } from '../data/store.js';
import { HttpError, notFoundError } from '../utils/HttpError.js';
import { findServerOr404 } from './servers.controller.js';

export function findChannelOr404(id) {
  const channel = db.channels.find((c) => c.id === id);
  if (!channel) throw notFoundError('Kanał');
  return channel;
}

export function listChannels(req, res) {
  const server = findServerOr404(req.params.serverId);
  let channels = db.channels.filter((c) => c.serverId === server.id);
  if (req.query.type) channels = channels.filter((c) => c.type === req.query.type);
  res.json(channels);
}

export function createChannel(req, res) {
  const server = findServerOr404(req.params.serverId);
  const { name, type } = req.body;
  if (db.channels.some((c) => c.serverId === server.id && c.name === name && c.type === type)) {
    throw new HttpError(409, 'CHANNEL_EXISTS', 'Kanał o tej nazwie już istnieje');
  }
  const channel = { id: newId(), serverId: server.id, name, type, createdAt: new Date().toISOString() };
  db.channels.push(channel);
  res.status(201).json(channel);
}

export function updateChannel(req, res) {
  const channel = findChannelOr404(req.params.id);
  if (req.body.name) channel.name = req.body.name;
  res.json(channel);
}

export function deleteChannel(req, res) {
  const channel = findChannelOr404(req.params.id);
  db.messages = db.messages.filter((m) => m.channelId !== channel.id);
  db.channels = db.channels.filter((c) => c.id !== channel.id);
  res.status(204).end();
}
