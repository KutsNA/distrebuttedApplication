const express = require('express');
const router = express.Router();

router.get('/:body', function (req, res) {
    //console.log('You re trying to get a tweet');
    //return 'You re trying to get a tweet';
    res.send({"data": "You re trying to get a post"});
});

module.exports = router;