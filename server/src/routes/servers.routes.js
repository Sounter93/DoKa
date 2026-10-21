import { Router } from 'express';
import {
  listServers, getServer, createServer, updateServer, deleteServer,
} from '../controllers/servers.controller.js';
import { validateBody } from '../middleware/validate.js';
import { createServerSchema, updateServerSchema } from '../validation/schemas.js';

const router = Router();

router.get('/', listServers);
router.get('/:id', getServer);
router.post('/', validateBody(createServerSchema), createServer);
router.patch('/:id', validateBody(updateServerSchema), updateServer);
router.delete('/:id', deleteServer);

export default router;
