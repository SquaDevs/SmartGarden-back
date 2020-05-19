const Plant = require('../models/Plant')
class PlantsController {
  async create(req, res) {
    const plantToCreate = { ...req.body }
    plantToCreate.location.type = 'Point'
    const plant = await Plant.create({ ...plantToCreate, owner: req.userId })
    return res.status(201).json({ plant })
  }

  async update(req, res) {
    const { title, description, location } = req.body

    if (!(title || description || location)) {
      return res.status(406).json({ error: 'No data to be updated' })
    }

    const plant = await Plant.findById(req.params.id)

    const plantWdata = { ...plant._doc }

    plantWdata.title = title || plantWdata.title
    plantWdata.description = description || plantWdata.description
    plantWdata.location.coordinates =
      location.coordinates || plantWdata.location.coordinates

    // delete plantWdata._id;
    const plantUpdated = await Plant.findOneAndUpdate(
      req.params.id,
      plantWdata,
      { new: true }
    )

    return res.json({ plant: plantUpdated })
  }

  async index(req, res) {
    const filters = {}

    filters.owner = req.userId
    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }

    const plants = await Plant.paginate(filters, {
      limit: 5,
      page: req.query.page || 1,
      sort: 'createdAt',
      populate: ['owner']
    })

    return res.json({ plants })
  }

  async show(req, res, next) {
    if (req.params.id === 'photo') return next()
    const plant = await Plant.findById(req.params.id)
    return res.json({ plant })
  }

  async delete(req, res) {
    await Plant.findByIdAndDelete(req.params.id)
    return res.send()
  }
}

module.exports = new PlantsController()
