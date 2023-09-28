const{User, UserProfile,Disease,MedicalRecord} = require('../models')
const bcyrpt = require('bcryptjs')
const {getAge, formatIDR , fullName} = require('../helpers/formatter')
const { Op } = require('sequelize')

class Controller{

    static home(req,res){
        res.render('home')
    }

    static login(req , res){
        const {errors} = req.query
        res.render("login", {errors})
    }

    static postLogin(req , res){
        const {username, password} = req.body

        User.findOne({where: {username}})
        .then((user)=>{
            if(user) {
                const isValidPassword = bcyrpt.compareSync(password,user.password)

                if(isValidPassword) {

                    req.session.userId = user.id
                    return res.redirect('/')
                } else {
                    const errors = "Invalid password"
                    return res.redirect(`/login?errors=${errors}`)
                }
            }else{
                const errors = "Invalid username"
                return res.redirect(`/login?errors=${errors}`)
            }
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
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
            res.redirect(`/login`)
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
            if (!user) throw "User not found!"
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

        User.findUser()
        .then((patient)=>{
            patients = patient
            return User.findAll({where: {role:'doctor'}, include: UserProfile})
        })
        .then((doctor)=>{
            doctors = doctor
            return Disease.findAll()
        })
        .then((disease)=>{
            diseases = disease
            res.render('addMedicalRecord', {patients, doctors, diseases, errors, getAge , fullName})
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }

    static createMedicalRecord(req,res){
        const {treatment,cost,diagnosis,dateOfDiagnosis,doctorName,DiseaseId,UserId} = req.body

        MedicalRecord.create({treatment,cost,diagnosis,dateOfDiagnosis,doctorName,DiseaseId,UserId})
        .then(()=>{
            res.redirect('/medicalRecords')
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

    static medicalRecordPage(req,res){
        
        let Search = req.query.PatientId
        let options = {include:Disease , where:{role:'patient'}}
   
        if(Search){
          options.where.id = {[Op.eq]: `${Search}`,}
        }   
        
        User.findAll(options)
        .then((patient)=>{
            res.render('medicalRecord', { patient })
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }

    static medicalRecordDetail(req , res){
        console.log(req.params);
        const {UserId ,DiseaseId }=req.params

        let users = ``
        let diseases = ``
        let records = ``

        MedicalRecord.findAll({where:{UserId,
            DiseaseId }})
        .then((record)=>{
            console.log(record);
            records = record
            return User.findOne({where:{id:UserId},include:UserProfile})
        })
        .then((user)=>{
            if (!user) throw "User not found!"
            users = user
            return Disease.findOne({where:{id:DiseaseId}})
        })
        .then((disease)=>{
            if (!disease) throw "Disease not found!"
            diseases = disease
            res.render("medicalRecordDetail" , {records,users,diseases , fullName ,getAge, formatIDR})
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })

    }

}

module.exports = Controller