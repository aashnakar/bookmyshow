var express = require('express');
var router = express.Router();

/* GET home page. */
var messagebird = require('messagebird')('igKAgJcNbe0NHCJBV4qoty7mF')
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/step2',(req,res) =>{

var number = req.body.number
messagebird.verify.create(number, {
  temp:"Your Verification Code is %token"

},function(err,response) {
  if (err){
    console.log(err);
    res.render('index', {
      error:err.errors[0].description
})
  }
  else{
    console.log(response);
    res.render('otp', {
      id:response.id

    })
  }
}

)
})
router.post('/step3', (req,res) => {
var id = req.body.id;

var token = req.body.token;

messagebird.verify.verify(id, token, (err,response)=>{
if (err){
  error: err.errors[0].description
  res.send(err)

}

else {
  res.render('success')
}

})
})

module.exports = router;
