const router = require('express').Router();
const userService = require("../services/user-service")

router.get('/',(req,res)=>{
  res.send('Hello World')
  res.end()
})

router.post('/users/login', (req, res, next) => {
  let userData = req.body

  userService.login(userData)
    .then(user => { res.json(user) })
    .catch(err => next(err))

})
router.post('/users/register', (req, res, next) => {
  let userData = req.body

  userService.register(userData)
    .then(user => { res.json(user)})
    .catch(err => next(err))

})

router.route("/user/cart")

  .get((req, res) => {
    let userId = req.user.id
    userService.getCartContent(userId)
      .then(orders => res.json(orders))
  })
   .put((req,res)=>{
    let userId = req.user.id
    userService.makeOrder(userId)
     .then(user=>res.json([]))
   })

  .post((req, res, next) => {
    let bookId = req.body.bookId
    let userId = req.user.id
    userService.add(bookId, userId)
      .then(user => res.json({}))
      .catch(err => next(err))
  })
  .delete((req,res)=>{
    let bookId = req.body.bookId
    let userId = req.user.id
    userService.remove(bookId,userId)
     .then(user=>res.json(user.orders))
  })


router.route("/user/offers")

.get((req,res)=>{
    let userId=req.user.id
    userService.getOffers(userId)
    .then(offers=>res.json(offers))
})


module.exports = router