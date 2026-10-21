import { Router } from 'express';
import {
  listMessages, createMessage, updateMessage, deleteMessage,
} from '../controllers/messages.controller.js';
import { validateBody } from '../middleware/validate.js';
import { createMessageSchema, updateMessageSchema } from '../validation/schemas.js';

const router = Router();

router.get('/channels/:channelId/messages', listMessages);
router.post('/channels/:channelId/messages', validateBody(createMessageSchema), createMessage);
router.patch('/messages/:id', validateBody(updateMessageSchema), updateMessage);
router.delete('/messages/:id', deleteMessage);

export default router;
