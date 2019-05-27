const uuidv4 = require('uuid/v4')

const {
    MongoClient,
    url,
    datedbname,
    date
} = require('./mongo')

const addUser = async (username, password, image) => {
    try {

        const user = await fetchUserByUsername(username)
        if (!user) {
            const client = await MongoClient.connect(url)
            const datedb = client.db(datedbname)
            const users = datedb.collection(date)
            const id = uuidv4()

            const userArr = (await users.insertOne({
                id,
                username,
                password,
                image,
                likedby: [],
                superlikedby: [],
                likes: 0,
                superlikes: 0,
                blocked: []
            })).ops[0]

            const userObj = {
                username: userArr.username,
                image:userArr.image,
                id: userArr.id
            }

            client.close()
            return userObj

        } else {
            throw new Error('Username already exists')
        }
    } catch (err) {
        throw err
    }
}

const fetchUserByUsername = async (username) => {
    try {
        const client = await MongoClient.connect(url)
        const datedb = client.db(datedbname)
        const users = datedb.collection(date)
        const userArr = await users.findOne({
            username
        })
        if (!userArr) {
            return null
        }

        const userObj = {
            id: userArr.id,
            username: userArr.username,
            password: userArr.password,
            image: userArr.image
        }

        client.close()
        return userObj

    } catch (err) {
        return err
    }
}

const fetchUserByUserid = async (userid) => {
    try {
        const client = await MongoClient.connect(url)
        const datedb = client.db(datedbname)
        const users = datedb.collection(date)

        const userArr = await users.findOne({
            id: userid
        })

        const userObj = {
            id: userArr.id,
            username: userArr.username,
        }

        client.close()
        return userObj

    } catch (err) {
        throw err
    }
}

const fetchUsers = async userid => {

    try {
        const client = await MongoClient.connect(url)
        const datedb = client.db(datedbname)
        const users = datedb.collection(date)

        const userObj = await users.findOne({
            id: userid
        })
        const blocked = userObj.blocked
        const usersArr = await users.find({
            id: {
                $nin: [userid, ...blocked]
            }
        }).toArray()
        const newUsersArr = usersArr.map(user => {
            delete user.password
            return user
        })
        client.close()
        return newUsersArr

    } catch (err) {
        throw err
    }

}

module.exports = {
    addUser,
    fetchUserByUsername,
    fetchUserByUserid,
    fetchUsers
}