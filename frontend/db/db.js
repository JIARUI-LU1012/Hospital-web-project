const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017');
client.connect();
const db = client.db('patient_support')

module.exports = db;
