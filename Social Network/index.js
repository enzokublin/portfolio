const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./src/db");
const security = require("./src/security");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3.js");
const s3url = require("./config.json");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const compression = require("compression");

app.use(compression());

if (process.env.NODE_ENV != "production") {
  app.use(
    "/bundle.js",
    require("http-proxy-middleware")({
      target: "http://localhost:8081/"
    })
  );
} else {
  app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

const cookieSessionMiddleware = cookieSession({
  secret: `You made it!.`,
  maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
  cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(csurf());
app.use(function(req, res, next) {
  res.cookie("spicedbearstoken", req.csrfToken());
  next();
});

app.use(express.static("public"));
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

// #####################################################################
// ######################## Welcome Page ###############################
// #####################################################################

app.get("/welcome", function(req, res) {
  if (req.session.userId) {
    res.redirect("/");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

// #####################################################################
// ######################## Register User ##############################
// #####################################################################

app.post("/register", (req, res) => {
  console.log("happy body: ", req.body);
  security.hashPassword(req.body.password).then(hash => {
    console.log("happy hash: ", hash);
    db.insertNewUser(
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      hash
    )
      .then(results => {
        req.session.userId = results.rows[0].id;
        res.json({ success: true });
      })
      .catch(() => {
        console.log("happy string");
        res.json({ success: false });
      });
  });
});

function checkForRegisteredUsers(req, res, next) {
  if (!req.session.userId) {
    res.redirect("/register");
  } else {
    next();
  }
}

// #####################################################################
// ########################### Login User ##############################
// #####################################################################

app.post("/login", (req, res) => {
  security
    .getDatabasePw(req.body.email)
    .then(result => {
      console.log("happy result: ", result);
      if (!result) {
        res.json({ success: false });
      } else {
        return security.checkPassword(
          req.body.password,
          result.rows[0].password
        );
      }
    })
    .then(doesMatch => {
      if (doesMatch) {
        return db.checkForUserInfos(req.body.email).then(id => {
          console.log("happy id:", id.rows[0].userid);
          req.session.userId = id.rows[0].userid;
          res.json({ success: true });
        });
      } else {
        res.json({ success: false });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

function checkForUserLogIn(req, res, next) {
  if (req.session.userId) {
    res.redirect("/welcome");
  } else {
    next();
  }
}

// #####################################################################
// ######################## Uploader ###################################
// #####################################################################

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
  const imgUrl = s3url.s3Url + req.file.filename;
  db.setUserProfileImage(imgUrl, req.session.userId)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/user", async function(req, res) {
  const { rows } = await db.getUserProfileById(req.session.userId);
  res.json(rows[0]);
});

// #####################################################################
// ######################## Bio Part ###################################
// #####################################################################

app.post("/bio", function(req, res) {
  db.updateUsersBio(req.body.user_content, req.session.userId)
    .then(results => {
      res.json(results.rows);
    })
    .catch(err => {
      console.log(err);
    });
});

// #####################################################################
// ######################## Api-Buddybears #############################
// #####################################################################

app.get("/api-buddybears", function(req, res) {
  db.getBuddyBearsAndWannabieBuddyBears(req.session.userId)
    .then(results => {
      res.json(results.rows);
    })
    .catch(err => {
      console.log(err);
    });
});

// #####################################################################
// #########################  Opp Part #################################
// #####################################################################

app.get("/api-user/:id", function(req, res) {
  if (req.session.userId == req.params.id) {
    res.json({ success: true });
  } else {
    db.selectOppById(req.params.id)
      .then(results => {
        if (!results.rows) {
          res.json({ success: true });
        } else {
          res.json(results.rows);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
});

// #####################################################################
// ######################## Buddy Bear Request #########################
// #####################################################################

app.get("/buddyship-status", function(req, res) {
  db.getBearBuddyship(req.session.userId, req.query.id)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/send-buddybear-request", function(req, res) {
  db.sendBuddyBearRequest(req.session.userId, req.body.id)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/accept-buddybear-request", function(req, res) {
  db.acceptBearBuddyship(req.session.userId, req.body.receiver_id)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/end-bear-buddyship", function(req, res) {
  db.endBearBuddyship(req.session.userId, req.body.receiver_id)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/cancle-buddybear-request", function(req, res) {
  db.cancleBuddyBearRequest(req.session.userId, req.body.receiver_id)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {
      console.log(err);
    });
});

// #####################################################################
// ######################## Logout #####################################
// #####################################################################

app.get("/logout", (req, res) => {
  req.session = null;
  console.log("happy session:", req.session);
  res.redirect("/login");
});

// #####################################################################
// ######################## ### ########################################
// #####################################################################

// ##################### Wall #######################

app.post("/wall", uploader.single("file"), s3.upload, function(req) {
  const imgUrl = s3url.s3Url + req.file.filename;
  db.insertWallPosts(imgUrl, req.body.text, req.session.userId)
    .then(() => {})
    .catch(err => {
      console.log(err);
    });
});

app.get("/wall-posts", function(req, res) {
  console.log("made it");
  db.getWallPosts()
    .then(results => {
      console.log("results: ", results.rows.reverse());
      res.json(results.rows.reverse());
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("*", function(req, res) {
  if (!req.session.userId && req.url !== "/welcome") {
    res.redirect("/welcome");
  } else {
    // console.log("happy file");
    res.sendFile(__dirname + "/index.html");
  }
});
// #######################################################

server.listen(8080, function() {
  console.log("I'm listening.");
});

// ########################## Socket.io ##################
let onlineSpiceBears = [];
let chatsArray = [];

io.on("connection", function(socket) {
  onlineSpiceBears.push({
    userId: socket.request.session.userId,
    socketId: socket.id
  });

  db.getBuddyBearsPost()
    .then(newestMessages => {
      socket.emit("newestMessages", newestMessages.rows);
    })
    .catch(err => console.log("awesome err: ", err));

  socket.on("newMessage", function(newMessage) {
    db.insertBuddyBearsPost(socket.request.session.userId, newMessage)
      .then(posts => {
        db.getBuddyBearsPost(posts.rows[0])
          .then(chatData => {
            let chatMessage = {
              id: chatData.rows[0].id,
              firstname: chatData.rows[0].firstname,
              lastname: chatData.rows[0].lastname,
              image_url: chatData.rows[0].image_url,
              chat_message: chatData.rows[0].chat_message
            };
            io.sockets.emit("newMessage", chatMessage);
            console.log("awesome chatData: ", chatMessage);
          })
          .catch(err => console.log("awesome err: ", err));
      })
      .catch(err => console.log("happy err: ", err));
  });

  //array
  let ids = onlineSpiceBears.map(spiceBear => {
    return spiceBear.userId;
  });

  socket.on("disconnect", function() {
    db.getSpiceBearById(socket.request.session.userId)
      .then(data => {
        let index = ids.indexOf(socket.request.session.userId);
        if (index > -1) {
          onlineSpiceBears.splice(index, 1);
        }
        io.sockets.emit("spiceBearLeft", data.rows);
      })
      .catch(err => {
        console.log(err);
      });
  });

  db.getUsersByIds(ids)
    .then(results => {
      socket.emit("onlineSpiceBears", results.rows);
      socket.broadcast.emit("spiceBearJoined", results.rows);
    })
    .catch(err => {
      console.log(err);
    });
});
