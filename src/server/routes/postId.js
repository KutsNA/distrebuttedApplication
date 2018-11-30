const express = require('express');
const router = express.Router();
const getPostById = require('../MongoAPI/MongoDBApi');


router.get('/:id', async function(req, res) {
    const post = await getPostById(req.params.id);
    console.log(post);
    res.send(post);
    //res.send({"data": "You re trying to get a post by id!"});

});

module.exports = router;