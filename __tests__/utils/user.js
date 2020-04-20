const faker = require('faker')

class UserUtils {
    generateUser() {
        return {
            email: faker.internet.email(),
            name: `${ faker.name.firstName() } ${ faker.name.lastName() }`,
            password: faker.internet.password(),
            username: faker.internet.userName()
        }
    }
}

module.exports = new UserUtils()
