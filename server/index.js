const express = require('express')
const PORT= 3333
let app = express()

app.get('/', (req, res)=>{
    res.send("hello World")
})

app.listen(PORT, ()=>{
    console.log("Started application on port %d", PORT)
})