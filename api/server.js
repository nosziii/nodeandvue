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





// todo: még be kell fejezni sql lekérdezések és insertek!!!
 const chema = {tableName: "s_user",
columnName: "FIRST_NAME, LAST_NAME, EMAIL_NOTIFIED, USER_NAME, ID_S_USER_CREATE, ID_S_USER_MOD, STORNO, ID_S_USER_VALID, CREATE_DATE, MOD_DATE, STORNO_DATE, VALID, MOBILE_PHONE, BANNED, ID_INTL_LANGUAGE, BANNED_COMM, USER_PASSWORD, WRONG_PASSW, USER_COMMENT, GDPR_TORLES",
  data: " 'meszaros', 'zsolt', 'zsorzso0214@gmail.com', 'meszaros.zsolt', 2021-01-02, 1, 0, 1, '2015-12-18 00:00:00', '2020-08-05 12:32:10', null,1, '36 30 737-13-83', null, 2, null, 'teszt', null, null, '2015-12-17 22:00:00'"}
const test = mysqldb.insertRecord(conketto('project') ,chema)


app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../my-app/dist')))

app.get('/api/users', (req, res) => {
  console.log('api/users called!!!!!!!')
  res.json(users)
})

app.post('/api/user', (req, res) => {
  const user = req.body.user
  user.passwd = passwordHash.generate(user.passwd)
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