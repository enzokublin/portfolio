var https = require("https");
const { consumerKey, consumerSecret } = require("./secrets.json");

// #############################################################################
// #############################################################################
// #############################################################################

module.exports.getToken = function getToken() {
    // console.log("getToken running!");
    return new Promise(function(resolve, reject) {
        let creds = `${consumerKey}:${consumerSecret}`;
        let encodedCreds = new Buffer(creds).toString("base64");
        // console.log(encodedCreds);
        // console.log("creds: ", creds);
        const options = {
            host: "api.twitter.com",
            path: "/oauth2/token",
            method: "POST",
            headers: {
                Authorization: `Basic ${encodedCreds}`,
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8."
            }
        };

        var callback = function(res) {
            if (res.statusCode != 200) {
                reject(new Error(res.statusCode));
                return;
            }

            var str = "";

            res.on("data", function(chunk) {
                str += chunk;
            });

            res.on("end", function() {
                let parsedObj = JSON.parse(str);
                console.log(parsedObj);
                let bearerToken = parsedObj.access_token;
                // console.log("bearerToken: ", bearerToken);
                resolve(bearerToken);
            });
        };

        //configuring the request
        const req = https.request(options, callback);

        // writing a body
        req.write("grant_type=client_credentials");

        // sends the request to twitter
        req.end();
    });
};

// #############################################################################
// #############################################################################
// #############################################################################

module.exports.getTweets = function getTweets(token) {
    return new Promise(function(resolve, reject) {
        // console.log("getTweets token: ", token);
        // this function will make https req to twitter
        // to get tweets from twitter

        var options = {
            host: "api.twitter.com",
            method: "GET",
            path:
                "/1.1/statuses/user_timeline.json?screen_name=BgTr_IPACBC&count=10",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        var callback = function(res) {
            if (res.statusCode != 200) {
                reject(new Error(res.statusCode));
                return;
            }

            var str = "";
            res.on("data", function(chunk) {
                str += chunk;
            });

            res.on("end", function() {
                let parsedObjTweet = JSON.parse(str);
                console.log(parsedObjTweet);

                resolve(parsedObjTweet);
                //console.log(str);
            });
        };

        // configuring the request.
        var req = https.request(options, callback);
        // writing a body
        req.write("grant_type=client_credentials");
        // sends the request to twitter.
        req.end();
    });
};

// #############################################################################
// #############################################################################
// #############################################################################

module.exports.filterTweets = function filterTweets(tweets) {
    //console.log("filterTweets token:", filterTweets);
    //do something
    // find the text and the links - put them in an array.
    // console.log("ARGGGGGGGGGHHHHHHH");
    var tweetsArray = [];
    // var filteredTweets = tweets.filter(
    //     tweet => tweet.entities.urls.length == 1
    // );
    for (var i = 0; i < tweets.length; i++) {
        var twitterText = tweets[i].text;
        if (
            tweets[i].entities["urls"].length == 1 &&
            typeof tweets[i].entities.media === "undefined"
        ) {
            tweetsArray.push({
                text: twitterText.replace(
                    tweets[i].entities["urls"][0]["url"],
                    ""
                ),
                href: tweets[i].entities["urls"][0]["url"]
            });
        }
    }

    return tweetsArray;
};
