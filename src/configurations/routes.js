const userController=require('../controllers/user-controller')
const bookController=require('../controllers/book-controller')

module.exports=(server)=>{
    server.use(userController)
    server.use(bookController)
    
}