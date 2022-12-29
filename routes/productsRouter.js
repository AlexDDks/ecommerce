const express = require("express") 
const router = express.Router() 
const path = require('path');
const multer = require('multer');

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

const productsController=require("../controllers/productsController") 

// Get
router.get("/",productsController.products) 
router.get("/create",productsController.createForm) 
router.get("/shoppingcar",productsController.shoppingCar)
router.get("/detail/:id",productsController.detail)
router.get("/edit/:id",productsController.editForm) 

// Post
const upload = multer({ storage })
router.post('/create', upload.single('image'), productsController.createStore);

// Put
router.put('/edit/:id', productsController.editUpdate);

// Delete
router.delete('/delete/:id', productsController.delete);

module.exports=router 