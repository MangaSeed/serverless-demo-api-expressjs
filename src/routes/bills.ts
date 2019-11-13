import { Router } from 'express'
import { create } from '../controllers/bills';

const billsRouter: Router = Router();

billsRouter.post('/', create);

export { billsRouter };
