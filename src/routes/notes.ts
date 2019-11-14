import { Router } from 'express'
import { list, create, read, update } from '../controllers/notes';

const noteRouter: Router = Router();

noteRouter.get('/', list);
noteRouter.get('/:id', read);
noteRouter.post('/', create);
noteRouter.put('/:id', update);

export { noteRouter };
