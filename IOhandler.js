/*
 * Project: Practice_Exam_2
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: Nov 24, 2021
 * Author: Dannicah
 *
 */

const unzipper = require("unzipper"),
fs = require("fs").promises,
path = require("path");
PNG = require("pngjs").PNG;
createReadStream = require('fs').createReadStream

/**
  * Description: decompress file from given pathIn, write to given pathOut
*
  * @param {string} pathIn
* @param {string} pathOut
* @return {promise}
*/
  const unzip = (pathIn, pathOut) => {
    createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }))
    .promise()
  };
  // unzip("myfile.zip", "unzipped")
  
  /**
    * Description: read all the png files from given directory and return Promise containing array of each png file path
  *
    * @param {string} path
  * @return {promise}
  */
    const readDir = (dir) => {
      const results = [];
      const files = fs.readdir(dir);
      files.forEach(function(file) {
        file = dir + '/' + file;
        let stat = fs.stat(file);
        if (stat && stat.isDirectory()) { 
          results = results.concat(walk(file));
        } else { 
          results.push(file);
        }
      });
      return results;
    };
    // fs.readdir
    // only png files should be in array
    
    /**
      * Description: Read in png file by given pathIn,
    * convert to grayscale and write to given pathOut
    *
      * @param {string} filePath
    * @param {string} pathProcessed
    * @return {promise}
    */
      const grayScale = (pathIn, pathOut) => {
        createReadStream(pathIn)
        .pipe(
          new PNG()
        )
        .on("parsed", function () {
          for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
              var idx = (this.width * y + x) << 2;
              
              // IMPORTANT
              this.data[idx] = 255 - this.data[idx];
              this.data[idx + 1] = 255 - this.data[idx + 1];
              this.data[idx + 2] = 255 - this.data[idx + 2];
              
              // and reduce opacity * Dont need to worry
              this.data[idx + 3] = this.data[idx + 3] >> 1;
            }
          }
          
          this.pack().pipe(fs.createWriteStream(pathOut));
        });
      };
      
      
      module.exports = {
        unzip,
        readDir,
        grayScale,
      };