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

  if (type[0] == "정보") {
    responseBody.type = type[0];
    // responseBody.name = type[1];
    responseBody.job = "소서리스";
    responseBody.level = "1628";
    responseBody.server = "아브렐슈드";

    return getInfo(req, res, type[1], type[0]);
  } else if (type[0] == "부캐") {
    return getSiblings(req, res, type[1], type[0]);
  } else if (type[0] == "주급") {
    return getWeeklyPay(req, res, type[1], type[0]);
  } else if (type[0] == "내실") {
    return getInner(req, res, type[1], type[0]);
  } else if (type[0] == "보석") {
    return getGems(req, res, type[1], type[0]);
  } else if (type[0] == "장비" || type[0] == "초월") {
    return getEq(req, res, type[1], type[0]);
  } else if (type[0] == "각인") {
    return getEngraving(req, res, type[1], type[0]);
  }


});

const getInfo = async (req, res, char, command) => {
  try {
    console.log("char", char, command);
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

    if (bodyList.length == 0) {
      
      return res.status(200).send({  command, name: undefined });
    }
    bodyList.map((i, element) => {
      ulList[i] = {
        command: command,
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
        braceletStat: $(element)
          .find(
            "div.cursor-pointer:nth-child(1) div.mb-3.flex.items-center.gap-3 span"
          )
          .text(),
        braceletStat2: $(element)
          .find(
            "div.cursor-pointer:nth-child(1) div.flex.items-center.gap-4 div.space-y-1 span"
          )
          .text(),
      };
      console.log("type", typeof ulList[0]);
      console.log("bodyList : ", ulList[0]);
    });

    // return getList.push(ulList[0]);
    return res.status(200).send(ulList[0]);

    // return ulList[0];
  } catch (error) {
    console.error("error", error);
    return res.status(200).send({ name: undefined });
  }
};


const getSiblings = async (req, res, char, command) => {
  try {
    console.log("char", char, command);
      var url =
      "https://developer-lostark.game.onstove.com/characters/" + char + "/siblings";

    const sib = await axios.get(url, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNjYzMzMifQ.CUi0sR_SSEPPaLAkJLEfF3rM3Kw_wJ_PhldbAe_iqMBQJXs1YilYfphyJUVM96zlCwQJ4cjiTlpfg0lTKkpinBcGZEI9k85tc5ovCV6p35TDifhJcxkWdDKlJbCgs6CY5s3UJ5lNI5MKBmW_QrWJfJNzPK2Nff0nECazs_wrT-Jnzg9LXzWRsjbql4FLYjM0NehtI2Ll5o0CcuzYqGKvQkDfs52QQ-640pYJ2WdllW7f65_5FzjJ-kGe-7JoriBUcIlsr7xUQJOH_2uVh8t7ErUtT_K2TAslwFrY4TWr-x521Aw2ugSAqTzWZSjZIz7zi5cASSjgnlSVnOj-6gDrrA",
      },
    });

    console.log("sib", sib.data);
    if (sib.data == null) { 
      NullData = [(command = command), (data = {})];
      return res.status(200).send(NullData);
    }
    sib.data.sort(function (a, b) { 
      return b.ItemAvgLevel - a.ItemAvgLevel;
    })
    console.log("newsib", sib.data);
    
    var data = [
      command = command,
      data = sib.data
      
    ]
    
    console.log("data", data);


    // return getList.push(ulList[0]);
    return res.status(200).send(data);

    // return ulList[0];
  } catch (error) {
    console.error("error", error);
    return res.status(200).send({ name: undefined });
  }
};


const getWeeklyPay = async (req, res, char, command) => {
  try {
    console.log("char", char, command);
    var url =
      "https://developer-lostark.game.onstove.com/characters/" +
      char +
      "/siblings";

    const sib = await axios.get(url, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNjYzMzMifQ.CUi0sR_SSEPPaLAkJLEfF3rM3Kw_wJ_PhldbAe_iqMBQJXs1YilYfphyJUVM96zlCwQJ4cjiTlpfg0lTKkpinBcGZEI9k85tc5ovCV6p35TDifhJcxkWdDKlJbCgs6CY5s3UJ5lNI5MKBmW_QrWJfJNzPK2Nff0nECazs_wrT-Jnzg9LXzWRsjbql4FLYjM0NehtI2Ll5o0CcuzYqGKvQkDfs52QQ-640pYJ2WdllW7f65_5FzjJ-kGe-7JoriBUcIlsr7xUQJOH_2uVh8t7ErUtT_K2TAslwFrY4TWr-x521Aw2ugSAqTzWZSjZIz7zi5cASSjgnlSVnOj-6gDrrA",
      },
    });

    if (sib.data == null) {
      NullData = [(command = command), (data = {})];
      return res.status(200).send(NullData);
    }

    sib.data.sort(function (a, b) {
      return b.ItemAvgLevel - a.ItemAvgLevel;
    });
    
    var data = [(command = command), (data = sib.data)];


    // return getList.push(ulList[0]);
    return res.status(200).send(data);

    // return ulList[0];
  } catch (error) {
    console.error("error", error);
    return res.status(200).send({ name: undefined });
  }
};


const getInner = async (req, res, char, command) => {
  try {
    console.log("char", char, command);
    var url =
      "https://developer-lostark.game.onstove.com/armories/characters/" +
      char +
      "/collectibles";

    const sib = await axios.get(url, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNjYzMzMifQ.CUi0sR_SSEPPaLAkJLEfF3rM3Kw_wJ_PhldbAe_iqMBQJXs1YilYfphyJUVM96zlCwQJ4cjiTlpfg0lTKkpinBcGZEI9k85tc5ovCV6p35TDifhJcxkWdDKlJbCgs6CY5s3UJ5lNI5MKBmW_QrWJfJNzPK2Nff0nECazs_wrT-Jnzg9LXzWRsjbql4FLYjM0NehtI2Ll5o0CcuzYqGKvQkDfs52QQ-640pYJ2WdllW7f65_5FzjJ-kGe-7JoriBUcIlsr7xUQJOH_2uVh8t7ErUtT_K2TAslwFrY4TWr-x521Aw2ugSAqTzWZSjZIz7zi5cASSjgnlSVnOj-6gDrrA",
      },
    });
    if (sib.data == null) {
      NullData = [(command = command), (data = {})];
      return res.status(200).send(NullData);
    }
    var data = [(command = command), (data = sib.data)];

    // return getList.push(ulList[0]);
    return res.status(200).send(data);

    // return ulList[0];
  } catch (error) {
    console.error("error", error);
    return res.status(200).send({ name: undefined });
  }
};

const getGems = async (req, res, char, command) => {
  try {
    console.log("char", char, command);
    var url =
      "https://developer-lostark.game.onstove.com/armories/characters/" +
      char +
      "/gems";

    const sib = await axios.get(url, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNjYzMzMifQ.CUi0sR_SSEPPaLAkJLEfF3rM3Kw_wJ_PhldbAe_iqMBQJXs1YilYfphyJUVM96zlCwQJ4cjiTlpfg0lTKkpinBcGZEI9k85tc5ovCV6p35TDifhJcxkWdDKlJbCgs6CY5s3UJ5lNI5MKBmW_QrWJfJNzPK2Nff0nECazs_wrT-Jnzg9LXzWRsjbql4FLYjM0NehtI2Ll5o0CcuzYqGKvQkDfs52QQ-640pYJ2WdllW7f65_5FzjJ-kGe-7JoriBUcIlsr7xUQJOH_2uVh8t7ErUtT_K2TAslwFrY4TWr-x521Aw2ugSAqTzWZSjZIz7zi5cASSjgnlSVnOj-6gDrrA",
      },
    });
    if (sib.data == null) {
      NullData = [(command = command), (data = {})];
      return res.status(200).send(NullData);
    }
    var data = [(command = command), (data = sib.data)];

    // return getList.push(ulList[0]);
    return res.status(200).send(data);

    // return ulList[0];
  } catch (error) {
    console.error("error", error);
    return res.status(200).send({ name: undefined });
  }
};

const getEq = async (req, res, char, command) => {
  try {
    console.log("char", char, command);
    var url =
      "https://developer-lostark.game.onstove.com/armories/characters/" +
      char +
      "/equipment";

    const sib = await axios.get(url, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNjYzMzMifQ.CUi0sR_SSEPPaLAkJLEfF3rM3Kw_wJ_PhldbAe_iqMBQJXs1YilYfphyJUVM96zlCwQJ4cjiTlpfg0lTKkpinBcGZEI9k85tc5ovCV6p35TDifhJcxkWdDKlJbCgs6CY5s3UJ5lNI5MKBmW_QrWJfJNzPK2Nff0nECazs_wrT-Jnzg9LXzWRsjbql4FLYjM0NehtI2Ll5o0CcuzYqGKvQkDfs52QQ-640pYJ2WdllW7f65_5FzjJ-kGe-7JoriBUcIlsr7xUQJOH_2uVh8t7ErUtT_K2TAslwFrY4TWr-x521Aw2ugSAqTzWZSjZIz7zi5cASSjgnlSVnOj-6gDrrA",
      },
    });
    if (sib.data == null) {
      NullData = [(command = command), (data = {})];
      return res.status(200).send(NullData);
    }
    var data = [(command = command), (data = sib.data)];

    // return getList.push(ulList[0]);
    return res.status(200).send(data);

    // return ulList[0];
  } catch (error) {
    console.error("error", error);
    return res.status(200).send({ name: undefined });
  }
};

const getEngraving = async (req, res, char, command) => {
  try {
    console.log("char", char, command);
    var url =
      "https://developer-lostark.game.onstove.com/armories/characters/" +
      char +
      "/engravings";

    const sib = await axios.get(url, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNjYzMzMifQ.CUi0sR_SSEPPaLAkJLEfF3rM3Kw_wJ_PhldbAe_iqMBQJXs1YilYfphyJUVM96zlCwQJ4cjiTlpfg0lTKkpinBcGZEI9k85tc5ovCV6p35TDifhJcxkWdDKlJbCgs6CY5s3UJ5lNI5MKBmW_QrWJfJNzPK2Nff0nECazs_wrT-Jnzg9LXzWRsjbql4FLYjM0NehtI2Ll5o0CcuzYqGKvQkDfs52QQ-640pYJ2WdllW7f65_5FzjJ-kGe-7JoriBUcIlsr7xUQJOH_2uVh8t7ErUtT_K2TAslwFrY4TWr-x521Aw2ugSAqTzWZSjZIz7zi5cASSjgnlSVnOj-6gDrrA",
      },
    });
    if (sib.data == null) {
      NullData = [(command = command), (data = {})];
      return res.status(200).send(NullData);
    }
    var data = [(command = command), (data = sib.data)];

    // return getList.push(ulList[0]);
    return res.status(200).send(data);

    // return ulList[0];
  } catch (error) {
    console.error("error", error);
    return res.status(200).send({ name: undefined });
  }
};

router.post("/crawling", async function (req, res) {
  console.log("req.body", req.body);
  const responseBody = {};
  
  var url = "https://developer-lostark.game.onstove.com/armories/characters/내쏘서뤼스/profiles";
  headers = {
    headers: {
      'Authorization':
        "Bearer token eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNjYzMzMifQ.CUi0sR_SSEPPaLAkJLEfF3rM3Kw_wJ_PhldbAe_iqMBQJXs1YilYfphyJUVM96zlCwQJ4cjiTlpfg0lTKkpinBcGZEI9k85tc5ovCV6p35TDifhJcxkWdDKlJbCgs6CY5s3UJ5lNI5MKBmW_QrWJfJNzPK2Nff0nECazs_wrT-Jnzg9LXzWRsjbql4FLYjM0NehtI2Ll5o0CcuzYqGKvQkDfs52QQ-640pYJ2WdllW7f65_5FzjJ-kGe-7JoriBUcIlsr7xUQJOH_2uVh8t7ErUtT_K2TAslwFrY4TWr-x521Aw2ugSAqTzWZSjZIz7zi5cASSjgnlSVnOj-6gDrrA",
    },
  };
  const test = await axios.get(url, headers)


  console.log("test", test);
})


module.exports = router;
