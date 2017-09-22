var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

  if(req.protocol === 'https') {
    res.status(200).send('Welcome to Safety Land!');
  }
  else {
    res.status(200).send('Welcome!');
  }

});


router.get('/test', function(req, res, next) {
  res.json({title:"你好啊"});
});

router.get('/test2', function(req, res, next) {
  res.json({title:"test2"});
});

module.exports = router;
