const express = require('express');

const port = process.env.PORT || 9000;
const app = express();
const cors = require('cors');
const compression = require('compression');

const postBodyRouter = require('./routes/postBody');
const postIdRouter = require('./routes/postId');

app.use(cors());
app.use(compression());

app.get('/*', (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=10, s-maxage=10');
    next();
});

console.log('Server started on ', port);

app.use('/postbody', postBodyRouter);
app.use('/postid', postIdRouter);

app.listen(port);