const express = require('express');
const PersonModel = require('../models/person');
const router = express.Router();

router.get('/persons', function (req, res) {
  PersonModel.find({})
    .then(persons => res.json(persons))
    .catch(err => console.log(err));
});

router.post('/person/post', function (req, res) {
  const { fn, ln, username, pwd } = req.body;
  const personData = new PersonModel({ fn, ln, username, pwd });
  personData.save()
    .then(person => res.json(person))
    .catch(err => console.log(err));
});

router.post('/person/login', async function (req, res) {

  const { username, pwd } = req.body;
  PersonModel.findOne({ username })
    .then(person => {
      if (person && person.pwd === pwd) {
        res.json({ person, message: "allow" });
      } else if (person && person.pwd !== pwd) {
        res.json({ message: "password_error" });
      } else {
        res.json({ message: "not_found" });
      }
    })
    .catch(err => res.json("promise_error"));
});

module.exports = router;
