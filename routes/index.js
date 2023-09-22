var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get("/sayHello", function (req, res) {
  console.log(req.body);
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "hello I'm Ryan",
            info: "내쏘서뤼스"
          },
        },
      ],
    },
  };
  res.status(200).send(responseBody);
});
module.exports = router;
