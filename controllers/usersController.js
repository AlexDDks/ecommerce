const path = require('path')

const controller = {
   login: (req,res) => {
        res.render("login")
   },
   
   register: (req,res) => {
        res.render("register")
   },

   restore: (req,res) => {
     res.render("restorePassword")
}
}

module.exports=controller