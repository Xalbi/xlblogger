/*
** xlblogger
** Author: Ahmed Chelbi <ahmad.chelbi@outlook.com>
** MIT Licensed
*/

  /*  ColorList  */
  /* ################################# */
       Reset = "\x1b[0m"
       Bright = "\x1b[1m"
       Dim = "\x1b[2m"
       Underscore = "\x1b[4m"
       Blink = "\x1b[5m"
       Reverse = "\x1b[7m"
       Hidden = "\x1b[8m"

       FgBlack = "\x1b[30m"
       FgRed = "\x1b[31m"
       FgGreen = "\x1b[32m"
       FgYellow = "\x1b[33m"
       FgBlue = "\x1b[34m"
       FgMagenta = "\x1b[35m"
       FgCyan = "\x1b[36m"
       FgWhite = "\x1b[37m"

       BgBlack = "\x1b[40m"
       BgRed = "\x1b[41m"
       BgGreen = "\x1b[42m"
       BgYellow = "\x1b[43m"
       BgBlue = "\x1b[44m"
       BgMagenta = "\x1b[45m"
       BgCyan = "\x1b[46m"
       BgWhite = "\x1b[47m"
  /* ################################# */

   colorParam = function(text , color){
       if(!color) color = "\x1b[42m"
     console.log(color + text + "[0m");
   }

  getDate = function getDate() {
    d =new Date();
    dformat = [(d.getMonth()+1).padLeft(),
                d.getDate().padLeft(),
                d.getFullYear()].join('/') +' ' +
               [d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()].join(':');
    return dformat;
  }

  Number.prototype.padLeft = function(base,chr){
     var  len = (String(base || 10).length - String(this).length)+1;
     return len > 0? new Array(len).join(chr || '0')+this : this;
  }

  console.cyan = function(text){
      console.log("[46m" + text + "[0m");
  }

  console.mixedColor = function(text , text2){
      console.log("[31m" + text + "[0m","[46m " + text2 + "[0m");
  }


  console.specialTree = function(text , text2, text3){
      console.log( FgRed+text , FgCyan+text2 , FgGreen+text3+ "[0m" );
  }

  /* ################################# */


  var util = require('util');
  var cheerio = require("cheerio")
  var fs = require("fs");


  /* ################## */


/*## there is 3 ways to specify the output directory : ##
//#  by passing the "optionalDir" varibale to "Config_Log"
//#  specify it in the config file logConfig.xml
//#  keep it default  "C:/XLBlogger" :p
##### PRIORITY ORDER: JS > XML > DEFAULT
*/
function xlblogger(mag, optionalDir){
  this.active = true;

  /* Create xml Config File */
  this.configFilePath = "./logConfig.xml";

  if (!fs.existsSync(this.configFilePath)){
    fs.writeFileSync(this.configFilePath,"<outputDirectory>C:/XLBlogger</outputDirectory>");
  }

  this.configContent = fs.readFileSync(this.configFilePath, "utf8");
  var $ = cheerio.load(this.configContent);
  this.NewXmlConfigFilePath = $("outputDirectory").text().trim();

  this.d =new Date();

  if(!optionalDir){
          if(!this.NewXmlConfigFilePath || this.NewXmlConfigFilePath ==""){
            console.mixedColor("[DEFAULT] Logger outputDirectory for ["+mag+"]","C:/XLBlogger");
            this.dir = "C:/XLBlogger"; // in case someone enjoyed deleting the content of the generated xml file :p
          }else{
            console.mixedColor("[XML] Logger outputDirectory for ["+mag+"]",this.NewXmlConfigFilePath);
            this.dir = this.NewXmlConfigFilePath // we take it from XML file
          }

  }else{
    this.dir = optionalDir;
    console.mixedColor("[JS] Logger outputDirectory for ["+mag+"]",optionalDir);
  }

  this.filename = this.dir+"/"+mag+"/"+mag+".["+this.d.getDate().padLeft()+"]"+".Of."+this.d.getHours()+"h"+this.d.getMinutes().padLeft()+".["+this.d.getSeconds().padLeft()+".].log".toString();
  try {
    fs.mkdirSync(this.dir);
  } catch (err) {};


  try {
    fs.mkdirSync(this.dir+"/"+mag);
  } catch (err) {};
}


xlblogger.prototype.startLog = function startLog(){
  try {
      fs.writeFileSync(this.filename, "Starting Log\r\n", "UTF-8");
      console.log("Starting Log !");
    } catch (err) {};
}

xlblogger.prototype.stopLog =  function stopLog(){
  this.active = false;
}

xlblogger.prototype.logThis = function logThis(etape){
  if(this.active){
      dformat = getDate()
      fs.appendFileSync(this.filename,"["+dformat+"]"+etape+"\r\n", "UTF-8");
      console.log(etape);
  }
}

// Save a line in the logger and print the message in the console, we can pass the color or keep the default one
xlblogger.prototype.logValColor = function logValColor(msg , color){
  if(this.active){
    dformat = getDate()
    fs.appendFileSync(this.filename,"["+dformat+"]"+util.inspect(msg)+"\r\n", "UTF-8");
    colorParam (util.inspect(msg),color);
  }
}


xlblogger.prototype.logAttrVal =  function logAttrVal(attribute , value){
  if(this.active){
    dformat = getDate()
    fs.appendFileSync(this.filename,"["+dformat+"]"+ util.inspect(attribute)+" : "+ util.inspect(value)+"\r\n", "UTF-8");
    console.mixedColor( util.inspect(attribute),util.inspect(value));
  }
}

xlblogger.prototype.logTree = function logTree(n1 , n2, n3){
  if(this.active){
    dformat = getDate()
    fs.appendFileSync(this.filename,"["+dformat+"]"+n1+" / "+n2+" / "+n3+"\r\n", "UTF-8");
    console.specialTree(util.inspect(n1), util.inspect(n2), util.inspect(n3));
  }
}


xlblogger.prototype.output = function output(obj){
  if(this.active && obj){
    console.log(obj);
    fs.appendFileSync(this.filename,  util.inspect(obj)+"\r\n", "UTF-8");
  }else {
    fs.appendFileSync(this.filename,"\r\n", "UTF-8");
    console.log("");
  }
}


xlblogger.prototype.logBlank = function logBlank(){
  if(this.active){
    this.output()
  }
}

module.exports = xlblogger;
