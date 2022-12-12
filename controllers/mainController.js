const path = require('path')

const controller = {
   index: (req,res) => {
        res.render("index")
   },

   socialMedia: (req,res) => {
      res.render("socialMedia")
   }
}

module.exports=controller