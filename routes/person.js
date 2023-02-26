const express = require('express');
const PersonModel = require('../models/person');
const router = express.Router();

router.get('/persons', function (req, res) {
  PersonModel.find({})
    .then(persons => res.json(persons))
    .catch(err => console.log(err));
});

router.post('/person', function (req, res) {
  const { fn, ln, username, pwd } = req.body;
  const personData = new PersonModel({ fn, ln, username, pwd });
  personData.save()
    .then(succ => res.json(succ))
    .catch(err => console.log(err));
});

router.post('/person/login', async function (req, res) {
  // console.log(req.body);
  // const { username, pwd } = req.body;
  // try {
  //   const person = await PersonModel.findOne({ username });
  //   console.log(person);
  //   if (person.pwd === pwd) {
  //     res.json(person);
  //   }
  // }
  // catch (err) {
  //   res.json(err);
  // }

  const { username, pwd } = req.body;
  PersonModel.findOne({ username })
    .then(person => {
      if (person.pwd === pwd) {
        console.log(person);
        res.json(person);
      }
      else {
        throw "error";
      }
    })
    .catch(err => res.json(err));
});

module.exports = router;
