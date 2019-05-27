const route = require('express').Router()

const { userAuthViaToken } = require('../../auth')
const { fetchUsers } = require('../../../database')

route.get('/', userAuthViaToken, async (req, res) => {
    res.send({
        user: req.user,
        success: true
    })
})

route.post('/', userAuthViaToken, async (req, res) => {

    const users = await fetchUsers(req.user.id)
    res.send({
        success: true,
        users
    })

})

module.exports = route