import bcrypt from 'bcrypt';
import UserModel from '../repository/UserModel';
import Authentication from '../helpers/authentication';

const { generateToken } = Authentication;

class User {
  static async signup(req, res) {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
      const userInUse = await UserModel.checkExistingUser(email);
      if (userInUse) {
        return res.status(409).send({
          status: 'Fail',
          message: 'User already exist'
        });
      }
      const user = {
        username,
        email,
        password: hashedPassword
      }
      const userInfo = await UserModel.createUser(user);
      const userPayload = {
        id: userInfo.id,
        username: userInfo.username
      };
      const token = await generateToken(userPayload);
      return res.status(201).send({
        status: 'Success',
        message: 'User signed up successfully',
        token
      });
    } catch ({message}) {
      return res.status(500).send({
        status: 'Fail',
        message
      });
    }
  }

  static async signin(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.checkExistingUser(email);
    if (!user) {
      return res.status(400).send({
        status: 'Fail',
        message: 'email is incorrect'
      });
    }
    const comparePassword = bcrypt.compareSync(password, user.dataValues.password);
    if (!comparePassword) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Password is incorrect'
      });
    }
    const user_name = user.dataValues.username;
    return res.status(200).send({
      status: 'Success',
      message: `Welcome back, ${user_name}`
    });
  }
}

export default User;
