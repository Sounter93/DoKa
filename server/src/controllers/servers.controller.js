import { db, newId } from '../data/store.js';
import { HttpError, notFoundError } from '../utils/HttpError.js';

export function findServerOr404(id) {
  const server = db.servers.find((s) => s.id === id);
  if (!server) throw notFoundError('Serwer');
  return server;
}

export function listServers(req, res) {
  res.json(db.servers);
}

export function getServer(req, res) {
  const server = findServerOr404(req.params.id);
  const channels = db.channels.filter((c) => c.serverId === server.id);
  res.json({ ...server, channels });
}

export function createServer(req, res) {
  const { name, ownerId } = req.body;
  if (!db.users.some((u) => u.id === ownerId)) {
    throw new HttpError(400, 'INVALID_OWNER', 'Właściciel nie istnieje');
  }
  const server = { id: newId(), name, ownerId, createdAt: new Date().toISOString() };
  db.servers.push(server);

  // Każdy nowy serwer dostaje domyślny kanał tekstowy
  db.channels.push({
    id: newId(), serverId: server.id, name: 'ogolny', type: 'text',
    createdAt: new Date().toISOString(),
  });
  res.status(201).json(server);
}

export function updateServer(req, res) {
  const server = findServerOr404(req.params.id);
  server.name = req.body.name;
  res.json(server);
}

export function deleteServer(req, res) {
  const server = findServerOr404(req.params.id);
  const channelIds = db.channels.filter((c) => c.serverId === server.id).map((c) => c.id);

  // Usuwamy kaskadowo: wiadomości -> kanały -> serwer
  db.messages = db.messages.filter((m) => !channelIds.includes(m.channelId));
  db.channels = db.channels.filter((c) => c.serverId !== server.id);
  db.servers = db.servers.filter((s) => s.id !== server.id);
  res.status(204).end();
}
