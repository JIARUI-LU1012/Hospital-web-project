const express = require('express');
const router = express.Router();
const db = require("../db/db.js")
const { ObjectId } = require('mongodb')

const getCollection = () => {
    return db.collection('order')
}

// patient 的order列表
router.get('/user/list', async function(req, res, next) {
    const order = getCollection()
    const rows = await order.find({
        'user._id': req.query.user_id,
        'escort.nickname': new RegExp(req.query.name, 'i'),
    }).toArray()
    res.json(rows)
});

// Escorts 的order列表
router.get('/escort/list', async function(req, res, next) {
  const order = getCollection()
  const rows = await order.find({
    'escort._id': req.query.user_id,
    'user.nickname': new RegExp(req.query.name, 'i'),
  }).toArray()
  res.json(rows)
});

router.get('/all', async function(req, res, next) {
    const order = getCollection()
    const rows = await order.find({}).sort({create_time: -1}).toArray()
    const timeList = rows.map((row) => row.create_time.toISOString().split('T')[0])
    res.json(timeList)
});

router.post('/finish', async function(req, res, next) {
    // modifyescort.state=Accompaniment
    const order = getCollection()
    await order.updateOne(
        {"_id": new ObjectId(req.body.id)},
        {
            $set: {
                state: 'complete'
            }
        }
    )

    const user = db.collection('user')
    await user.updateOne(
      {"_id": new ObjectId(req.body.escort_id)},
      {
          $set: {
              state: 'free'
          }
      }
    )

    res.json({ code: 0, message: 'The operation was successful' })
});

module.exports = router;
