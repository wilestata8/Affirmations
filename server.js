const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

let db, collection;

const url = "mongodb+srv://wilestata8:wilestata8@cluster1.a7x7t.mongodb.net/affirmations?retryWrites=true&w=majority";
const dbName = "affirmations";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('affirmations').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {affirmations: result})
  })
})

app.post('/affirmations', (req, res) => {
  db.collection('affirmations').insertOne({name: req.body.name, msg: req.body.msg, mood: req.body.mood, thumbUp: 0, thumbDown:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/affirmations', (req, res) => {
  db.collection('affirmations')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg, mood: req.body.mood }, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/thumbsUp', (req, res) => {
  console.log(req.body)
  db.collection('affirmations')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg, mood: req.body.mood}, {
    $set: {
      thumbUp:req.body.likes + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.put('/thumbsDown', (req, res) => {
  console.log(req.body)
  db.collection('affirmations')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg, mood: req.body.mood}, {
    $set: {
      thumbUp:req.body.likes - 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/affirmations', (req, res) => {
  db.collection('affirmations').findOneAndDelete({name: req.body.name, msg: req.body.msg, mood: req.body.mood}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})