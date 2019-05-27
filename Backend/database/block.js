const {
    MongoClient,
    url,
    datedbname,
    date
} = require('../database/mongo')

const blockUser = async (userid, blocked) => {

    try {

        const client = await MongoClient.connect(url)
        const datedb = client.db(datedbname)
        const block = datedb.collection(date)

        const blockObj = await block.updateOne(
            {
                id: userid
            },
            {
                $push: {
                    "blocked": blocked
                }
            }
        )
        await block.updateOne(
            {
                id: blocked
            },
            {
                $push: {
                    "blocked": userid
                }
            }
        )
        client.close()
        return blockObj

    } catch (err) {
        throw err
    }

}

module.exports = {
    blockUser
}