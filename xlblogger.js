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



      var cheerio = require("cheerio")
      var fs = require("fs");
      active = true;

      /* Create xml Config File */
      var configFilePath = "./logConfig.xml";
      if (!fs.existsSync(configFilePath)){
      fs.writeFileSync(configFilePath,"<outputDirectory>C:/XLBlogger</outputDirectory>");
      }

      var configContent = fs.readFileSync(configFilePath, "utf8");
      var $ = cheerio.load(configContent);

      NewXmlConfigFilePath = $("outputDirectory").text().trim();

      /* ################## */



/*## there is 3 ways to specify the output directory : ##
//#  by passing the "optionalDir" varibale to "Config_Log"
//#  specify it in the config file logConfig.xml
//#  keep it default  "C:/XLBlogger" :p
##### PRIORITY ORDER: JS > XML > DEFAULT
*/
  function configLog(mag, optionalDir){
    d =new Date();
    if(!optionalDir){
              if(!NewXmlConfigFilePath || NewXmlConfigFilePath ==""){
                console.mixedColor("[DEFAULT] Logger outputDirectory","C:/XLBlogger");
                  var dir = "C:/XLBlogger"; // in case someone enjoyed deleting the content of the generated xml file :p
              }else{
                console.mixedColor("[XML] Logger outputDirectory",NewXmlConfigFilePath);
                var dir = NewXmlConfigFilePath // we take it from XML file
              }
    }else{
      var dir = optionalDir;
      console.mixedColor("[JS] Logger outputDirectory",optionalDir);
      }

  filename = dir+"/"+mag+"/"+mag+".["+d.getDate().padLeft()+"]"+".Of."+d.getHours()+"h"+d.getMinutes().padLeft()+".log".toString();
  try {
      fs.mkdirSync(dir);
    } catch (err) {};


  try {
      fs.mkdirSync(dir+"/"+mag);
    } catch (err) {};
  }



    function startLog(){
      try {
          fs.writeFileSync(filename, "Starting Log ... ["+dformat+"] \r\n", "UTF-8");
          console.log("Starting Log !");
        } catch (err) {};
    }


    function stopLog(){
      active = false;
    }


    function logThis(etape){
      if(active){
        d =new Date();
        dformat = [(d.getMonth()+1).padLeft(),
                    d.getDate().padLeft(),
                    d.getFullYear()].join('/') +' ' +
                   [d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');

          fs.appendFileSync(filename,"["+dformat+"]"+etape+"\r\n", "UTF-8");
          console.log(etape);
        }
    }


  // Save a line in the logger and print the message in the console, we can pass the color or keep the default one
  function logValColor(msg , color){
    if(active){
      d =new Date();
      dformat = [(d.getMonth()+1).padLeft(),
                   d.getDate().padLeft(),
                   d.getFullYear()].join('/') +' ' +
                  [d.getHours().padLeft(),
                   d.getMinutes().padLeft(),
                   d.getSeconds().padLeft()].join(':');

      fs.appendFileSync(filename,"["+dformat+"]"+msg+"\r\n", "UTF-8");
      colorParam (msg,color);
    }
  }



  function logAttrVal(attribute , value){
    if(active){
      d =new Date();
      dformat = [(d.getMonth()+1).padLeft(),
                   d.getDate().padLeft(),
                   d.getFullYear()].join('/') +' ' +
                  [d.getHours().padLeft(),
                   d.getMinutes().padLeft(),
                   d.getSeconds().padLeft()].join(':');

      fs.appendFileSync(filename,"["+dformat+"]"+attribute+" : "+value+"\r\n", "UTF-8");
      console.mixedColor(attribute,value);
    }
  }

  function logTree(n1 , n2, n3){
    if(active){
      d =new Date();
      dformat = [(d.getMonth()+1).padLeft(),
                   d.getDate().padLeft(),
                   d.getFullYear()].join('/') +' ' +
                  [d.getHours().padLeft(),
                   d.getMinutes().padLeft(),
                   d.getSeconds().padLeft()].join(':');

      fs.appendFileSync(filename,"["+dformat+"]"+n1+" / "+n2+" / "+n3+"\r\n", "UTF-8");
      console.specialTree(n1, n2, n3);
    }
  }



  function logBlank(){
    if(active){
      fs.appendFileSync(filename,"                \r\n", "UTF-8");
      console.log("         ");
    }
  }

module.exports.configLog = configLog;
module.exports.startLog = startLog;
module.exports.stopLog = stopLog;
module.exports.logThis = logThis;
module.exports.logAttrVal = logAttrVal;
module.exports.logBlank = logBlank;
module.exports.logValColor = logValColor;
module.exports.logTree = logTree;
