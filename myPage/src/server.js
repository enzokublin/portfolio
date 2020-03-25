const express = require('express');
const cors = require('cors')
const app = express();
// const db = require("./src/db");
const server = require("http").Server(app);
const bodyParser = require('body-parser');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post('/blogPost', cors(), function (req, res) {
    // console.log(req.body);
    let author = req.body.author;
    let blogTitle = req.body.blogTitle;
    let contentText = req.body.contentText;
    res.send(author, contentText, blogTitle);
});

server.listen(8080, function () {
    console.log("I'm listening.");
});
