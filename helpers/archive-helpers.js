var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

 exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : '/Users/HR10/Code/IssaqAl-Ahmed/2014-07-web-historian/archives/sites.txt'
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readSiteData = function(query, cb){
  fs.readFile(query, 'utf8', function(err, data){
    var html = data;
    if(err){
      html = 'it failed!';
    }
    cb(html);
  });
};

exports.readListOfUrls = function(callback){
  fs.readFile('/Users/HR10/Code/IssaqAl-Ahmed/2014-07-web-historian/archives/sites.txt', 'utf8', function(err, data){
    if(err){
      console.log('oh noes!');
    }
    var urlList = data.split('\n');
    callback(urlList);
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(urlList) {
    console.log(urlList);
    console.log(url);
    console.log(urlList.indexOf(url));
    if (urlList.indexOf(url) !== -1) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.addUrlToList = function(data){
  fs.appendFile('/Users/HR10/Code/IssaqAl-Ahmed/2014-07-web-historian/archives/sites.txt', data + '\n');
};

exports.isURLArchived = function(){
  //store a list of confirmed sites that have been pushed to the local machine
};

exports.downloadUrls = function(){

};
