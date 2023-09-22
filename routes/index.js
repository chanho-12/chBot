var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get("/sayGET", function (req, res) {
  console.log(req.body);
  const responseBody = {
    'name' : '내쏘서뤼스 GET' 
    
  };
  res.status(200).send(responseBody);
});

router.post("/sayPost", function (req, res) {
  console.log(req.body);
  const responseBody = {
    name: "내쏘서뤼스 Post",
  };
  res.status(200).send(responseBody);
});
module.exports = router;
