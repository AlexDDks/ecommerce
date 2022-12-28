const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
   shoppingCar: (req,res) => {
        res.render("shoppingCar")
   },
 products:(req,res) => {
     res.render("products", {products})
   }
}

module.exports=controller