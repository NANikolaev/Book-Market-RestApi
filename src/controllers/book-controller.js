const router = require('express').Router();
let bookService=require("../services/book-service")

router.route("/books/catalog")

.get((req,res)=>{
    bookService.allBooks()
    .then(catalog=>res.json(catalog))
})

.post((req,res,next)=>{

    let bookData={...req.body,owner:req.user.id}
    bookService.createBook(bookData)
    .then(book=>res.json(book))
    .catch(err=>next(err))

})

router.route('/book/:bookId')

.put((req,res,next)=>{

    let bookId=req.params.bookId
    let book=req.body
    bookService.updateBook(bookId,book)
    .then(newBook=>res.json(newBook))
    .catch(err=>next(err))
})

.patch((req,res)=>{
    let bookId=req.params.bookId
    let user=req.body
    bookService.getSpecificBook(bookId,user)
    .then(book=>res.json(book))
})
.post((req,res)=>{

    let bookId=req.params.bookId 
    let comment={
        username:req.user.username,
        comment:req.body.comment
    }
    bookService.postComment(bookId,comment)
    .then(book=>res.json(book.comments))
})
.delete((req,res)=>{
    let bookId=req.params.bookId
    bookService.del(bookId)
    .then(()=>res.json({}))
})





module.exports = router