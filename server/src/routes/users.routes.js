import { Router } from 'express';
import { listUsers, getUser, createUser } from '../controllers/users.controller.js';
import { validateBody } from '../middleware/validate.js';
import { createUserSchema } from '../validation/schemas.js';

const router = Router();

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', validateBody(createUserSchema), createUser);

export default router;
