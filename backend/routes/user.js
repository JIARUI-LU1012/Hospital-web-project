const express = require('express');
const router = express.Router();
const db = require("../db/db.js");  //引入数据库包
const {ObjectId} = require('mongodb')
const crypto = require('crypto')
const salt = 'random_string'

const md5 = str => {
  return crypto.createHash('md5').update(salt + str).digest('hex')
}

const getCollection = () => {
  return db.collection('user')
}

router.post('/register/', async function (req, res, next) {
  const user = getCollection()
  const existsNum = await user.count({username: req.body.username})
  if (existsNum === 0) {
    user.insertOne(req.body)
    res.json({code: 0, message: 'Registration is successful'})
  } else {
    res.json({code: 500, message: 'The username already exists'})
  }
});

router.post('/login', async function (req, res, next) {
  const user = getCollection()
  const userList = await user.find({username: req.body.username, password: req.body.password}).toArray()
  if (userList.length === 1) {
    res.json({code: 0, message: 'Login success', data: userList[0]})
  } else {
    res.json({code: 500, message: 'Wrong username or password'})
  }
});

router.post('/update', async function (req, res, next) {
  const newObject = {...req.body}
  delete newObject._id

  const user = getCollection()
  await user.updateOne(
    {"_id": new ObjectId(req.body._id)},
    {
      $set: newObject
    }
  )
  res.json({code: 0, message: 'save success'})
});


router.post('/delete', async function (req, res, next) {
  const {
    id
  } = req.body

  const user = db.collection('user')
  await user.deleteMany({_id: new ObjectId(id)})
  res.json({code: 0, message: 'Delete success'})
});

router.get('/info/:id', async function (req, res, next) {
  const user = getCollection()
  const rows = await user.find({
      "_id" : new ObjectId(req.params.id)
  }).toArray()
  res.json(rows[0])
});

router.get('/escort/list', async function (req, res, next) {
  const user = getCollection()
  const {minPrice = 0, maxPrice = Infinity} = req.query
  const rows = await user.find({
    role: 'escort',
    price: {$gte: +minPrice, $lte: +maxPrice}
  }).toArray()
  res.json(rows)
});

router.post('/escort/booking', async function (req, res, next) {
  // modifyescort.state=Accompaniment
  const user = getCollection()
  await user.updateOne(
    {"_id": new ObjectId(req.body.escort._id)},
    {
      $set: {
        state: 'Accompaniment'
      }
    }
  )

  // doctor的预约人数+1
  const doctorObject = req.body.doctor
  doctorObject.booking_person_num = Number(doctorObject.booking_person_num) + 1
  const doctor = db.collection('doctor')
  await doctor.updateOne(
    {"_id": new ObjectId(doctorObject._id)},
    {
      $set: {
        booking_person_num: doctorObject.booking_person_num
      }
    }
  )


  const order = db.collection('order')
  await order.insertOne({
    escort: req.body.escort,
    user: req.body.user,
    doctor: doctorObject,
    state: 'Accompaniment',
    create_time: new Date(),
  })
  res.json({code: 0, message: 'The appointment was successful'})
});

module.exports = router;
