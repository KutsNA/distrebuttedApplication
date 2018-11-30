const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = "MongoDB";
const client = new MongoClient(url);

async function getPostById(postId) {
    if (postId) {
        return new Promise((resolve, reject) => {
            client.connect(async (err, db) => {
                assert.equal(err, null);
                console.log("Connected successfully to server");
                db = client.db(dbName);

                let post = await findPost(db, postId);
                resolve(post);
            }, () => {
                client.close();
            });
        });
    }
};

var findPost = async (db, postId) => {
    const collection = db.collection("posts");
    const response = await collection.find({ Id: postId }).toArray();
    return response;
};

module.exports = getPostById;