const express = require("express")
const { exec } = require('node:child_process')
const bodyparser = require("body-parser")
const app = express()
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.raw());
// const {connection } = require("./dbConnection/connection")
// // connection()
const router = require("./Router/router")
const path = require("path")
app.set('view engine' , 'ejs')
app.use(express.static(path.join(__dirname , 'public')))
app.use('/api',router)

app.listen(5001 , ()=>{
    console.log("Server Running")
    exec('start chrome.exe --new-window "http://localhost:5001/api/sendmail"')
})