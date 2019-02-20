import Model from '../db/models';

const { User } = Model;
class UserModel {
  static async checkExistingUser(email) {
    const foundUser = await User.findOne({
      where: { email }
    });
    return foundUser;
  }

  static async createUser(...user) {
    const newUser = User.create(...user);
    return newUser;
  }
}

export default UserModel;