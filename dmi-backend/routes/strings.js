const express = require("express");
const fs = require('fs');
const stringsPath = "../data/strings.json";
const stringsJson = require(stringsPath);
let router = new express.Router();


/* GET /strings 
  
  output: array of all strings
    [
      "str1",
      "str2",
      ...
    ]
*/
router.get("", function (req, res){  
  const strings = stringsJson.strings
  return res.json(strings);
});


/* POST /recipes 
input:{"string":"some string here"} 
output: status: 201, array of all strings
[
      "str1",
      "str2",
      ...
    ]
*/

router.post("", function(req, res){
  
  const str = req.body.string;
  let strings = stringsJson.strings;
  strings.unshift(str);
  fs.writeFile('./data/strings.json', JSON.stringify({strings}, null, 2), function (err) {
    if(err) throw err;
    console.log('writing to strings.json');
  });

  return res.json(strings);
});