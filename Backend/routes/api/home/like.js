const route = require('express').Router()

const { increaseLike } = require('../../../database')
const { userAuthViaToken } = require('../../auth')

route.post('/', userAuthViaToken, async (req, res) => {
    try {
        await increaseLike(req.body.imageLiked, req.user.id)
        res.send({
            success: true,
            message: 'Image liked'
        })
    } catch (err) {
        res.send({
            message: 'Could not like right now'
        })
    }
})

module.exports = route
