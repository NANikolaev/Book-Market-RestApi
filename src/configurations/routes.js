const userController=require('../controllers/user-controller');
const bookController=require('../controllers/book-controller');
const uploadController=require('../controllers/upload-cover-controller');

module.exports=(server)=>{
    server.use(uploadController)
    server.use(userController)
    server.use(bookController)   
}