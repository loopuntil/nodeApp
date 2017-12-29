const express = require('express')
const router = express.Router()
//service實務上要改寫連真正的db，這邊是範例所以用mock的
let service = require('./service')
//如果app.js沒有設定要加下面這三行接收JSON格式參數，有就不用加了
/*
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
*/

/* 
domain/api/hero
如果在本機的話就是http://localhost:3000/api/hero
使用get查詢，post新增，回傳格式包成json
*/
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

/* 
在網址帶入id，使用put修改，delete刪除
*/
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
