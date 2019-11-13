import { Router } from 'express'
import { list, create, read, update, destroy } from '../controllers/notes';

const notesRouter: Router = Router();

notesRouter.get('/', list);
notesRouter.get('/:id', read);
notesRouter.post('/', create);
notesRouter.put('/:id', update);
notesRouter.delete('/:id', destroy);

export { notesRouter };
