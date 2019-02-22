import express from 'express';
import orderController from '../controllers/Order';
import Auth from '../middlewares/auth';

const orderRouter = express.Router();
const { viewAll, viewOrderHistory, viewOne, post, remove } = orderController;
const { verifyUser, checkUser, confirmUser } = Auth;

orderRouter.get('/', viewAll);
orderRouter.get('/users/:id', verifyUser, confirmUser, viewOrderHistory);
orderRouter.get('/:id', viewOne);
orderRouter.post('/', verifyUser, post);
orderRouter.delete('/:id', verifyUser, checkUser, remove);

export default orderRouter;
