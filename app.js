const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/jsonAPI");

const User = require("./app/models/user");

router.use((req, res, next) => {
    console.log("Something is happening.");
    next();
});

router.get("/", (req, res) => {
    res.json({ message: "Successfully Posted a test message." });
});

router
    .route("/users")
    .post((req, res) => {
        const user = new User();

        user.twitter_id = req.body.twitter_id;
        user.name = req.body.name;
        user.age = req.body.age;

        user.save()
            .then(() => {
                res.json({ message: "User created!" });
            })
            .catch((err) => {
                onsole.error("Error saving user:", err);
                res.send(err);
            });
    })
    .get((req, res) => {
        User.find()
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                res.send(err);
            });
    });

router
    .route("/users/:user_id")
    .get((req, res) => {
        User.findById(req.params.user_id)
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.send(err);
            });
    })
    .put((req, res) => {
        User.findById(req.params.user_id)
            .then((user) => {
                user.twitter_id = req.body.twitter_id;
                user.name = req.body.name;
                user.age = req.body.age;

                user.save()
                    .then(() => {
                        res.json({ message: "User updated!" });
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            })
            .catch((err) => {
                res.send(err);
            });
    })
    .delete((req, res) => {
        User.deleteOne({ _id: req.params.user_id })
            .then((user) => {
                res.json({ message: "Successfully deleted!" });
            })
            .catch((err) => {
                res.send(err);
            });
    });

app.use("/api", router);

app.listen(port, () => {
    console.log("listen on port " + port);
});
