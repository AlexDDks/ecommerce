const path = require('path')

const controller = {
   index: (req,res) => {
        res.render("index")
   },

   socialMedia: (req,res) => {
      res.render("socialMedia")
   },

   contact:(req,res) => {
      res.render("contact")
   },

   pruebas:(req,res) => {
      res.render("pruebas")
   }
}

module.exports=controller