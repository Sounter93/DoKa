import { randomUUID } from 'node:crypto';

// Dane w pamięci - znikają po restarcie serwera (w etapie 4 zastąpi je SQLite)
export const db = {
  users: [],
  servers: [],
  channels: [],
  messages: [],
};

export const newId = () => randomUUID();

// Dane startowe, żeby od razu było co testować
function seed() {
  const karol = { id: newId(), username: 'karol', displayName: 'Karol', createdAt: new Date().toISOString() };
  const dominika = { id: newId(), username: 'dominika', displayName: 'Dominika', createdAt: new Date().toISOString() };
  db.users.push(karol, dominika);

  const server = { id: newId(), name: 'Projekt PB', ownerId: karol.id, createdAt: new Date().toISOString() };
  db.servers.push(server);

  const general = { id: newId(), serverId: server.id, name: 'ogolny', type: 'text', createdAt: new Date().toISOString() };
  const lobby = { id: newId(), serverId: server.id, name: 'lobby', type: 'voice', createdAt: new Date().toISOString() };
  db.channels.push(general, lobby);

  db.messages.push({
    id: newId(), channelId: general.id, authorId: dominika.id,
    content: 'Witajcie w DoKa!', createdAt: new Date().toISOString(), editedAt: null,
  });
}

seed();
