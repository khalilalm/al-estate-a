const router = require("express").Router();
let Home = require("../models/home.model");

router.route("/").get((req, res) => {
  Home.find()
    .then((homes) => res.json(homes))
    .catch((err) => res.status(400).jsom("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const pricing = Number(req.body.pricing);
  const date = Date.parse(req.body.date);

  const newHome = new Home({
    username,
    description,
    pricing,
    date,
  });

  newHome
    .save()
    .then(() => res.json("New Home Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").get((req, res) => {
  Home.findById(req.params.id)
    .then((home) => res.json(home))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Home.findByIdAndDelete(req.params.id)
    .then(() => res.json("House deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Home.findById(req.params.id)
    .then((home) => {
      home.username = req.body.username;
      home.description = req.body.description;
      home.pricing = Number(req.body.pricing);
      home.date = Date.parse(req.body.date);

      home
        .save()
        .then(() => res.json("House details updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
