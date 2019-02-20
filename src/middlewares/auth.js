import jwt from 'jsonwebtoken';

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
    const decodedId = parseInt(req.decoded.id, 10);
    const paramsId = parseInt(req.params.id, 10);
    if (decodedId === paramsId) {
      return next();
    }
    return res.status(403).json({
      status: 'Fail',
      message: 'You are not allowed to view this pagee',
    });
  }
}