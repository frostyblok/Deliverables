import jwt from 'jsonwebtoken';
import Model from '../db/models';

const { Order} = Model;

class Auth {
  static async verifyUser(req, res, next) {
    const token = req.headers.authorization || req.body.token;
    if (!token) {
      return res.status(403).send({
        status: 'Fail',
        message: 'No token, please log in'
      });
    }
    return jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        if (error.message.includes('signature')) {
          return res.status(401).send({
            status: 'Fail',
            message: 'Your input is not a JWT token'
          });
        }
        return res.status(401).send({
          status: 'Fail',
          message: 'Token provided is invalid or has expired'
        });
      }
      req.decoded = decoded;
      return next();
    });
  }

  static async checkUser(req, res, next) {
    const { id } = req.params;
    const foundOrder = await Order.findOne({
      where: { id }
    });
    if (!foundOrder) {
      return res.status(404).send({
        status: 'Fail',
        message: 'No order with that Id found'
      });
    }
    const { user_id } = foundOrder.dataValues;
    const decodedId = parseInt(req.decoded.id, 10);
    if (decodedId === user_id) {
      return next();
    }
    return res.status(403).json({
      status: 'Fail',
      message: 'You are not allowed to view this page',
    });
  }

  static async confirmUser(req, res, next) {
    const { id: user_id } = req.params;
    const { id: decodedId } = req.decoded;
    if (decodedId == user_id) {
      return next();
    }
    return res.status(403).json({
      status: 'Fail',
      message: 'You are not allowed to view this page',
    });
  }
}

export default Auth;
