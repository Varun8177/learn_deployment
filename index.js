const express = require("express")
const Connection = require("./config/db")
const NotesRouter = require("./routes/notes.route")
const userRouter = require("./routes/user.routes")
const swaggerJSdoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")
const cors = require("cors")
const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())

// app.get("/", (req, res) => {
//     res.send({
//         "message": "Home Page"
//     })
// })

app.use("/users", userRouter)
app.use("/notes", NotesRouter)


// defination
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Notes app API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ["./routes/*.js"]
}

// specification 
const swaggerSpec = swaggerJSdoc(options)

// building the UI
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpec))


app.listen(process.env.port, async () => {
    try {
        await Connection
        console.log("Connected to Database")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Server running at port ${process.env.port}`)
})