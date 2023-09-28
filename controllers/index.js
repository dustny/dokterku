class Controller{
    static home(req , res){
        res.render("home")
    }

    static register(req , res){
        res.send("ini register")
    }

    static profile(req , res){
        res.render("profile")
    }
}

module.exports = Controller