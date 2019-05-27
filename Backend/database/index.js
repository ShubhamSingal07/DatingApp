const { blockUser, unblockUser } = require('./block')
const { increaseLike } = require('./likes')
const { increaseSuperlike } = require('./superlikes')
const { addUser, fetchUserByUserid, fetchUserByUsername, fetchUsers } = require('./users')

module.exports = {
    blockUser,
    increaseLike,
    increaseSuperlike,
    addUser,
    fetchUserByUserid,
    fetchUserByUsername,
    fetchUsers
}