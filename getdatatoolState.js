
var govArray = [

  {
      "state": "Alabama", "party" : "R",  "Governor": "Kay Ivey"
  }

  ,
  {
      "state": "Alaska", "party" : "I",  "Governor": "Bill Walker"
  }

  ,
  {
      "state": "Arizona", "party" : "R",  "Governor": "Doug Ducey"
  }

  ,
  {
      "state": "Arkansas", "party" : "R",  "Governor": "Asa Hutchinson"
  }

  ,
  {
      "state": "California", "party" : "D",  "Governor": "Jerry Brown"
  }

  ,
  {
      "state":"Colorado", "party" : "D",  "Governor":"John Hickenlooper"
  }

  ,
  {
      "state": "Connecticut", "party" : "D",  "Governor": "Dannel Malloy"
  }

  ,
  {
      "state": "Delaware", "party" : "D",  "Governor": "John C. Carney Jr."
  }

  ,
  {
      "state": "Florida", "party" : "R",  "Governor": "Rick Scott"
  }

  ,
  {
      "state": "Georgia", "party" : "R",  "Governor": "Nathan Deal"
  }

  ,

  {
      "state": "Hawaii", "party" : "D",  "Governor": "David Ige"
  }

  ,
  {
      "state": "Idaho", "party" : "R",  "Governor": "Butch Otter"
  }

  ,
  {
      "state": "Illinois", "party" : "R",  "Governor": "Bruce Rauner"
  }

  ,
  {
      "state":"Indiana", "party" : "R",  "Governor" : "Eric Holcomb"
  }

  ,
  {
      "state": "Iowa", "party" : "R",  "Governor": "Kim Reynolds"
  }

  ,
  {
      "state":"Kansas", "party" : "R",  "Governor": "Sam Brownback"
  }

  ,
  {
      "state": "Kentucky", "party" : "R",  "Governor": "Matt Bevin"
  }

  ,
  {
      "state": "Louisiana", "party" : "D",  "Governor": "John Bel Edwards"
  }

  ,
  {
      "state": "Maine", "party" : "R",  "Governor": "Paul LePage"
  }

  ,
  {
      "state": "Maryland", "party" : "R",  "Governor": "Larry Hogan"
  }

  ,
  {
      "state": "Massachusetts", "party" : "R",  "Governor": "Charlie Baker"
  }

  ,
  {
      "state": "Michigan", "party" : "R",  "Governor": "Rick Snyder"
  }

  ,
  {
      "state":"Minnesota", "party" : "D",  "Governor":"Mark Dayton"
  }

  ,
  {
      "state": "Mississippi", "party" : "R",  "Governor": "Phil Bryant"
  }

  ,
  {
      "state": "Missouri", "party" : "R",  "Governor": "Eric Greitens"
  }

  ,
  {
      "state": "Montana", "party" : "D",  "Governor": "[Steve Bullock"
  }

  ,
  {
      "state": "Nebraska", "party" : "R",  "Governor": "Pete Ricketts"
  }

  ,
  {
      "state":"Nevada", "party" : "R",  "Governor":"Brian Sandoval"
  }

  ,
  {
      "state":"New Hampshire", "party" : "R",   "Governor":"Chris Sununu"
  }

  ,
  {
      "state":"New Jersey", "party" : "R",  "Governor":"Chris Christie"
  }

  ,
  {
      "state":"New Mexico", "party" : "R",  "Governor":"Susana Martinez"
  }

  ,
  {
      "state": "New York", "party" : "D",  "Governor": "Andrew Cuomo"
  }

  ,
  {
      "state":"North Carolina", "party" : "D",  "Governor":"Roy Cooper"
  }

  ,
  {
      "state": "North Dakota", "party" : "R",  "Governor": "Doug Burgum"
  }
  ,
  {
      "state": "Oklahoma", "party" : "",  "Governor": "Mary Fallin"
  }

  ,
  {
      "state": "Ohio", "party" : "R",  "Governor": "John Kasich"
  }

  ,
  {
      "state": "Oregon", "party" : "D",  "Governor": "Kate Brown"
  }

  ,
  {
      "state":"Pennsylvania", "party" : "D",  "Governor":"Tom Wolf"
  }


  ,
  {
      "state": "Rhode Island", "party" : "D",  "Governor": "Gina Raimondo"
  }

  ,
  {
      "state":"South Carolina", "party" : "R",  "Governor":"Henry McMaster"
  }

  ,
  {
      "state":"South Dakota", "party" : "R",  "Governor":"Dennis Daugaard"
  }

  ,
  {
      "state": "Tennessee", "party" : "R",  "Governor": "Bill Haslam"
  }

  ,
  {
      "state": "Texas", "party" : "R",  "Governor": "Greg Abbott"
  }

  ,
  {
      "state": "Utah", "party" : "R",  "Governor": "Gary Herbert"
  }

  ,
  {
      "state": "Vermont", "party" : "",  "Governor": "Phil Scott"
  }

  ,
  {
      "state":"Virginia", "party" : "R",  "Governor":"Terry McAuliffe"
  }

  ,
  {
      "state": "Washington", "party" : "D",  "Governor": "Jay Inslee"
  }

  ,
  {
      "state": "West Virginia", "party" : "D",  "Governor": "Jim Justice"
  }

  ,
  {
      "state": "Wisconsin", "party" : "R",  "Governor": "Scott Walker"
  }

  ,
  {
      "state": "Wyoming", "party" : "R",  "Governor": "Matt Mead"
  }

];

var openStates_key = "3799d65b-7128-4912-aa74-c0de281a3f87";
var googleAPI_key = "AIzaSyB2J1zIyqS9yRSFKApxiTO678videBI_xQ";

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


  var saveArray = [];

  function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

function seedGovernor(state, nameString, party) {
    var name = nameString;

    nameString = nameString.split(' ').join("+");

    var api_key = "AIzaSyB2J1zIyqS9yRSFKApxiTO678videBI_xQ";
    var uri_construct = " https://kgsearch.googleapis.com/v1/entities:search?query=" + nameString + "&key=" + api_key + "&limit=1&indent=True"


    var request = require('request');

      request({
        uri: uri_construct,
        method: "GET"
      }, function (error, response, body) {
        if (error || (response && response.statusCode) !== 200) {
          console.log(error);
        } else {
          body = JSON.parse(body);
          image = body.itemListElement[0].result.image.contentUrl;


          var saveObj = {
            "name" : name,
            "imgUrl" : image,
            "party" : party
          };

          var stateName = state.toUpperCase()
          db.collection("states").update({"state" : stateName}, {"$set" : {"governor" : saveObj}}, false, true)

        }

      });
}

function getGovernor(abbr, state) {

  //format state properly
  state = state.toLowerCase().split(" ");
  for (var i in state) {
    state[i] = toTitleCase(state[i]);
  }

  state = state.join(" ");

  console.log(state);

  var api_key = "AIzaSyB2J1zIyqS9yRSFKApxiTO678videBI_xQ";
  var uri_construct =  "https://en.wikipedia.org/w/api.php?action=query&titles=List%20of%20Governors%20of%20" + state + "&prop=revisions&rvprop=content&format=json";


  var request = require('request');

    request({
      uri: uri_construct,
      method: "GET"
    }, function (error, response, body) {
      if (error || (response && response.statusCode) !== 200) {
        console.log(error);
      } else {
        body = JSON.parse(body);
        var key = Object.keys(body.query.pages)[0];
        if (body.query.pages[key].revisions) {
          var bigAssString = body.query.pages[key].revisions[0]["*"];


          var incumbentIndex = bigAssString.indexOf("incumbent       = [[");
          var incString = bigAssString.substring(incumbentIndex, incumbentIndex + 45);
          console.log(incString);


          var stateObj = {
            "state" : state,
            "Governor" : incString
          };

          saveArray.push(stateObj);

          if (state == "Wyoming") {
            saveArray = JSON.stringify(saveArray);
            var fs = require('fs');
            fs.writeFile("tool/gov", saveArray, function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });

          }

        }




      }

    });
}

function seedStateDB(stateAbbr, state) {

  var uri_construct = "https://www.openstates.org/api/v1/legislators/?state=" + state;



  var request = require('request');


    request({
      uri: uri_construct,
      headers: {
          "X-API-KEY" : "3799d65b-7128-4912-aa74-c0de281a3f87"
      },
      method: "GET"
    }, function (error, response, body) {
      if (error || (response && response.statusCode) !== 200) {
        console.log(error);
      } else {
        //console.log(body);
        body = JSON.parse(body);


        var upper = [];
        var lower = [];

        body.map(function(x) {
          if (x.chamber == "upper") {
            upper.push(x);
          } else if (x.chamber == 'lower') {
            lower.push(x);
          } else {
            if (x.state == "ne") {
              upper.push(x);
            }else {
              console.log(" ");
              console.log("exception");
              console.log(x);
            }

          }
        });

        console.log("upper: " + upper.length);
        console.log("lower: " + lower.length);
        console.log(" ");


        var upperR = 0;
        var upperD = 0;
        var upperI = 0;
        var lowerR = 0;
        var lowerD = 0;
        var lowerI = 0;

        var upperN = 0;
        var lowerN = 0;
        upper.map(function (x) {
          if (x.party == "Republican") {
            upperR++;
          } else if (x.party == "Democratic") {
            upperD++;
          } else if (x.party == "Independent") {
            upperI++;
          } else if (x.party == "Nonpartisan") {
            upperN++;
          }
        });

        lower.map(function (x) {
          if (x.party == "Republican") {
            lowerR++;
          } else if (x.party == "Democratic") {
            lowerD++;
          } else if (x.party == "Independent") {
            lowerI++;
          } else if (x.party == "Nonpartisan") {
            lowerN++;
          }
        });


        if (body.length !== 0) {
          db.collection("states").insertOne(
            {
              state: state,
              abbr : stateAbbr,
              upperR : upperR,
              upperD : upperD,
              upperI : upperI,
              upperN : upperN,
              lowerR : lowerR,
              lowerD : lowerD,
              lowerI : lowerI,
              lowerN : lowerN,
              legAll : body
            }
          );
        }

      }
  });


}

function getStateMetadata(abbr, state) {

  var uri_construct = "https://openstates.org/api/v1/metadata/"+ abbr.toLowerCase();


  var request = require('request');

    request({
      uri: uri_construct,
      method: "GET",
      headers: {
          "X-API-KEY" : openStates_key
      },
    }, function (error, response, body) {
      if (error || (response && response.statusCode) !== 200) {
        console.log(error);
      } else {
        body = JSON.parse(body);

        console.log(body.legislature_name);
        console.log(state);

        var stateName = state.toUpperCase()
        db.collection("states").update({"state" : stateName}, {"$set" : {"leg_name" : body.legislature_name}}, false, true)

      }

    });
}

var imgArray = [];

function go() {
    //seedStateDB(stateArray[x].abbr, stateArray[x].name);
    //getGovernor(stateArray[x].abbr, stateArray[x].name);
    //seedGovernor(govArray[x].state, govArray[x].Governor, govArray[x].party)
    getStateMetadata(stateArray[x].abbr, stateArray[x].name)

    if (x++ < govArray.length -1) {
        setTimeout(go, 1000);
    }
}

var stateArray =  [
    { name: 'ALABAMA', abbr: 'AL'},
    { name: 'ALASKA', abbr: 'AK'},
    { name: 'AMERICAN SAMOA', abbr: 'AS'},
    { name: 'ARIZONA', abbr: 'AZ'},
    { name: 'ARKANSAS', abbr: 'AR'},
    { name: 'CALIFORNIA', abbr: 'CA'},
    { name: 'COLORADO', abbr: 'CO'},
    { name: 'CONNECTICUT', abbr: 'CT'},
    { name: 'DELAWARE', abbr: 'DE'},
    { name: 'DISTRICT OF COLUMBIA', abbr: 'DC'},
    { name: 'FEDERATED STATES OF MICRONESIA', abbr: 'FM'},
    { name: 'FLORIDA', abbr: 'FL'},
    { name: 'GEORGIA', abbr: 'GA'},
    { name: 'GUAM', abbr: 'GU'},
    { name: 'HAWAII', abbr: 'HI'},
    { name: 'IDAHO', abbr: 'ID'},
    { name: 'ILLINOIS', abbr: 'IL'},
    { name: 'INDIANA', abbr: 'IN'},
    { name: 'IOWA', abbr: 'IA'},
    { name: 'KANSAS', abbr: 'KS'},
    { name: 'KENTUCKY', abbr: 'KY'},
    { name: 'LOUISIANA', abbr: 'LA'},
    { name: 'MAINE', abbr: 'ME'},
    { name: 'MARSHALL ISLANDS', abbr: 'MH'},
    { name: 'MARYLAND', abbr: 'MD'},
    { name: 'MASSACHUSETTS', abbr: 'MA'},
    { name: 'MICHIGAN', abbr: 'MI'},
    { name: 'MINNESOTA', abbr: 'MN'},
    { name: 'MISSISSIPPI', abbr: 'MS'},
    { name: 'MISSOURI', abbr: 'MO'},
    { name: 'MONTANA', abbr: 'MT'},
    { name: 'NEBRASKA', abbr: 'NE'},
    { name: 'NEVADA', abbr: 'NV'},
    { name: 'NEW HAMPSHIRE', abbr: 'NH'},
    { name: 'NEW JERSEY', abbr: 'NJ'},
    { name: 'NEW MEXICO', abbr: 'NM'},
    { name: 'NEW YORK', abbr: 'NY'},
    { name: 'NORTH CAROLINA', abbr: 'NC'},
    { name: 'NORTH DAKOTA', abbr: 'ND'},
    { name: 'NORTHERN MARIANA ISLANDS', abbr: 'MP'},
    { name: 'OHIO', abbr: 'OH'},
    { name: 'OKLAHOMA', abbr: 'OK'},
    { name: 'OREGON', abbr: 'OR'},
    { name: 'PALAU', abbr: 'PW'},
    { name: 'PENNSYLVANIA', abbr: 'PA'},
    { name: 'PUERTO RICO', abbr: 'PR'},
    { name: 'RHODE ISLAND', abbr: 'RI'},
    { name: 'SOUTH CAROLINA', abbr: 'SC'},
    { name: 'SOUTH DAKOTA', abbr: 'SD'},
    { name: 'TENNESSEE', abbr: 'TN'},
    { name: 'TEXAS', abbr: 'TX'},
    { name: 'UTAH', abbr: 'UT'},
    { name: 'VERMONT', abbr: 'VT'},
    { name: 'VIRGIN ISLANDS', abbr: 'VI'},
    { name: 'VIRGINIA', abbr: 'VA'},
    { name: 'WASHINGTON', abbr: 'WA'},
    { name: 'WEST VIRGINIA', abbr: 'WV'},
    { name: 'WISCONSIN', abbr: 'WI'},
    { name: 'WYOMING', abbr: 'WY' }
];

//loopAndCall

var x = 0;
go();









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
