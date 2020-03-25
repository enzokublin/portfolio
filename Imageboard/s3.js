const knox = require("knox");
const fs = require("fs");

let secret;

if (process.env.NODE_ENV == "production") {
    secret = process.env; // in prod the secret are environment variables
} else {
    secret = require("./secret"); // secret.json is in .gitignore
}

const client = knox.createClient({
    key: secret.awsKey,
    secret: secret.awsSecret,
    bucket: "spicedling"
});

exports.upload = function(req, res, next) {
    if (!req.file) {
        return res.sendStatus(500);
    }
    const s3Request = client.put(req.file.filename, {
        "Content-Type": req.file.mimetype,
        "Content-Length": req.file.size,
        "x-amz-acl": "public-read"
    });
    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(s3Request);

    s3Request.on("response", s3Response => {
        console.log(s3Response.statusCode);
        if (s3Response.statusCode == 200) {
            next();
        } else {
            res.sendStatus(500);
        }
        fs.unlink(req.file.path, () => {});
    });
};
