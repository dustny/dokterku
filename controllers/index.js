const{User, UserProfile,Disease,MedicalRecord} = require('../models')

const {fullName, dataUser} = require('../helpers/formatter')

class Controller{

    static home(req,res){
        res.render('home')
    }

    static login(req , res){
        res.render("login")
    }

    static addUser(req , res){
        const {errors} = req.query
        res.render('register', {errors})
    }

    static createUser(req , res){
        const {username,password,role} = req.body
        User.create({username,password,role})
        .then((result)=>{
            const id = result.dataValues.id
            res.redirect(`/profile/${id}`)
        })
        .catch((err)=>{
        if(err.name === 'SequelizeValidationError'){
            const errors = err.errors.map(e => e.message)
            res.redirect(`add?errors=${errors}`)
        }else{
            res.send(err)
        }   
        })
    }

    static addUserProfile(req,res){
        const {errors} = req.query
        const {id} = req.params
        res.render('profile',{id, errors})
    }

    static createUserProfile(req,res){
        const {id} = req.params
        const {firstName,lastName,dateOfBirth,gender,bloodType,city} = req.body
        UserProfile.create({firstName,lastName,dateOfBirth,gender,bloodType,city, UserId: id})
        .then(()=>{
            res.redirect('/')
        })
        .catch((err)=>{
        if(err.name === 'SequelizeValidationError'){
            const errors = err.errors.map(e => e.message)
            res.redirect(`add?errors=${errors}`)
        }else{
            res.send(err)
        }   
        })
    }

    static getProfile(req , res){
        const {id} = req.params
        UserProfile.findOne({
            include: User,
            where: {UserId: id}
        })
        .then((user)=>{
            res.render('editProfile',{user})
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }

    static editProfile(req , res){
        res.render("profile")
    }

    static showAllDiseases(req,res){
        Disease.findAll()
        .then((diseases)=>{
            res.render('diseases', {diseases})
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }

    static addDisease(req,res){
        res.render('addDisease')
    }

    static createDisease(req,res){
        const {name,description,level} = req.body
        Disease.create({name,description,level})
        .then(()=>{
            res.redirect('/disease')
        })
        .catch((err)=>{
            if(err.name === 'SequelizeValidationError'){
                const errors = err.errors.map(e => e.message)
                res.redirect(`add?errors=${errors}`)
            }else{
                res.send(err)
            }   
        })
    }

    static deleteDisease(req,res){
        const{id}=req.params
        Disease.destroy({where: {id}})
        .then(()=>{
            res.redirect('/disease')
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }

    static addMedicalRecord(req,res){
        const {errors} = req.query
        let patients = ``
        let doctors = ``
        let diseases = ``
        User.findAll({where: {role:'patient'}, include: UserProfile})
        .then((patient)=>{
            patients = patient
            return User.findAll({where: {role:'patient'}, include: UserProfile})
        })
        .then((doctor)=>{
            doctors = doctor
            return Disease.findAll()
        })
        .then((disease)=>{
            diseases = disease
            res.render('addMedicalRecord', {patients, doctors, diseases, errors, fullName, dataUser})
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }

    static createMedicalRecord(req,res){

    }

    static medicalRecordPage(req,res){

    }
}

module.exports = Controller