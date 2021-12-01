/*
  * Project: PRACTICE_EXAM_2
* File Name: main.js
* Description:
  *
  * Created Date: Nov 24, 2021
* Author: Dannicah Salazar
*
  */
  
const IOhandler = require("./IOhandler"),
zipFilePath = `${__dirname}/myfile.zip`,
pathUnzipped = `${__dirname}/unzipped`,
pathProcessed = `${__dirname}/grayscaled`;

IOhandler.unzip(zipFilePath, pathUnzipped)
.then(() => IOhandler.readDir(pathUnzipped))
.then((files) => IOhandler.grayScale(pathUnzipped, pathProcessed))
.catch(err => console.log(err))
