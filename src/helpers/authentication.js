import jwt from 'jsonwebtoken';

class Authentication {
  static async generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hr' });
    return token;
  }
}

export default Authentication;
