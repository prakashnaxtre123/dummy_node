const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
const secretKey = "hdjghjhdjghjgdjguyiehb"
app.get("/", (req,res) => {
    res.json({
        message:"A sample api"
    })
})
app.post("/login",async (req,res) => {
    const user =  req.body
    console.log(user)
    jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token) => {
        res.json({
            user,token
        })
    })
})
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== undefined){
        const token = bearerHeader.split(' ')[1]
        req.token = token;
        next()
    }
    else{
        res.send({
            result:'Token is not Valid'
        })
    }
}

app.post("/profile",verifyToken,(req,res) => {
    jwt.verify(req.token,secretKey,(err,authData) => {
        console.log(req.token)
        if(err){
            res.send({result:"Invalid token"})
        }else{
            res.json({
                message:"Profile Accessed",
                authData
            })
        }
    })
})
app.listen(5000,() => {
    console.log("server listen at port 5000")
})