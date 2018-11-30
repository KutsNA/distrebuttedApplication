const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "MongoDB";

const client = new MongoClient(url);

client.connect(async function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const response = await findAllPosts(db, 'documents');
    createStackoverflowDump(db, "posts");
});


async function findAllPosts(db, collectionName) {
    return await db.collection(collectionName).find().toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
    });
    ;
};