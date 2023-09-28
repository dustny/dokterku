const express = require('express')
const Controller = require('./controllers')
const app = express()
const port = 3000

app.use(express.urlencoded({extended : false}))
app.set("view engine" , "ejs")

app.get('/', Controller.home)
app.get('/login', Controller.home)
app.get('/register', Controller.register)
app.get('/profile/doctor', Controller.profile)
app.get('/profile/patient', Controller.profile)

app.get('/disease', Controller.home)
app.get('/disease/add', Controller.home)
app.post('/disease/add', Controller.home)
app.get('/medicalrecords', Controller.home)


app.listen(port, () => {
  console.log(` Welcome back Sir! ${port} is now ready`)
})