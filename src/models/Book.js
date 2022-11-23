const mongoose=require('mongoose');
const User=require('./User')


let bookSchema=new mongoose.Schema({

    title:{
     type:String,
     required:[true,'Title is required'],
     minLength:[2,'Title should be at least 2 characters long']
    },
    pages:{
     type:Number,
     required:[true,'Page numbers are required'],
     min:[5,"Expecting minimum 5 pages for book"],
     
    },
    author:{
     type:String,
     required:[true,'Author is required'],
    },
    image:{
     type:String,
     required:[true,'Image Url is required'],
     validate:[/^[http?s]+:\/\//,'Invalid Url adress']
    },
    price:{
     type:String,
     required:[true,'Price is required'],
     validate:[/^[0-9]+[.][0-9]{2}$/m,'Invalid price format ']
    },
    year:{
        type:Number,
        required:[true,'Year is required'],
        min:[1000,"Enter correct book year"],
        max:[2022,"Enter correct book year"]
       },
    genre:{
        type:String,
        required:[true,'Genre is required'],
    },
    description:{
        type:String,
        required:[true,'Description is required'],
        minLength:[15,"Description should be at least 15 characters"]

    },
    comments:[],
    views:{
        type:Number,
        default: 0
    },
    owner:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  
 })
 bookSchema.pre("save",function(next){
       this.title=this.title.trim()
       this.author=this.author.trim()
       this.image=this.image.trim()
       this.description=this.description.trim()
       next()
 })
 
 bookSchema.pre('findOneAndUpdate', function(next) {
     this.options.runValidators = true;
     next();
   });
 




const Book=mongoose.model('Book',bookSchema)

module.exports=Book