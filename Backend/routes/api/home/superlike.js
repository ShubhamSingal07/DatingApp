const route = require('express').Router()

const { userAuthViaToken } = require('../../auth')
const { increaseSuperlike } = require('../../../database')

route.post('/', userAuthViaToken, async (req, res) => {
    try {
        await increaseSuperlike(req.body.imageSuperliked, req.user.id)
        res.send({
            success: true,
            message: 'Image superliked'
        })
    } catch (err) {
        res.send({
            message: 'Could not superlike right now. Please try again later'
        })
    }
})

module.exports = route