const express = require("express") //We required the framework Express in order to use all its methods
const router = express.Router() //We executed the Router method, saving its properties in the const router

const mainController=require("../controllers/mainController") //We required the module that we have already export in the main controller

router.get("/",mainController.index) //By the const router, all the requirements by the clients to this will be send to the controller and its propertie
router.get("/socialMedia",mainController.socialMedia) //By the const router, all the requirements by the clients to this will be send to the controller and its propertie
router.get("/contact",mainController.contact) //By the const router, all the requirements by the clients to this will be send to the controller and its propertie


router.get("/pruebas",mainController.pruebas) //By the const router, all the requirements by the clients to this will be send to the controller and its propertie

module.exports=router //We must export the variable router in order of being required in the entry point paths