// Middleware is used when we run some function in which logged in required.
var jwt = require('jsonwebtoken');//for token
const JWT_SECRET='Harryis';
const fetchuser=(req,res,next)=>{
    // get the user from the jwt token and add id to req object
    const token=req.header('auth-token'); // header was named as 'auth-token'
    if(!token)
    {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try{
        const data = jwt.verify(token,JWT_SECRET); // data is payload
        req.user=data.user;
        next();
    }
    catch(error){
        res.status(401).send({error:"Please autenticate using a valid token"});
    }
}
module.exports=fetchuser;