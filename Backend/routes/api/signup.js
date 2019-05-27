const route = require('express').Router()

const { createUser } = require('../../controllers/user')

route.get('/', (req, res) => {
    res.send({
        signupPage: true
    })
})

route.post('/', async (req, res) => {

    try {
        const user = await createUser(req.body.username, req.body.password,req.body.image)
        res.send({
            user,
            success: true
        })
    } catch (err) {
        res.send({
            exist: true,
            errors: 'Username already exists'
        })
    }

})

module.exports = route