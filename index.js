const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./models/User');
const Donor = require('./models/Donor');

require('dotenv').config();

app.use(cors({
  origin: "https://dagmawit27.github.io"
}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
  .then(()=>{ console.log("DATABASE CONNECTED SUCCESSFULLY")})
  .catch((err)=>{ console.log("ERROR HAPPEND" + err)});

app.get('/', (req, res) => { 
  res.send('It works!');
});
app.post('/register', async (req, res)=>{
  try{
    const {firstName,
      secondName,
      lastName,
      dob,
      username,
      password,
      contact,
      email,
      bloodGroup,
      address,
    } = req.body;
    console.log({firstName,
      secondName,
      lastName,
      dob,
      username,
      password,
      contact,
      email,
      bloodGroup,
      address
    });

    const newDonor = await Donor.create({
      firstName,
      secondName,
      lastName,
      dob: new Date(dob),
      contact,
      email,
      bloodGroup,
      address
    })
    
    const newUser = await User.create({
      username, password, email, userId: newDonor._id,  role: 'donor'
    }) 
  res.status(200).json({success: true, message: "Data received successfully", username: newUser.username, email: newUser.email, donorId: newDonor._id});

  }catch(err){
    console.log("Error in /register route: ", err);
    res.status(500).json({success: false, message: "Internal Server Error"});
  }
 
})
app.post('/login', async (req, res)=>{
  try{
    const {username, password}= req.body;

    if(!username || !password){
      res.status(400).json({success: false, message: 'username and password are required'})
    }

    const user = await User.findOne({username: username.trim()});

    if(!user){
      res.json({success: false, message: 'Invalid username or password'})
    } else if(user.password !== password){
      res.json({success: false, message: 'Invalid username or password'})
    } else {
      res.json({success: true, message: 'Login successful', username: user.username, email: user.email, donorId: user.userId});
    }
  }catch(err){
    res.json({success: false, message: "Internal Server Error"});
  }
})
app.get('/donor/check-username', async (req,res)=>{
  const {username} = req.query;

  if(!username){
    res.json({success: false, available: false, message: 'Username is required'})
  }
  try{
    const findUsername = await User.findOne({username: username.trim()});
    
    if(findUsername){
    res.json({
      success: true,
      available: false,
      message: 'Username is not available'
    })} else if(!findUsername){
      res.json({
        success: true,
        available: true,
        message: 'Username is available'
      })
    }
  }catch(error){
    res.status(500).json({
      success:false,
      message: 'Server error while checking username'
    })
  }
    
})
app.listen(port, () => {
  console.log(`backend app listening at http://localhost:${port}`);
});
console.log("hey there");