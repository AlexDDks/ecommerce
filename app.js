const express = require("express"); // We require from Node the "express" framework 
const app = express(); // We invoke the variable express and save the funcionality of it in the const app

const path = require("path"); // We require from Node the native module path
const publicPath = path.resolve(__dirname, "./public"); // We save the funcionality of the method resolve in publicPath in order to have a public folder

app.use(express.static(publicPath)) // Using the method static we tell to express where the direction of public folder is


app.set('view engine', 'ejs'); // We are using the EJS view engine, so we tell it to Express

// POST lines
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//PUT-DELETE lines
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// Routes
const mainRouter = require("./routes/mainRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")
// const servicesRouter = require("./routes/servicesRouter")

// Paths
app.use("/", mainRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)
// app.use("/services", servicesRouter)

// 404 error set
app.use((req, res, next) => {
    res.status(404).render('not-found')
})

// Server
app.listen(3000, () => { // Whit the listen method, we created a server in the port 3000. In order to figured out if the server is working, we can add a message in console that is gonna be shown only if rhe server is running
    console.log("Server has been created in port 3000")
})

