
const Plant = require('../models/Plant')
const PlantInputs = require('../models/PlantInputs')

class PlantInputsController {
  async create(req, res) {
    const plantInputToCreate = { ...req.body, owner: req.userId }
    const plantInput = await PlantInputs.create(plantInputToCreate)
    return res.status(201).json({ plantInput })
  }

  async index(req, res) {
    const filters = {}
    filters.owner = req.userId
    req.query.title && (filters.title = new RegExp(req.query.title, 'i'))
    req.query.plant && (filters.plants = req.query.plant)

    const plantInputs = await PlantInputs.paginate(filters, {
      limit: +req.query.limit || 5,
      page: req.query.page || 1,
      sort: 'createdAt',
      populate: req.query.plant ? [] : ['plants']
    })

    return res.json({ plantInputs })
  }

  async show(req, res) {
    const plantInput = await PlantInputs
      .findById(req.params.id)
      .populate('plants')
    return res.json({ plantInput })
  }

  async update(req, res) {
    if (Object.keys(req.body).length === 0) {
      return res.status(406).json({ error: 'No data to be updated' })
    }
    const { _doc: plantInputs } = await PlantInputs.findById(req.params.id)

    const plantInputsForm = req.body

    plantInputs.title = plantInputsForm.title || plantInputs.title

    plantInputsForm.plants && (plantInputs.plants = plantInputsForm.plants)

    plantInputsForm.description && (plantInputs.description = plantInputsForm.description)

    const plantInputUpdated = await PlantInputs.findOneAndUpdate(
      req.params.id,
      plantInputsForm,
      { new: true }
    )
    return res.json({ plantInput: plantInputUpdated })
  }

  async delete(req, res) {
    await PlantInputs.findByIdAndDelete(req.params.id)
    return res.send()
  }
}

module.exports = new PlantInputsController()
