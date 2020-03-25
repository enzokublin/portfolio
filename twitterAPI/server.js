const express = require("express");
const app = express();

const ca = require("chalk-animation");
const { getToken, getTweets, filterTweets } = require("./modules.js");

app.use(express.static("./ticker"));

app.get("/data.json", (req, res) => {
    getToken()
        .catch(err => {
            console.log("err in getToken in index.js", err);
            return;
        })
        .then(token => {
            getTweets(token)
                .then(resp => {
                    var filteredTweets = filterTweets(resp);
                    res.json(filteredTweets);
                })
                .catch(err => {
                    console.log("err in getToken in index.js", err);
                });
        });
}); // closes app.get

app.listen(8080, () => ca.rainbow("Glistening"));
