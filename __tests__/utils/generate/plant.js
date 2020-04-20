
const faker = require('faker')

class Plant {
  generatePlant() {
    return {
      title: faker.name.title(),
      description: faker.lorem.lines()

    }
  }
}

module.exports = new Plant()
