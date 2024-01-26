const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');      //for secure communication between client and server
var fetchuser=require("../middleware/fetchuser");
const JWT_SECRET='Harryis'; //we can put any string here for verfiy signature of token
const router = express.Router();
//Route 1:Create a User using: POST "/api/auth/createuser", No login required
router.post('/createuser',
 [body('name', 'Name must be in atleast 3 character').isLength({ min: 3 }),
   body('password', 'Password must be in at least 5 characters').isLength({ min: 5 }),
   body('email', 'Enter a valid email').isEmail()], 
   async (req, res) => {
      // If there are errors in length of name, password or email format, return Bad request and the errors
      let success=false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({success,errors: errors.array() });
      }

      try {
         //check whether the user with this email exist already
         let user = await User.findOne({ email: req.body.email });
         if (user) {
            return res.status(400).json({ success,error: "Sorry auser with this email already exits" });
         }
         const salt=await bcrypt.genSalt(10);
         const secPass=await bcrypt.hash(req.body.password,salt);
         //Create a new user
         user = await User.create({
            name: req.body.name,
            password:secPass,
            email: req.body.email
         })
         const data={
            user:{
               id:user.id
            }
         }
         const authtoken=jwt.sign(data,JWT_SECRET);
         // console.log(jwtData);
         success=true;
         res.json({success,authtoken});
      } catch (error) {
         console.error(error.message);
         res.status(500).send("Some error occured");
      }
   })

   //Route 2: Authenticate a User using: POST "/api/auth/login", No login required
   router.post('/login', [
     
      body('email', 'Enter a valid email').isEmail(),
      body('password', 'Password can not be empty').exists()],
      
      async (req, res) => {
         let success=false;
          // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const {email,password}=req.body;
      try{
         let user=await User.findOne({email});
         if(!user)
         {
            return res.status(400).json({error:"Please try to login with correct Credentials"});
         }
         const passwordCompare=await bcrypt.compare(password,user.password);
         if(!passwordCompare)
         {
            success=false;
            return res.status(400).json({success,error:"Please try to login with correct Credentials"});
         }
         const data={
            user:{
               id:user.id
            }
         }
         const authtoken=jwt.sign(data,JWT_SECRET);
         success=true;
         res.json({success,authtoken});
      }catch(error){
         console.error(error.message);
         res.status(500).send("Internal Server Error");
      }
      })
      //Route 3: Get Logged in User Details using: POST "/api/auth/getuser",login required
      
         router.post('/getuser',fetchuser, 
            async (req, res) => {
               try{
                  const userId=req.user.id; 
                  const user = await User.findById(userId).select("-password"); // select user info expect password
                  res.send(user);
               }
               catch{
                  console.error(error.message);
                  res.status(500).send("Internal Server Error");
               }
            })
      
      
module.exports = router