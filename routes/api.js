const express = require('express')
const router = express.Router()
let service = require('./service')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.route('/hero')
  .get((req, res) => {
    let obj = service.getList()
    res.json(obj)
  })
  .post((req, res) => {
    let hero = {
      id: req.body.id,
      name: req.body.name
    }

    let obj = service.addHero(hero)
    res.json(obj)
  })

router.route('/hero/:id')
  .put((req, res) => {
    let hero = {
      id: req.params.id,
      name: req.body.name
    }
    let obj = service.updateHero(hero)
    res.json(obj)
  })
  .delete((req, res) => {
    let obj = service.removeHero(req.params.id)
    res.json(obj)
  })
module.exports = router;
