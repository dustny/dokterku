const express = require('express')
const app = express()
const session = require('express-session')

const port = 3000

app.set("view engine" , "ejs")
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))
app.use(session({
  secret: 'Unknown For Safety',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true }
}))


app.use(require('./routes')) 

app.listen(port, () => {
  console.log(` Welcome back Sir! ${port} is now ready`)
})