import express from 'express';
import cors from 'cors';
import { requestLogger } from './middleware/requestLogger.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import usersRouter from './routes/users.routes.js';
import serversRouter from './routes/servers.routes.js';
import channelsRouter from './routes/channels.routes.js';
import messagesRouter from './routes/messages.routes.js';

const app = express();

// Middleware globalne
app.use(requestLogger);
app.use(cors());
app.use(express.json());

// Endpoint kontrolny
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Trasy
app.use('/api/users', usersRouter);
app.use('/api/servers', serversRouter);
app.use('/api', channelsRouter);
app.use('/api', messagesRouter);

// Obsługa 404 i błędów - zawsze na końcu
app.use(notFound);
app.use(errorHandler);

export default app;
