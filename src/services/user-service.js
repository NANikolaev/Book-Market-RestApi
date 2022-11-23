const User = require('../models/User');
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');
const secret = require('../configurations/secret');
const bcrypt = require('bcrypt');


function register(userdata) {
   
    return User.create(userdata)
        .then(user => {
            let payload = {
                username: user.username,
                id: user._id,
            }
            let accessToken = jwt.sign(payload, secret, { expiresIn: '1d' })
            return {...payload,accessToken:accessToken}
        })

}
function login(userdata) {
   
   return User.findOne({username:userdata.username})
         .then(user=>{
            if(!user){throw new Error('Invalid Email/Password')}
            let isValid = bcrypt.compareSync(userdata.password, user.password)
            if (!isValid) {throw new Error('Invalid Email/Password')}
            let payload = {
                username: user.username,
                id: user._id,
            }
            let accessToken = jwt.sign(payload, secret, { expiresIn: '1d' })
            return {...payload,accessToken:accessToken}
         })

}

function add(bookId,userId){
     return User.findById(userId).lean()
     .then(user=>{
         let isIn=user.orders.find(x=>x == bookId)
         if(isIn){throw new Error("Book is already added to cart!")}
         user.orders.push(bookId)
         return User.findByIdAndUpdate(userId,user)
     })
}

function getCartContent(userId){
    return User.findById(userId).lean().populate("orders")
           .then(user=>{return user.orders})
}
function getOffers(userId){
    return Book.find({owner:userId}).lean()
}

function remove(bookId,userId){
    return User.findById(userId).lean()
           .then(user=>{
             let filteredOrders=user.orders.filter(x=>x != bookId)
             user.orders=filteredOrders
             return User.findByIdAndUpdate(userId,user,{new:true}).populate("orders")
           })
}
function makeOrder(userId){
    return User.findById(userId)
        .then(user=>{
            user.orders=[]
            return User.findByIdAndUpdate(userId,user)
        })
}

module.exports = {
    register,
    login,
    add,
    remove,
    getCartContent,
    getOffers,
    makeOrder
    
}