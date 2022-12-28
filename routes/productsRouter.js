const express = require("express") //We required the framework Express in order to use all its methods
const router = express.Router() //We executed the Router method, saving its properties in the const router

const productsController=require("../controllers/productsController") //We required the module that we have already export in the main controller

router.get("/",productsController.products) //By the const router, all the requirements by the clients to this will be send to the controller and its propertie
router.get("/shoppingcar",productsController.shoppingCar) //By the const router, all the requirements by the clients to this will be send to the controller and its propertie

module.exports=router //We must export the variable router in order of being required in the entry point paths