import Model from '../db/models';

const { House } = Model;
class HouseModel {
  static async getAll() {
    const allHouses = await House.findAll();
    return allHouses;
  }
  static async getOne(id) {
    const oneHouse = await House.findOne({
      where: { id }
    });
    return oneHouse;
  }

  static async create(...item) {
    const newHouse = await House.create(...item);
    return newHouse;
  }

  static async update(id, item) {
    const updatedItem = {};
    const { item_name, description, price, img_url } = item;
    if (item_name) {
      updatedItem.item_name = item_name
    }
    if (description) {
      updatedItem.description = description
    }
    if (price) {
      updatedItem.price = price
    }
    if (img_url) {
      updatedItem.img_url = img_url
    }
    const updatedHouse = await House.update(updatedItem, {
      where: { id }
    });
    return updatedHouse;
  }

  static async delete(id) {
    const deletedItem = await House.destroy({
      where: { id }
    });
    if (deletedItem) {
      return 'Item deleted';
    }
  }
}

export default HouseModel;