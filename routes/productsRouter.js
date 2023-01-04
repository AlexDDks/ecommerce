const express = require("express") 
const router = express.Router() 
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');

// Requires
const productsController=require("../controllers/productsController") 

//Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/img/products/selectProducts'))
  },

  filename: function (req, file, cb) {
    const nombre = file.originalname
    let idx = -1
    for (let i = nombre.length - 1; i >= 0; i--) {
      const char = nombre[i]
      if (char === '.') {
        idx = i
        break;
      }
    }  
    const name = nombre.slice(0, idx)
    const ext = file.mimetype.split['/']
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage })

//Validations
const validateEditForm = [
  body("name").notEmpty().withMessage("You must fill the name"),
  body("price").notEmpty().withMessage("You must fill the price").bail()
  .isNumeric().withMessage("It needs to be a number"),
  body("discount").notEmpty().withMessage("You must fill the discount").bail()
  .isNumeric().withMessage("It needs to be a number"),
  body("msi").notEmpty().withMessage("You must fill the MIF").bail()
  .isNumeric().withMessage("It needs to be a number"),
  body("description").notEmpty().withMessage("You must fill the description"),
];

const validateCreateForm = [
  body("name").notEmpty().withMessage("You must fill the name"),
  body("price").notEmpty().withMessage("You must fill the price").bail()
  .isNumeric().withMessage("It needs to be a number"),
  body("discount").notEmpty().withMessage("You must fill the discount").bail()
  .isNumeric().withMessage("It needs to be a number"),
  body("mif").notEmpty().withMessage("You must fill the MIF").bail()
  .isNumeric().withMessage("It needs to be a number"),
  body("description").notEmpty().withMessage("You must fill the description"),
  body("avatar").custom((value, {req}) => {
    let file =req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];
    
    if(!file){
      throw new Error ("You must uppload an image");
    }
    else{
    let fileExtension = path.extname(file.originalname);
    if(!acceptedExtensions.includes(fileExtension)){
    throw new Error ("The image extension accepted are: jpg, png and gif ");
    }
    }
    return true;
  })
];

// CRUD
// Get
router.get("/",productsController.products) 
router.get("/create",productsController.createForm) 
router.get("/shoppingcar",productsController.shoppingCar)
router.get("/detail/:id",productsController.detail)
router.get("/edit/:id",productsController.editForm) 

// Post
router.post('/create', upload.single('image'), validateCreateForm, productsController.createStore);

// Put
router.put('/edit/:id', validateEditForm, productsController.editUpdate);

// Delete
router.delete('/delete/:id', productsController.delete);

module.exports=router 