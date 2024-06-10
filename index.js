const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./Models/Employee')

const app = express()
app.use(express.json())
app.use(cors())

// mongoose.connect("mongodb://127.0.0.1:27017/employee")

const connctDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://sangharshwase786:sangharsh@cluster0.t6s4ncd.mongodb.net/Employee?retryWrites=true&w=majority&appName=Cluster0");
    console.log("datbase created");
  } catch (error) {
    console.log("something went wrong");
  }
};



app.post('/login',(req,res)=>{
  const {email,password} = req.body;
  EmployeeModel.findOne({email:email})
 .then(user =>{
  if(user){
    if(user.password === password){
      res.json("Success")
    }else{
      res.json("Something went wrong!....")
    }
  }else{
    res.json("No Record Existed");
  }
 })
  
})



app.post('/register',(req,res)=>{
  EmployeeModel.create(req.body)
  .then(employees =>res.json(employees))
  .catch(err => res.json(err))
})



app.listen(4300,()=>{
  console.log("server is started");
  connctDb();
})