const route = require('express').Router()

const { userAuthViaToken } = require('../../auth')
const { blockUser } = require('../../../database')

route.post('/', userAuthViaToken, async (req, res) => {
    try {
        await blockUser(req.user.id, req.body.blocked)
        res.send({
            success: true,
            message: 'Blocked the user'
        })
    } catch (err) {
        res.send({
            message: 'Could not block right now. Please try again later.'
        })
    }
})

module.exports = route