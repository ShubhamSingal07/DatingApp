const {
    MongoClient,
    url,
    datedbname,
    date
} = require('./mongo')

const increaseSuperlike = async (userid, superlikedby) => {
    try {
        const client = await MongoClient.connect(url)
        const datedb = client.db(datedbname)
        const likes = datedb.collection(date)

        const likesObj = await likes.updateOne(
            {
                id: userid
            }, {
                $inc: {
                    "superlikes": 1
                },
                $push: {
                    "superlikedby": superlikedby
                }
            }
        )
        client.close()
        return likesObj
    } catch (err) {
        throw err
    }

}

module.exports = {
    increaseSuperlike
}