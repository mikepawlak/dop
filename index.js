var express =  require('express');
var path = require('path');
var bodyParser = require('body-parser');


var comp = require('compression');

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
  console.log("Connected");
  if (err) return console.log(err);
  db = database;
});

var images = require("./routes/gallery.js");
var shareUrl = require("./routes/shareUrl.js");
var states = require("./routes/states.js");

var app = express();

//rendering engine setup
var handlebars = require('express-handlebars')
  .create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: true
}));

//bodyParser.json(options)
app.use(bodyParser.json());

//gzip compression - if move from pm2 to nginx, set up through there
app.use(comp());

//public files
app.use(express.static(path.join(__dirname, '/public')))
  //virtual connection to node_modules for vendor file serving
  .use('/vendor', express.static(path.join(__dirname, '/node_modules')));

app.get('/', function(req, res) {
        res.render("home");
})
  .get("/testIndex", function (req, res) {
    res.render("testIndex");
  })

  .get('/tools', function(req, res) {
    res.render("tools");
  })

  .get("/bug-your-senator", function(req, res) {
    var data = {
      title: "Find Your Senator and Bug Them",
      subTitle: "Find your senator's number, address, twitter handle, and more.",
      url: "bug-your-senator",
      graphicSrc : 'senateConnect.png'
    };
    res.render("senateConnect", {data : data});
  })

  .get("/bug-your-congressperson", function(req, res) {
    var data = {
      title: "Find Your Congressperson and Bug Them",
      subTitle: "Find your congressperson's number, address, twitter handle, and more.",
      url: "bug-your-congressperson",
      graphicSrc : 'congressConnect.png'
    };
    res.render("congressConnect", {data : data});
  })


  .use("/states", states)

  .get("/posts", function(req, res) {
    var data = null;
    db.collection("blog").find().toArray(function(err, items) {
      if (err) {
        console.log(err);
      } else {
        data = items;
      }

      res.json(data);
    });
  })
  .get("/gallery", function (req, res) {
    res.render("gallery");
  })
  .get('/blog', function(req, res) {
    res.render('blog');
  })
  .get("/featured/:id", function(req, res) {
    var id = new require('mongodb').ObjectID(req.params.id);
    var data = null;
    db.collection("blog").findOne({ _id : id }, function (err, succ) {
      if (err) {
        data = "error";
        console.log(err);
      } else {
        data = succ;
      }
      res.json(data);
    });
  })

  .post("/signup", function (req, res) {
    var user = req.body;
    db.collection("newsletter").insertOne(user, function (err, succ) {
      if (err) {
        console.log(err);
        res.send("error");
      }
      else {
        res.sendStatus(200);
      }
    });
  })

  .use("/shareUrl", shareUrl)

  .use('/images', images)

  .get('/senatePull', function(req, res) {
    db.collection("senate").find().toArray(function (err, succ) {
      if(err) {
        res.send(500);
      } else {
        res.send(succ);
      }
    });
  })

  .get('/congressPull', function(req, res) {
    db.collection("house").find().toArray(function (err, succ) {
      if(err) {
        res.send(500);
      } else {
        res.send(succ);
      }
    });
  })

  .get('/statePull', function(req, res) {
    db.collection("states").find().toArray(function (err, succ) {
      if(err) {
        res.send(500);
      } else {
        res.send(succ);
      }
    });
  })
  .get('/singleStatePull/:state', function(req, res) {
    var state = req.params.state;
    db.collection("states").find({"state" : state}).toArray(function (err, succ) {
      if(err) {
        res.send(500);
      } else {
        res.send(succ);
      }
    });
  })

  .get('/about', function(req, res) {
    res.render("about");
  })
  .get('/article/:id', function (req, res) {
    var id = req.params.id;
    var data = null;
    var reqId;
    var error = null;
    try {
      reqId = new require('mongodb').ObjectID(id);
    } catch (err) {
      error = err;
    }

    db.collection("blog").findOne({ _id : reqId }, function (err, succ) {
      if (err) {
        console.log(err);
      } else {
        console.log("Error,", error);
        if (error === null ) {
          data = succ;
          data.article = true;
          res.render("article", {data: data});
        } else {
          res.redirect("/notfound");
        }
      }
    });
  })
  .get("/search/:tag", function (req, res) {
    res.render("search");
  })
  .post('/message', function (req, res) {
    var message = req.body;
    if (req.body.signup === true) {
      db.collection("newsletter").insertOne({name: message.name, email: message.email}, function (err, succ) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(200);
        }
      });
    }


    db.collection("messages").insertOne(message, function (err, succ) {
      if (err) {
        console.log(err);
      }
      else {
        res.send(200);
      }
    });
  })
  .get("/searchByTag/:tag", function (req, res) {
    var tag = req.params.tag;
    var returnObj = {
      blog: [],
      images: []
    };
    db.collection("blog").find({ "tags" :  {$in: [tag]}}).toArray(function(err, items) {
      if (err) {}
      else {
        returnObj.blog = items;
        db.collection("images").find({ "tags" :  {$in: [tag]}}).toArray(function(err, items) {
          if (err) {}
          else {
            returnObj.images = items;

            res.json(returnObj);
          }
        });
      }
    });
  })
  .get('/imageInit/:id', function (req, res) {
    var reqId = req.params.id;
    var data = null;
    var error = null;

    if (reqId == "homepage") {
      db.collection("images").find().limit(6).toArray(function(err, items) {
        if (err) {
          console.log(err);
        } else {
          data = items;
        }
        res.json(data);
      });
    }

    else if (reqId == "default") {
      db.collection("images").find().toArray(function(err, items) {
        if (err) {
          console.log(err);
        } else {
          data = items;
        }
        if (error) {
          res.send(error);
        } else {
          res.json(data);
        }
      });
    } else {
      try {
        reqId = new require('mongodb').ObjectID(reqId);
      } catch (err) {
        error = err;
      }

      db.collection("images").findOne({ _id : reqId }, function (err, succ) {
        if (err) {
          res.send(err, 404);
        } else {
          data = succ;
        }
        res.json(data);
      });
    }
  })
  .get('/progLoad/:id', function (req, res) {
    var reqId;
    try {
      reqId = new require('mongodb').ObjectID(reqId);
    } catch (err) {
      error = err;
    }
    var prePool = [];
    var postPool = [];
    var returnObj = {};

    db.collection("images").find({_id: {$lt: reqId}}).sort({_id: -1 }).limit(2).toArray(function(err, items) {
      if (err) {
        console.log(err);
      } else {
        prePool = items;
      }

      //check for ids that are too close to index 0
      var postPool_limit = 2;
      if (prePool.length !== 2) {
        postPool_limit += (2 - prePool.length);
      }

      db.collection("images").find({_id: {$gt: reqId}}).sort({_id: 1 }).limit(postPool_limit).toArray(function(err, items) {
        if (err) {
          console.log(err);
        } else {
          postPool = items;
          //check if post length is correct. If not, repull pre with correct limit
          if (postPool.length < 2) {
            //conditional failed, repull
            var prePool_limit = 2 + (2 - postPool.length);
            db.collection("images").find({_id: {$lt: reqId}}).sort({_id: -1 }).limit(prePool_limit).toArray(function(err, items) {
              if (err) {
                console.log(err);
              } else {
                prePool = items;
              }

              returnObj = {
                "pre" : prePool,
                "post" : postPool
              };
              res.json(returnObj);
            });
          } else {
            returnObj = {
              "pre" : prePool,
              "post" : postPool
            };
            res.json(returnObj);
          }
        }
      });
    });
  })
  .get('/progPull/:id', function (req, res) {
    console.log(req.params.id);
    var reqId = new require('mongodb').ObjectID(req.params.id);

      db.collection("images").find({_id: {$gt: reqId}}).limit(1).toArray(function(err, items) {
        res.json(items);
      });
  })
  .get('*', function  (req, res) {
    res.render("notfound");
  });

module.exports = app;
