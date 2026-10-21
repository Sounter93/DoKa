import { Router } from 'express';
import {
  listChannels, createChannel, updateChannel, deleteChannel,
} from '../controllers/channels.controller.js';
import { validateBody } from '../middleware/validate.js';
import { createChannelSchema, updateChannelSchema } from '../validation/schemas.js';

const router = Router();

router.get('/servers/:serverId/channels', listChannels);
router.post('/servers/:serverId/channels', validateBody(createChannelSchema), createChannel);
router.patch('/channels/:id', validateBody(updateChannelSchema), updateChannel);
router.delete('/channels/:id', deleteChannel);

export default router;
