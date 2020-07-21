let express = require('express')
let app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let cors = require('cors')
var passport = require('passport');


app.use(express.json())
app.use(cors())
let mongoDB = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
)
const auth = require('./routes/auth')
app.use('/auth', auth)

const api = require('./routes/api')
app.use('/api', api)


app.listen(process.env.PORT, function () {
    console.log('Express server listening on port ' + process.env.PORT)
  })
