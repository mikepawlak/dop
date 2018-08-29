

//create and open db connection
var mongoClient = require('mongodb').MongoClient;
var opt = {
        user: "dopWeb",
        pass: "E193229sexyflanders",
        auth: {
            authdb: 'admin'
        }
    };
var db;
mongoClient.connect('mongodb://dopWeb:E193229sexyflanders@localhost:27017/blog', opt, function (err, database) {
  console.log("DB Connected");
  if (err) return console.log(err);
  db = database;

function getImgUrl(id, mongoId) {
  var uri_construct = "https://kgsearch.googleapis.com/v1/entities:search?ids=" + id + "&key=AIzaSyB2J1zIyqS9yRSFKApxiTO678videBI_xQ";


  var request = require('request');

/*
    request({
      uri: uri_construct,
      method: "GET"
    }, function (error, response, body) {
      if (error || (response && response.statusCode) !== 200) {
        console.log(error);
      } else {
        //console.log(body);
        body = JSON.parse(body);

        if (body.itemListElement[0]) {
          if (body.itemListElement[0].result) {
            if (body.itemListElement[0].result.image) {
              body = body.itemListElement[0].result.image.contentUrl;
            } else {
              body = null;
            }
          } else {
            console.log("response error for:" + id + " and " + mongoId);
          }
        } else {
          console.log("response error for:" + id + " and " + mongoId);
        }




        //mongoId = new require('mongodb').ObjectID(mongoId);
        //db.collection("house").update({"_id" : mongoId}, {$set: {imgUrl: body}});


      }
  });

*/

}

var imgArray = [];

function go() {
    getImgUrl(senArray[x].google_entity_id, senArray[x]._id);

    if (x++ < senArray.length) {
        setTimeout(go, 1000);
    }
}

//get array
db.collection("house").find().toArray(function (err, succ) {
  if (err) {
    console.log(err);
  } else {
    var senArray = succ;
    var x = 0;

    console.log(senArray);

    //go();



  }
});


//create restful function

//loop

//output










});


/*

  var id = "/m/024v02";

  var uri_construct = "https://kgsearch.googleapis.com/v1/entities:search?ids=" + id + "&key=AIzaSyB2J1zIyqS9yRSFKApxiTO678videBI_xQ";


  var request = require('request');
    request({
      uri: uri_construct,
      method: "GET"
    }, function (error, response, body) {
      console.log(error);
      console.log(response && response.statusCode);
      console.log(body);
      if (error || (response && response.statusCode) !== 200) {
        console.log(error);
      } else {
        body = JSON.parse(body);
        //var content =  body.results[0].members;


      //  console.log(content);
        /* DO NOT UNCOMMENT - This will create an entire duplicate of collection
        db.collection("house").insertMany(content, function (err, succ) {
          console.log(err);
          console.log(succ);
        });

      }
    });


*/
