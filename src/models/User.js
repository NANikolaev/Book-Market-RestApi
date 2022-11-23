const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const Book=require('./Book')


let userSchema=new mongoose.Schema({
    username:{
       type:String,
       unique:[true],
       required:[true,'Username is required'],
       minLength:[5,'Username should be at least 5 characters long']
    },
    email:{
       type:String,
       unique:[true,],
       required:[true,'Email is required'],
       validate:[/^[\w-]+@[a-zA-Z]+[.][a-z]+$/,'Invalid email adress']
    },
    password:{
       type:String,
       required:[true,"Password is required"],
       minlength:[4,'Password should be at least 4 characters long'],
    },
    orders:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    offers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
})


userSchema.pre('save',function (next){
    bcrypt.hash(this.password,8)
    .then(pass=>{
      this.password=pass
      next()
    })
    
})

const User=mongoose.model('User',userSchema)
module.exports=User