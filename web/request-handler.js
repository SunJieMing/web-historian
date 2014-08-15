var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if(req.method === 'OPTION'){
    if(req.url === '/'){
      res.writeHead(200, helpers.headers);
      res.end(JSON.stringify(req.data));
    }
    else{
      res.writeHead(404, helpers.headers);
      res.end();
    }
  }


  else if(req.method === 'GET'){

    archive.isUrlInList(req.url, function(isInList) {
      if (!isInList) {
        console.log(4040404040404040404044040404040404040)
        res.writeHead(404, helpers.headers);
        res.end();
      } else if(req.url === '/'){
        console.log("lololololololololololololol");

        res.writeHead(200, helpers.headers);
        res.end('/<input/');
      } else {
        res.writeHead(200, helpers.headers);
        archive.isUrlInList(req.url, function(isInList){
          if(isInList){
            var queryString = archive.paths.archivedSites + req.url;
            archive.readSiteData(queryString, function(html){
              res.end(html);
            });
          }
        });
      }
    });
  }

  else if (req.method === 'POST'){

    // console.log(req._postData.url);
    // console.log(archive);

    // if(req.url === '/'){
    //   res.writeHead(201, helpers.headers);
    //   var html = '';
    //   fs.readFile('/www.google.com', function(err, data){
    //     html = data;
    //     if(err){
    //       html = 'it failed!';
    //     }
    //   });
    //   // console.log(html)
    //   res.end(html);
    // }
    var urlToAdd = req._postData.url;
    // console.log(req.url);
    // console.log(req._postData.url);
    //check to see if its archived
    //archive it
    //res.writeHead(302, helpers.headers);
    if (req._postData.url){
      //WE NEED TO BUILD THE REDIRECT FROM SCRATCH *****************TO DO****************
      archive.addUrlToList(urlToAdd);
      var path =  "http://localhost:3000/web/public/loading.html";
      res.writeHead(302, {'Location': path});
      res.end(urlToAdd);

    }
    else{
      res.writeHead(404, helpers.headers);
      res.end('lol?');
    }


  }
  res.end(archive.paths.list);
};

