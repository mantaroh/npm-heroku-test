var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser');
import newsList from './contentType/newsList';

/*
{ defaultFieldTypes:
   [ { title: 'titleだよー1',
       imageURL: 'http://sssssss/png1.png',
       description: 'desc1' },
     { title: 'titleだよー2',
       imageURL: 'http://sssssss/png2.png',
       description: 'desc2' },
     { title: 'titleだよー3',
       imageURL: 'http://sssssss/png3.png',
       description: 'desc3' } ] }
*/
router.get('/', function(req, res, next) {
  console.log("GET");

  let contentType = req.body.contentType;
  let types = req.body.defaultFieldTypes;

  // Sanity Check.
  if (!contentType &&
      (!types || types.length === 0)) {
    res.status(500).send('Invalid parameter');
    return;
  }

  let generatedJS;
  try {
    let listGenerator = new newsList();
    generatedJS = listGenerator.generate(types);
  } catch (err) {
    res.status(500).send(err.message);
    return;
  }

  res.send({ generatedJS });
});

module.exports = router;
