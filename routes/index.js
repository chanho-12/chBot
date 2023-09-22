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
  const responseBody = {};
  var type = req.body.prompt.split(' ');
  console.log("type", type[0], type[1])
  if (type[0] == '정보') {
    responseBody.type = type[0];
    responseBody.name = type[1];
    responseBody.job = "소서리스";
    responseBody.level = "1628";
    responseBody.server = "아브렐슈드";
    
  }

  res.status(200).send(responseBody);
});
module.exports = router;
