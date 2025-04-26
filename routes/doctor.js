const express = require('express');
const router = express.Router();
const db = require("../db/db.js");  //引入数据库包
const { ObjectId } = require('mongodb')

const getCollection = () => {
    return db.collection('doctor')
}

router.get('/list', async function(req, res, next) {
    const doctor = getCollection()
    const rows = await doctor.aggregate([
        {
            $lookup:
                {
                    from: "office",
                    localField: "office_id",
                    foreignField: "_id",
                    as: "office",
                },
        },
        {
            $unwind: "$office",
        },
        {
            $match: {
                name: new RegExp(req.query.name, 'i'),
            },
        },
    ]).toArray()
    res.json(rows)
});

router.post('/save', async function(req, res, next) {
    const doctor = getCollection()
    const newObject = {...req.body}
    newObject.office_id = new ObjectId(newObject.office_id)

    if(req.body._id) {
        delete newObject._id
        await doctor.updateOne(
          {"_id": new ObjectId(req.body._id)},
          {
              $set: newObject
          }
        )
    } else {
        await doctor.insertOne(newObject)
    }
    res.json({ code: 0, message: 'The save was successful' })
});

router.delete('/delete/:id', async function(req, res, next) {
    const doctor = getCollection()
    await doctor.deleteMany({_id: new ObjectId(req.params.id)})
    res.json({ code: 0, message: 'The deletion is successful' })
});

module.exports = router;
