import { Router } from 'express'
import { list } from '../controllers/notes';
import { create } from '../controllers/notes';
const noteRouter: Router = Router();

noteRouter.get('/', list);
noteRouter.post('/', create);

export { noteRouter };
