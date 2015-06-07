// var express = require('express');
// var router = express.Router();
// var http = require('http');
// var NodeCache = require("node-cache");
// var myCache = new NodeCache();
// var districts = [23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37, 38, 39, 40, 43, 44, 47, 8];
// var laCountyStoriesByDistrict={};
// router.get('/stories/lacounty', function (req, res) {

//   myCache.get("lacounty", function (err, value) {
//     if (!err) {
//       if (value == undefined) {
//         var fetchedStories = fetchAndCacheStories();



//       } else {
//         console.log(value);
//         //{ my: "Special", variable: 42 }
//         // ... do something ...
//       }
//     }
//   });



// });

// var callback = function (response) {
//   var str = '';

//   //another chunk of data has been recieved, so append it to `str`
//   response.on('data', function (chunk) {
//     str += chunk;
//   });

//   //the whole response has been recieved, so we just print it out here
//   response.on('end', function () {
//     console.log(str);
//   });
// };
// var fetchAndCacheStories = function () {
//     var districtsToGet = districts.slice();
//     var consumeNextUrl = function () {
//     var districtCode = districtsToGet.shift();
//     var options = {
//       host: 'app.fwd.us',
//       path: '/api/v1/stories/search.json?state=CA&order=&page=1&per_page=100&key=0ad5af026df7fc0fc86d&district=' + districtCode
//     };
//     http.request(options, callback).end(consumeNextUrl);
//   };

  
// };

// module.exports = router;