import express from 'express';
import HouseController from '../controllers/House';

const houseRouter = express.Router();
const { viewAll, viewOne, post, edit, remove } = HouseController;

houseRouter.get('/', viewAll);
houseRouter.get('/:id', viewOne);
houseRouter.post('/', post);
houseRouter.put('/:id', edit);
houseRouter.delete('/:id', remove);

export default houseRouter;
