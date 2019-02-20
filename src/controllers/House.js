import HouseModel from '../repository/HouseModel';

class House {
  static async viewAll(req, res) {
    try {
      const availableHouses = await HouseModel.getAll()
      if (!availableHouses.length) {
        return res.status(404).send({
          status: 'Fail',
          message: 'There are no houses currently'
        });
      }
      return res.status(200).send({
        status: 'Success',
        message: 'Here are the available house(s)',
        availableHouses
      });
    } catch ({message}) {
      return res.status(500).send({
        status: 'Fail',
        message
      });
    }
  }

  static async viewOne(req, res) {
    try {
      const { id } = req.params;
      const availableHouse = await HouseModel.getOne(id)
      if (!availableHouse) {
        return res.status(400).send({
          status: 'Fail',
          message: 'House not found'
        });
      }
      return res.status(200).send({
        status: 'Success',
        message: 'House found successfully',
        availableHouse
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
      const {item_name, description, price, img_url } = req.body;
      const houseItem = {
        item_name,
        description,
        price,
        img_url
      }
      const newHouse = await HouseModel.create(houseItem);
      return res.status(201).send({
        status: 'Success',
        message: 'New house posted successfully',
        newHouse
      })
    } catch (message) {
      return res.status(500).send({
        status: 'Fail',
        message
      });
    }
  }

  static async edit(req, res) {
    try {
      const { id } = req.params;
      const {item_name, description, price, img_url } = req.body;
      const itemContainer = { item_name, description, price, img_url };
      const newHouse = await HouseModel.update(id, itemContainer);
      return res.status(200).send({
        status: 'Success',
        message: 'House details edited successfully',
        newHouse
      })
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
      const deletedHouse = await House.destroy(id);
      return res.status(200).send({
        status: 'Success',
        message: 'House details deleted successfully'
      })
    } catch (message) {
      return res.status(500).send({
        status: 'Fail',
        message
      });
    }
  }
}

export default House;