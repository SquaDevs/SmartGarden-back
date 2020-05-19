const { readFileSync, unlinkSync } = require('fs')
const PlantPhoto = require('../models/PlantPhoto')

const allowedTypes = ['base64']
class PlantPhotoController {
  async create(req, res) {
    const img = readFileSync(req.file.path).toString('base64')

    const plantPhoto = await PlantPhoto.create({
      plant: req.body.plant,
      owner: req.userId,
      photo: Buffer.from(img, 'base64'),
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    })
    unlinkSync(req.file.path)

    return res.json({ plantPhoto })
  }

  async index(req, res) {
    const filters = {}

    filters.owner = req.userId
    const plantPhotos = await PlantPhoto.paginate(filters, {
      limit: 5,
      page: req.query.page || 1,
      sort: 'createdAt',
      populate: [{
        path: 'owner',
        select: ['name', 'username']
      }]
      // select: ['owner name']
    })

    switch (req.query.type) {
      case 'base64': {
        plantPhotos.docs = plantPhotos.docs.map(plantPhoto => {
          const base = {
            img: Buffer.from(plantPhoto.photo).toString('base64'),
            type: plantPhoto.type,
            name: plantPhoto.name
          }
          return base
        })
        return res.status(200).json({ plantPhotos })
      }
      default:
        return res.json({ plantPhotos })
    }
  }

  async show(req, res) {
    const plantPhoto = await PlantPhoto.findById(req.params.id)
    if (!plantPhoto) return res.status(404).send()

    switch (req.query.type) {
      case 'base64':
        return res.status(200).json({
          img: Buffer.from(plantPhoto.photo).toString('base64'),
          type: plantPhoto.type,
          name: plantPhoto.name
        })
      default:
        res.contentType(plantPhoto.type)
        return res.send(plantPhoto.photo)
    }
  }

  async update(req, res) { }
  async delete(req, res) {
    await PlantPhoto.findByIdAndDelete(req.params.id)
    return res.send()
  }
}

module.exports = new PlantPhotoController()
