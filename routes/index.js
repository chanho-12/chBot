var express = require('express');
var router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

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

var getList = []

router.post("/sayPost", function (req, res) {
  console.log(req.body);
  const responseBody = {};
  var type = req.body.prompt.split(' ');
  console.log("type", type[0], type[1])
  if (type[1] == undefined) { 
    responseBody.name = type[1];
    return res.status(200).send(responseBody);
  }

  if (type[0] == '정보') {
    responseBody.type = type[0];
    // responseBody.name = type[1];
    responseBody.job = "소서리스";
    responseBody.level = "1628";
    responseBody.server = "아브렐슈드";
    
    return getInfo(req , res, type[1])
    // new Promise((resolve) => { 
    //   getInfo(type[1]);
    // }).then((response) => { 
    //   console.log("response", response);
    //   return res.status(200).send(response);
    // }).catch((er) => { 
    //   return res.status(200).send(er);
    // })
    // return function () { 
    //   getInfo(type[1], res);
    // }
    // getInfo({
    //   char: type[1]
    // })
    //   .then((response) => {
    //   console.log("response!!", response)
    //   return res.status(200).send(response);
    //   })
    //   .catch((e) => { 
    //   return res.status(200).send(e);
    //   })
    // return res.status(200).send(getInfo(type[1])); 
  }


});

const getInfo = async (req, res, char) => {
  try {
    console.log("char", char);
    let ulList = [];
    const html = await axios.get(
      // "https://loawa.com/char/내쏘서뤼스"
      "https://iloa.gg/character/" + char
    );
    // 2
    // console.log("###############3", html.data)
    const $ = cheerio.load(html.data);
    // 3
    // const bodyList = $("div.absolute top-0 -left-0.5");
    const bodyList = $("div.flex.flex-col.w-full");

    bodyList.map((i, element) => {
      ulList[i] = {
        server: $(element)
          .find("p.space-x-2.text-xs span.inline-block:nth-child(1)")
          .text(),
        job: $(element)
          .find("p.space-x-2.text-xs span.inline-block:nth-child(2)")
          .text(),
        name: $(element).find("p.text-2xl").text(),
        chingho: $(element).find("p.text-sm.opacity-70").text(),
        level: $(element)
          .find(
            "div.absolute.flex.space-x-6.bottom-7 div:nth-child(1) div:nth-child(2).text-xl"
          )
          .text(),
        warLevel: $(element)
          .find(
            "div.absolute.flex.space-x-6.bottom-7 div:nth-child(2) div:nth-child(2).text-xl"
          )
          .text(),
        travelLevel: $(element)
          .find(
            "div.absolute.flex.space-x-6.bottom-7 div:nth-child(3) div:nth-child(2).text-xl"
          )
          .text(),
        guild: $(element)
          .find("div.absolute.right-0.top-14 div span:nth-child(1)")
          .text(),
        og: $(element)
          .find("div.absolute.right-0.top-14 div span:nth-child(3)")
          .text(),
        pvp: $(element)
          .find("div.absolute.right-0.top-14 div span:nth-child(5)")
          .text(),
        th: $(element)
          .find(
            "div.flex-1.flex.gap-4.justify-between div:nth-child(1) p.text-lg"
          )
          .text(),
        cm: $(element)
          .find(
            "div.flex-1.flex.gap-4.justify-between div:nth-child(2) p.text-lg"
          )
          .text(),
        ss: $(element)
          .find(
            "div.flex-1.flex.gap-4.justify-between div:nth-child(3) p.text-lg"
          )
          .text(),
        jobType: $(element)
          .find(
            "div.flex.flex-col.bg-negative.py-2 div:nth-child(1) p.text-positive-less.text-sm.leading-none.w-full"
          )
          .text(),
        elixir: $(element)
          .find(
            "div.cursor-pointer:nth-child(2) div.flex.items-center.gap-4 div.space-y-1 p:nth-child(1)"
          )
          .text(),
        elixir2: $(element)
          .find(
            "div.cursor-pointer:nth-child(2) div.flex.items-center.gap-4 div.space-y-1 p:nth-child(2)"
          )
          .text(),
        gemstone: $(element)
          .find(
            "div.flex.flex-col.flex-1.gap-4 div:nth-child(2) div.flex.justify-between.cursor-pointer.select-none div.flex.items-center.gap-2 span:nth-child(3)"
          )
          .text(),
        card: $(element)
          .find(
            "div.flex.flex-col.flex-1.gap-4 div:nth-child(3) div.flex.justify-between.cursor-pointer.select-none div.flex.items-center.gap-2 span:nth-child(1)"
          )
          .text(),
      };
      console.log("type", typeof(ulList[0]));
      console.log("bodyList : ", ulList[0]);
    });
    // return getList.push(ulList[0]);
    return res.status(200).send(ulList[0]);
    
    // return ulList[0];
  } catch (error) {
    console.error(error);
    return res.status(200).send({});
  }
};

router.post("/crawling", function (req, res) {
  console.log("req.body", req.body);
  const responseBody = {};
  
  var char = '내쏘서뤼스'
  console.log(getInfo(type[1]));
})


module.exports = router;
