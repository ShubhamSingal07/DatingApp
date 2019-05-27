const route=require('express').Router()

route.use('/login',require('./login'))
route.use('/signup',require('./signup'))
route.use('/home',require('./home'))
route.use('/like',require('./home/like'))
route.use('/superlike',require('./home/superlike'))
route.use('/block',require('./home/block'))

module.exports=route