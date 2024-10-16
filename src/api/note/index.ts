import { Router } from 'express';

import { isAuthenticated } from '../../auth/auth.controller';
import {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getOneNoteHandler,
  updateNoteHandler,
} from './note.controller';

const router = Router();

router.get('/', getAllNotesHandler);
router.get('/:id', getOneNoteHandler);
router.delete('/:id', isAuthenticated, deleteNoteHandler);
router.post('/', createNoteHandler);
router.patch('/:id', updateNoteHandler);

export default router;
