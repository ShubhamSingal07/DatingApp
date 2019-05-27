const { fetchUserByUsername, addUser } = require('../database')
const { createJWT } = require('../utils/jwt')

const verifyUser = async (username, password) => {
    try {
        const user = await fetchUserByUsername(username)
        if (!user) {
            throw new Error("Invalid Username")
        }
        if (user.password !== password) {
            throw new Error("Invalid Password")
        }
        delete user.password
        return user

    } catch (err) {
        throw new Error("Could not connect to database")
    }

}

const createUser = async (username, password, image) => {

    const user = await addUser(username, password, image)
    if (!user) throw new Error("Error creating user")
    else {
        const token = createJWT(user)
        user.token = token
        return user
    }

}

module.exports = {
    verifyUser,
    createUser
}