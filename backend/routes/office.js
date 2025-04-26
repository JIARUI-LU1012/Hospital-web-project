const express = require('express');
const router = express.Router();
const db = require("../db/db.js")
const { ObjectId } = require('mongodb')

const getCollection = () => {
    return db.collection('office')
}

router.get('/list', async function(req, res, next) {
    const office = getCollection()
    const rows = await office.find({
        name: new RegExp(req.query.name, 'i'),
    }).toArray()
    res.json(rows)
});

router.post('/save', async function(req, res, next) {
    const office = getCollection()
    const newObject = {...req.body}

    if(req.body._id) {
        delete newObject._id
        await office.updateOne(
          {"_id": new ObjectId(req.body._id)},
          {
              $set: newObject
          }
        )
    } else {
        await office.insertOne(req.body)
    }
    res.json({ code: 0, message: 'The save was successful' })
});

router.delete('/delete/:id', async function(req, res, next) {
    const office = getCollection()
    await office.deleteMany({_id: new ObjectId(req.params.id)})
    res.json({ code: 0, message: 'The deletion is successful' })
});

module.exports = router;
