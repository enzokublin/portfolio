const express = require("express");
const multer = require("multer");
const uidSafe = require("uid-safe"); // for saving filesa
const path = require("path"); //buildin module for file extentions
const bodyParser = require("body-parser");
const db = require("./db");
const s3 = require("./s3.js");
const s3url = require("./config.json");

const app = express();

// ##########################################
// ##########################################
// ##########################################

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/images", (req, res) => {
    db.selectImages()
        .then(data => {
            console.log(data.rows);
            res.json(data.rows);
        })
        .catch(err => {
            console.log("Deal with error: ", err.message);
        });
});

app.get("/zoomin/:id", (req, res) => {
    db.selectImageByItsId(req.params.id).then(response => {
        res.json(response.rows);
    });
});

app.get("/comments/:id", (req, res) => {
    db.selectCommentsByTheirId(req.params.id)
        .then(data => {
            res.json(data.rows);
        })
        .catch(err => {
            console.log("Deal with the err: ", err);
        });
});

app.get("/images/more/:id", (req, res) => {
    db.showMorePictures(req.params.id)
        .then(results => {
            console.log("results getMore:", results.rows[0]);
            res.json(results.rows);
        })
        .catch(err => {
            console.log("err in getMore: ", err.message);
        });
});

app.post("/comments/:id", (req, res) => {
    console.log("happy comments: ", req.body);
    db.attachComments(req.body.image_id, req.body.user, req.body.comments).then(
        response => {
            res.json(response.rows).catch(err => {
                console.log("Deal with the err: ", err);
            });
        }
    );
});

// #############################################################################
// #############################################################################
// #############################################################################

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const picUrl = `${s3url.s3Url}${req.file.filename}`;
    console.log(picUrl);
    // If nothing went wrong the file is already in the uploads directory
    db.attachPicture(req.body.title, req.body.desc, req.body.user, picUrl)
        .then(data => {
            console.log("Happy uploading:", data.rows);
            res.json(data.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// #############################################
// #############################################
// #############################################

app.listen(8080, () => console.log("Listening"));
