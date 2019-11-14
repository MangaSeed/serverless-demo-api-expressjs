import { Router } from 'express'
import { list, create, read } from '../controllers/notes';

const noteRouter: Router = Router();

noteRouter.get('/', list);
noteRouter.get('/:id', read);
noteRouter.post('/', create);

export { noteRouter };
