import { Router } from 'express';

import { hasRole, isAuthenticated } from '@auth/auth.controller';
import {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getOneNoteHandler,
  updateNoteHandler,
} from './note.controller';

const router = Router();

router.get('/', hasRole(['ADMIN']), getAllNotesHandler);
router.get('/:id', getOneNoteHandler);
router.delete('/:id', hasRole(['ADMIN']), deleteNoteHandler);
router.post('/', createNoteHandler);
router.patch('/:id',  updateNoteHandler);

export default router;
