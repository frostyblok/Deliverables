import Model from '../db/models';
import User from '../controllers/User';

const { Order } = Model;

class OrderModel {
  static async getAll() {
    const allOrders = await Order.findAll();
    return allOrders;
  }

  static async getOne(id) {
    const oneOrder = await Order.findOne({
      where: {
        id
      },
      include: [
        {
          association: 'user',
          attributes: ['username', 'email']
        }
      ]
    });
    return oneOrder;
  }

  static async getAllUsersOrders(user_id) {
    const allUserOrders = await Order.findAll({
      where: {
        user_id
      }
    });
    return allUserOrders;
  }

  static async create(...order) {
    const newOrder = await Order.create(...order);
    return newOrder;
  }

  static async delete(id) {
    const deletedOrder = await Order.destroy({
      where: { id }
    });
    if (deletedOrder) {
      return 'Order deleted';
    }
  }
}

export default OrderModel;
