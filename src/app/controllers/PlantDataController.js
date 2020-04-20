const Plant = require("./../models/Plant");
const PlantData = require("./../models/PlantData");

class PlantDataController {
  async create(req, res) {
    const { token } = req.params;

    let plant = await Plant.findOne({ token });

    if (!plant) {
      return res.status(401).send();
    }
    if (!req.body) throw new Error("You Canno't insert a plant data without   any data")

    let plantData = await PlantData.create({ ...req.body, plant: plant._id });

    return res.json({ plantData });
  }
  // async update(req, res) {} ->Cannot Update Plant Data
  // async delete(req, res) {} ->Cannot Delet Plant Data

  async show(req, res) {
    const { populate } = req.query;

    const plantData = await PlantData.findById(req.params.idData).populate(
      populate !== undefined ? "plant" : ""
    );

    return res.json({ plantData });
  }
  async index(req, res) {
    const filters = {};

    req.params.idPlant !== undefined
      ? (filters.plant = req.params.idPlant)
      : "";

    // temperature filter
    if (req.query.temp_min || req.query.temp_max) {
      filters.temperature = {};
      if (req.query.temp_min) {
        filters.temperature.$gte = req.query.temp_min;
      }
      if (req.query.temp_max) {
        filters.temperature.$lte = req.query.temp_max;
      }
    }
    // airHumidity filter
    if (req.query.airHumidity_min || req.query.airHumidity_max) {
      filters.airHumidity = {};
      if (req.query.airHumidity_min) {
        filters.airHumidity.$gte = req.query.airHumidity_min;
      }
      if (req.query.airHumidity_max) {
        filters.airHumidity.$lte = req.query.airHumidity_max;
      }
    }
    // groundHumidity filter
    if (req.query.groundHumidity_min || req.query.groundHumidity_max) {
      filters.groundHumidity = {};
      if (req.query.groundHumidity_min) {
        filters.groundHumidity.$gte = req.query.groundHumidity_min;
      }
      if (req.query.groundHumidity_max) {
        filters.groundHumidity.$lte = req.query.groundHumidity_max;
      }
    }

    const plantData = await PlantData.paginate(filters, {
      limit: 20,
      page: req.query.page || 1,
      sort: "createdAt"
      // populate: ["plant"]
    });

    return res.json({ plantData });
  }
}

module.exports = new PlantDataController();
