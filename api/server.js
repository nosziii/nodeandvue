const express = require('express')
const path = require('path')
const randomId = require('random-id')
const mysqldb = require('./mysqldb/mysqdb')
const passwordHash = require('password-hash')
const helpers = require('./helper/helper')
const config = require('dotenv').config()
// creating an express instance
const app = express(),
      bodyParser = require("body-parser")
      port = 3080
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Cors = require("cors")
const mysql = require('mysql2')

app.use(bodyParser.json())

app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(passport.initialize())
app.use(passport.session())

let users = [
  {
    id: 1,
    name: "Jude",
    email: "user@email.com",
    password: "password"
  },
  {
    id: 2,
    name: "Emma",
    email: "emma@email.com",
    password: "password2"
  }
]
// login
app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err)
    }
    
    if (!user) {
      return res.status(400).send([user, "Cannot log in", info])
    }
    
    req.login(user, err => {
      res.send("Logged in")
    })
  })(req, res, next)
})

app.get("/api/logout", function(req, res) {
  req.logout()
  
  console.log("logged out")
  
  return res.send()
})
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated')
  } else {
    return next()
  }
}

app.get("/api/user", authMiddleware, (req, res) => {
  let user = users.find(user => {
    return user.id === req.session.passport.user
  })
  
  console.log([user, req.session])
  
  res.send({ user: user })
})

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  let user = users.find((user) => {
    return user.id === id
  })
  
  done(null, user)
})

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    
    (username, password, done) => {
      let user = users.find((user) => {
        return user.email === username && user.password === password
      })
      
      if (user) {
        done(null, user)
      } else {
        done(null, false, { message: 'Incorrect username or password'})
      }
    }
  )
)

const con = mysql.createConnection({
  host: config.parsed.DB_HOST,
  user: config.parsed.DB_USER,
  password: config.parsed.DB_PASS
})
const conketto = (db)=>{
  if (db){
    const condb = mysql.createConnection({
      host: config.parsed.DB_HOST,
      user: config.parsed.DB_USER,
      password: config.parsed.DB_PASS,
      database: db
    })
    return condb
  }
}
app.use(cookieParser())

// app.use(express.static(path.join(__dirname, '../my-app/dist')))

// app.get('/api/users', (req, res) => {
//   console.log('api/users called!!!!!!!')
//   res.json(users)
// })
//
// app.post('/api/sess', (req, res) => {
//   console.log('api/session called!!!!!!!',req.body.sess)
// })

// app.post('/api/user', (
//   req, res) => {
//   const user = req.body.user
//   if (user.passWd) user.passWd = passwordHash.generate(user.passWd)
//   user.idSUserCreate = Date.now()
//   user.idSUserMode = 1
//   user.storno = 0
//   user.idSUserValid = 1
//   user.createDate = Date.now()
//   user.valid = 1
//   user.idIntlLanguage = 1
//
//   console.log('Adding user:::::', user)
//   users.push(user)
//   res.json("user addedd")
//   mysqldb.insertRecord(conketto('project') ,helpers.createUserObj(user))
// })

// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, '../my-app/build/index.html'))
// })
app.use(express.static(path.join(__dirname, '../my-app/dist')))

app.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: path.join(__dirname, '../my-app/dist') })
})

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`)
})

// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${port}`))