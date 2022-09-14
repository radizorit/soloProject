let MongoClient = require('mongodb').MongoClient;

let mongodb;

async function connect() {
    try {
        //Connecting mongo
        await MongoClient.connect(process.env.MONGO_URL, (err, db) => {
            if (err) {
                console.error('Something happening with adaptor', err)
            } else {
                mongodb = db;
            }
        },
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            function () { console.log('Connected to mongo') }())
    } catch (e) {
        console.error(e)
    }
}
function get() {
    return mongodb;
}

function close() {
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};