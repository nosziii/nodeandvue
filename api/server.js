const express = require('express')
const path = require('path')
const randomId = require('random-id')
const mysqldb = require('./mysqldb/mysqdb')
const passwordHash = require('password-hash')
const app = express(),
      bodyParser = require("body-parser")
      port = 3080
const mysql = require('mysql')
// place holder for the data
const users = []
const con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "MeuGnaE4"
})
// todo: még be kell fejezni sql lekérdezések és insertek!!!
//const chema = {tableName: "test", column0: "bum0", column1: "bum1", Size0: "VARCHAR(255)", Size1: "VARCHAR(255)"}
// const test = mysqldb.createDb(con ,'project')


app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../my-app/dist')))

app.get('/api/users', (req, res) => {
  console.log('api/users called!!!!!!!')
  res.json(users)
})

app.post('/api/user', (req, res) => {
  const user = req.body.user
  user.id = randomId(10)
  console.log('Adding user:::::', user)
  users.push(user)
  res.json("user addedd")
})

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'))
})

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`)
})