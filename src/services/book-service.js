let Book = require('../models/Book');

function allBooks() {
    return Book.find({}).lean()
}

function createBook(bookData) {
    return Book.create(bookData)
}

function updateBook(bookId,book){
    
    return Book.findOneAndUpdate({_id:bookId},book,{new:true})
           
}
function del(bookId){
    return Book.findByIdAndDelete(bookId)
}

function getSpecificBook(bookId, user) {

    return Book.findById(bookId)
        .then(book => {
            if (user && user.id !== book.owner.toString()) {
                book.views+=1
               return Book.findByIdAndUpdate(bookId,book,{new:true})
            }
            return book
        })
}

function postComment(bookId,comment){
       return Book.findById(bookId)
        .then(book=>{
            book.comments.push(comment)
            return Book.findByIdAndUpdate(bookId,book,{new:true})
        })
}


module.exports = {
    createBook,
    updateBook,
    del,
    allBooks,
    getSpecificBook,
    postComment
}