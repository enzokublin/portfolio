const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const hb = require("express-handlebars");
const db = require("./database");
const csurf = require("csurf");

// #############################################################################
// #############################################################################
// #############################################################################

//this part of the petition, we need for saving the signature in the cookies.
var cookieSession = require("cookie-session");

app.use(
    cookieSession({
        secret: `You made it!.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

// #############################################################################
// #############################################################################
// #############################################################################

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

//########serving static file###################################################
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// #############################################################################
// ########## Dealing with security issues #####################################
// #############################################################################
app.use(csurf());

app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// #############################################################################
// ## Getting to the registration page while calling the webpage ###############
// #############################################################################

app.get("/", (req, res) => {
    res.redirect("/register");
});

// #############################################################################
// ############ registration page ##############################################
// #############################################################################
app.get("/register", lookIfUserSigned, (req, res) => {
    res.render("register", {
        layout: "main"
    });
});

app.post("/register", (req, res) => {
    db.hashPassword(req.body.password).then(hash => {
        console.log(req.body.email);
        db.insertNewUser(
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            hash
        )
            .then(results => {
                // console.log("here are my results", results.rows);
                req.session = {};
                req.session.user = {};
                req.session.user_id = results.rows[0].id;
                req.session.firstname = req.body.firstname;
                req.session.lastname = req.body.lastname;
                req.session.user.email = req.body.email;

                res.redirect("/userProfile");
            })
            .catch(err => console.log(err.message));
    });
});

// #############################################################################
// ############ login page #####################################################
// #############################################################################
app.get("/login", lookIfUserSigned, (req, res) => {
    res.render("login", {
        layout: "main",
        email: "e-mail address",
        pw: "password",
        submit: "Submit"
    });
});

app.post("/login", (req, res) => {
    db.getDatabasePw(req.body.email)
        .then(result => {
            return db.checkPassword(req.body.password, result.rows[0].password);
        })
        .then(doesMatch => {
            if (doesMatch) {
                return db.checkForUserInfos(req.body.email);
            } else {
                res.render("login", {
                    layout: "main",
                    error: "error"
                });
                return;
            }
        })
        .then(result => {
            req.session.firstname = result.rows[0].firstname;
            req.session.lastname = result.rows[0].lastname;
            req.session.user_id = result.rows[0].user_id;
            req.session.signatureId = result.rows[0].signature_id;
            res.redirect("/signature");
        })
        .catch(err => {
            console.log(err);
        });
});

// #############################################################################
// ############ signature page #################################################
// #############################################################################

app.get("/signature", (req, res) => {
    if (req.session.signatureId) {
        res.redirect("/thankyou");
    } else {
        res.render("signature", {
            layout: "main",
            signature: "signature",
            submit: "Submit"
        });
    }
});

app.post("/signature", (req, res) => {
    db.submitSign(req.body.signature, req.session.user_id)
        .then(result => {
            req.session.signatureId = result.rows[0].id;

            res.redirect("/thankyou");
        })
        .catch(err => {
            console.log("Deal with the error in db.submitSign function: ", err);
        });
});

// #############################################################################
// ############ Deleting signature and Profileinfos ############################
// #############################################################################

app.post("/deleteSignature", checkForRegisteredUsers, (req, res) => {
    db.deleteSignature(req.session.user_id)
        .then(() => {
            delete req.session.signatureId;
            delete req.body.signature;
            res.redirect("/signature");
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/deleteUserProfile", checkForRegisteredUsers, (req, res) => {
    db.deleteUsersProfile(req.session.user_id)
        .then(() => {
            delete req.session.signatureId;
            delete req.body.signature;
            delete req.session.user_id;
            res.redirect("/register");
        })
        .catch(err => {
            console.log(err);
        });
});

// #############################################################################
// ############ thank you page #################################################
// #############################################################################

app.get("/thankyou", (req, res) => {
    let signImg;

    db.getSignatureImg(req.session.signatureId)
        .then(result => {
            signImg = result.rows[0].signature;
        })
        .then(() => {
            return db.getUserNumbers();
        })
        .then(signNum => {
            res.render("thankyou", {
                layout: "main",
                message: "Thank you for signing my petition!",
                signersCount: signNum,
                signed: signImg
            });
        })
        .catch(err => {
            console.log(err);
        });
});

// #############################################################################
// ############ User Updates ###################################################
// #############################################################################
app.get("/updateYourProfile", checkForRegisteredUsers, (req, res) => {
    db.joinTwoTablesData(req.session.user_id)
        .then(update => {
            res.render("updateYourProfile", {
                layout: "main",
                firstname: "First Name",
                lastname: "Last Name",
                update: update[0]
            });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/updateYourProfile", (req, res) => {
    if (req.body.password) {
        db.hashPassword(req.body.password)
            .then(hash => {
                Promise.all([
                    db.getUserPasswordUpdate(
                        req.session.user_id,
                        req.body.firstname,
                        req.body.lastname,
                        req.body.email,
                        hash
                    ),
                    db.getUpdatedUserProfileInfos(
                        req.session.user_id,
                        req.body.age,
                        req.body.city,
                        req.body.url
                    )
                ])
                    .then(() => {
                        res.redirect("/thankyou");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        Promise.all([
            db.getEditUserProfileData(
                req.session.user_id,
                req.body.firstname,
                req.body.lastname,
                req.body.email
            ),
            db
                .getUpdatedUserProfileInfos(
                    req.session.user_id,
                    req.body.age,
                    req.body.city,
                    req.body.url
                )
                .catch(err => {
                    throw err;
                })
        ])
            .then(() => {
                res.redirect("/thankyou");
            })
            .catch(err => {
                console.log(err);
            });
    }
});

// #############################################################################
// ############ Signature List Page ############################################
// #############################################################################

app.get("/signerlist", checkForRegisteredUsers, (req, res) => {
    if (!req.session.signatureId) {
        console.log(req.session.signatureId);
        res.redirect("/signature");
    } else {
        db.getSignertories()
            .then(result => {
                errorMsg = "";
                console.log("getSignertories RESULT", result.rows);

                res.render("signerlist", {
                    layout: "main",
                    firstname: "First Name",
                    lastname: "Last Name",
                    signatureImg: `${req.session.signature}`,
                    signatories: "",
                    signaturelist: result.rows
                });
            })
            .catch(err => {
                console.log("ERROR in the getSignertories: ", err.message);
            });
        errorMsg = "";
    }
});

// #############################################################################
app.get("/signerlist/:city", checkForRegisteredUsers, (req, res) => {
    db.getSignertoriesdueToTheirCity(req.params.city)
        .then(users => {
            res.render("signerlist", {
                layout: "main",
                messageSignertories: `These are the people from ${
                    users.rows[0].city
                } who have signed the petition!`,
                signaturelist: users.rows
            });
        })
        .catch(err => {
            console.log("getSignertories: ", err.message);
        });
});

// #############################################################################
// ##############################User Profiles Page#############################
// #############################################################################
app.get("/userProfile", userHasBeenOnProfile, (req, res) => {
    res.render("userProfile", {
        layout: "main",
        age: "age",
        city: "city",
        url: "url"
    });
}),
app.post("/userProfile", (req, res) => {
    db.getUserProfileInfos(
        req.session.user_id,
        req.body.age,
        req.body.city,
        req.body.url
    )
        .then(() => {
            res.redirect("/signerlist");
        })
        .catch(err => {
            console.log(
                "Deal with the error in db.getUserProfileInfos function: ",
                err
            );
        });
});

// #############################################################################
// ############################## Logout Link ##################################
// #############################################################################

app.get("/logout", (req, res) => {
    req.session.destroy;
    req.session = null;
    res.redirect("/register");
});

// #############################################################################
// ############################## User has neen on profile #########################
// #############################################################################

function userHasBeenOnProfile(req, res, next) {
    if (req.session.age || req.session.city || req.session.homepage) {
        res.redirect("/thankyou");
    } else {
        next();
    }
}

// #############################################################################
// ############ Registered or Not that's the question? #########################
// #############################################################################

function checkForUserLogIn(req, res, next) {
    if (req.session.user_id) {
        res.redirect("/userProfile");
    } else {
        next();
    }
}

function checkForRegisteredUsers(req, res, next) {
    if (!req.session.user_id) {
        res.redirect("/register");
    } else {
        next();
    }
}

// #############################################################################
// #############################################################################
// #############################################################################

function lookIfUserSigned(req, res, next) {
    if (req.session.signatureId) {
        res.redirect("/thankyou");
    } else {
        next();
    }
}

// #############################################################################
// ############ Listen to localhost 8080 #######################################
// #############################################################################

app.listen(process.env.PORT || 8080, () => {
    console.log("Glistening on port 8080");
});
