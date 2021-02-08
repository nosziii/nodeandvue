const express = require('express')
const path = require('path')
const randomId = require('random-id')
const mysqldb = require('./mysqldb/mysqdb')
const passwordHash = require('password-hash')
const helpers = require('./helper/helper')
const app = express(),
      bodyParser = require("body-parser")
      port = 3080

const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const User = require('./models/user');

const mysql = require('mysql')
// place holder for the data
const users = []
const con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "MeuGnaE4"
})

const conketto = (db)=>{
  if (db){
    const condb = mysql.createConnection({
      host: "localhost",
      user: "node",
      password: "MeuGnaE4",
      database: db
    })
    return condb
  }
}

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../my-app/dist')))

app.get('/api/users', (req, res) => {
  console.log('api/users called!!!!!!!')
  res.json(users)
})

app.post('/api/user', (req, res) => {
  const user = req.body.user
  if (user.passWd) user.passWd = passwordHash.generate(user.passWd)
  user.idSUserCreate = Date.now()
  user.idSUserMode = 1
  user.storno = 0
  user.idSUserValid = 1
  user.createDate = Date.now()
  user.valid = 1
  user.idIntlLanguage = 1
  
  console.log('Adding user:::::', user)
  users.push(user)
  res.json("user addedd")
  mysqldb.insertRecord(conketto('project') ,helpers.createUserObj(user))
})

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'))
})

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`)
})