const jwt = require("jsonwebtoken")

const checkToken = (req,res,next)=>{
        const authToken = req.headers['authorization']
        const token = authToken.split(" ")[1]
        
        if(!token) res.send({message: "no token in authorization"})
    
        const verify = jwt.verify(token, process.env.JWT_PASS)
        
        if(verify){
            next()
        }else{
            res.send({message:"token not found"})
        }

    }


module.exports = checkToken