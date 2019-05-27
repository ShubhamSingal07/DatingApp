const {
    MongoClient,
    url,
    datedbname,
    date
} = require('./mongo')

const increaseLike = async (userid, likedby) => {
    try {
        const client = await MongoClient.connect(url)
        const datedb = client.db(datedbname)
        const likes = datedb.collection(date)
        const likesObj = await likes.updateOne(
            {
                id: userid
            }, {
                $inc: {
                    "likes": 1
                },
                $push: {
                    "likedby":likedby
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
    increaseLike
}