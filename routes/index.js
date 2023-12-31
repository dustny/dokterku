const Controller = require('../controllers')
const router = require('express').Router()

router.get('/login', Controller.login)
router.get('/register', Controller.addUser)
router.post('/register', Controller.createUser)
router.post('/login', Controller.postLogin)
router.get('/logout', Controller.logout)

router.use(function (req, res, next) {

    if(!req.session.userId){
      const errors = `Please login first!!!`
      res.redirect(`/login?errors=${errors}`)
    } else{
      next()
    }
  })

router.get('/', Controller.home)
router.get('/profile/:id', Controller.addUserProfile)
router.post('/profile/:id', Controller.createUserProfile)
router.get('/profile/:id/edit', Controller.getProfile)
router.post('/profile/:id/edit', Controller.editProfile)


router.get('/disease', Controller.showAllDiseases)
router.get('/disease/add', Controller.addDisease)
router.post('/disease/add', Controller.createDisease)
router.get('/disease/delete/:id', Controller.deleteDisease)
router.get('/medicalRecords/add', Controller.addMedicalRecord)
router.post('/medicalRecords/add', Controller.createMedicalRecord)
router.get('/medicalRecords', Controller.medicalRecordPage)
router.get('/medicalRecords/:UserId/detail/:DiseaseId', Controller.medicalRecordDetail)


module.exports = router