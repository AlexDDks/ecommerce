const {validationResult} = require("express-validator")

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
   },

  detail: (req, res) => {
    const id = req.params.id 
    const product = products.find(element => element.id == id)  //
    const { discount, price } = product; 
    const finalPrice = discount * price /100; 
    product.finalPrice = price-finalPrice;
    res.render("detail", { product})
  },

  editForm: (req, res) => {
    const id = req.params.id
    const product = products.find(element => element.id == id)
    res.render("editForm", { product })
  },

  editUpdate: (req, res) => {
    //Upload news of the product
    //Sending the error if those exist
    const resultValidation = validationResult(req);

    const id = req.params.id;
    const product = products.find(element => element.id == id);
    if (resultValidation.errors.length > 0) { //Errors its an array with one index per every error (input in the form where whe placed a middleware)
        res.render("editForm", {errors:resultValidation.mapped(), product, old:req.body})
    }
        
    else{
      const id = req.params.id
      const idx = products.findIndex(element => element.id == id) 
      products[idx] = {
      id, 
      ...req.body,
      image: products[idx].image} 
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
      res.redirect("/products/detail/" + id)
    }
  },

  createForm: (req, res) => {
    res.render("createForm")
  },

  createStore: (req,res) => {
    const resultValidation = validationResult(req);
    const id = req.params.id;
    const product = products.find(element => element.id == id);
    if (resultValidation.errors.length > 0) { //Errors its an array with one index per every error (input in the form where whe placed a middleware)
        res.render("createForm", {errors:resultValidation.mapped(), product, old:req.body})
    }
    else{
        const newProduct = {
        id: products[products.length - 1].id + 1, 
        ...req.body,  
        image: req.file.filename
        }
        products.push(newProduct) 
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' ')) 
        res.redirect("/products") 
    }
  },

  delete: (req, res) => {
    const id = req.params.id
    const idx = products.findIndex(p => p.id == id)
    products.splice(idx, 1) 
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
    res.redirect("/products")
  }
}

module.exports=controller