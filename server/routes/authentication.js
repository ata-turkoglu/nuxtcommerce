const router = require("express").Router()
const User = require("../models/user")
const verifyToken = require("../middleware/verify-token")
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
//const { response } = require("express")


router.post("/authentication/signup", async (req,res)=>{
    if(!req.body.email || !req.body.password){
        response.json({
            success:false,
            message:"check email and password"
        })
    }else{

        try {

            let newUser = new User({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                phone : req.body.phone,
                address : req.body.address,
            })
            
            let result = await newUser.save()
            console.log("result",result)
            
            let token = jsonwebtoken.sign(newUser.toJSON(),process.env.SECRET_KEY,{
                expiresIn:31536000
            })
    
            res.json({
                success:true,
                token:token,
                message:"user is created successfully..."
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success:false,
                message:error.message,
                error:res
            })
        }

    }
})

router.post("/authentication/signin", async (req,res)=>{
    try {
        await User.findOne({email:req.body.email})
        .then(user=>{
            if(!user) return res.status(400).json({massage:"user not found"})

            let token = jsonwebtoken.sign(user.toJSON(),process.env.SECRET_KEY,{
                expiresIn: 31536000
            });
            
            bcrypt.compare(req.body.password,user.password,(err, data)=>{
                if(err) throw err
                
                if(data){
                    return res.status(200).json({massage:"login success",token:token,user:user})
                }else{
                    return res.status(401).json({massage:"error"})
                }
            })
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

module.exports = router