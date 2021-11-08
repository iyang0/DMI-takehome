const express = require("express");
const fs = require('fs');
const stringsPath = process.env.NODE_ENV==="test" ? "../data/testData.json" : "../data/strings.json";
const stringsJson = require(stringsPath);
let router = new express.Router();

const { BadRequestError } = require("../expressError");

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
  if(str.length === 0){
    throw new BadRequestError(message = 'String needs at least one character.');
  }
  let strings = stringsJson.strings;
  strings.unshift(str);
  fs.writeFile(stringsPath.slice(1), JSON.stringify({strings}, null, 2), function (err) {
    if(err) throw err;
    console.log('writing to strings.json');
  });

  return res.status(201).json(strings);
});

module.exports = router;