const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const datedbname = 'datedb'
const date = 'date'

module.exports = {
    MongoClient,
    url,
    datedbname,
    date
}