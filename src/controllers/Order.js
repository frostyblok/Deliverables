import orderModel from '../repository/orderModel';
import OrderModel from '../repository/orderModel';
import user from '../db/models/user';

class Order {
  static async viewAll(req, res) {
    try {
      const availableOrders = await orderModel.getAll()
      if (!availableOrders.length) {
        return res.status(404).send({
          status: 'Fail',
          message: 'There are no orders currently'
        });
      }
      return res.status(200).send({
        status: 'Success',
        message: 'Here are the available order(s)',
        availableOrders
      });
    } catch ({message}) {
      return res.status(500).send({
        status: 'Fail',
        message
      });
    }
  }

  static async viewOrderHistory(req, res) {
    const { id: user_id} = req.decoded;
    try {
      const orderHistory = await OrderModel.getAllUsersOrders(user_id);
      return res.status(200).send({
        status: 'Success',
        message: 'Here are all your orders history',
        orderHistory
      });
    } catch ({ message }) {
      return res.status(500).send({
        status: 'Fails',
        message
      });
    }
  }

  static async viewOne(req, res) {
    try {
      const { id } = req.params;
      const availableOrder = await orderModel.getOne(id)
      if (!availableOrder) {
        return res.status(400).send({
          status: 'Fail',
          message: 'Order not found'
        });
      }
      return res.status(200).send({
        status: 'Success',
        message: 'Order found successfully',
        availableOrder
      });
    } catch (message) {
      return res.status(500).send({
        status: 'Fail',
        message
      });
    }
  }

  static async post(req, res) {
    try {
      const {item_name, item_id } = req.body;
      const { id: user_id} = req.decoded;
      const orderItem = {
        item_name,
        user_id,
        item_id
      };
      const newOrder = await orderModel.create(orderItem);
      return res.status(201).send({
        status: 'Success',
        message: 'New Order posted successfully',
        newOrder
      });
    } catch (message) {
      return res.status(500).send({
        status: 'Fail',
        message
      });
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.params;
      await OrderModel.delete(id);
      return res.status(200).send({
        status: 'Success',
        message: 'Order details deleted successfully'
      })
    } catch (message) {
      return res.status(500).send({
        status: 'Fail',
        message
      });
    }
  }
}

export default Order;