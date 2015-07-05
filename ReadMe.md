# XLBlogger
Basic and simple node.js logger with #ConsoleColoration

## Why
I wrote xlblogger because i needed a simple way to follow the execution and debug my nodejs scripts.


## Installation

```console
npm install xlblogger
```

## Features

First thing's first:
```js
var logger = require('xlblogger');
```

__&#10049; Easy and simple configuration:__

__&#8226; Specify the output directories:__


```js
logger.configLog('Alpha','C:/XLBlogger');
```



```
XLBlogger
│
└───Alpha
    │   Alpha.[04].Of.16h51.log
    │   Alpha.[04].Of.16h59.log
```




__&#8226; Start logging:__
Time for you to go.
```js
logger.startLog();
```


__&#8226; Stop logging:__
The goal of the "Stop" instruction is to provide the option of disabling the logger without commenting or deleting our messages.

```js
logger.stopLog();
```


__&#10084; Foreground and Background console colors:__

Save attribute : value in the log file and show the message in the console.

```js
logger.logAttrVal('Name','Marou');
```

 Save an empty line, help you improve the readability of your logs.

```js
logger.logBlank();
```
 Save the message and show it in the console with an optional color.
```js
logger.logValColor('Open Source');

var FgMagenta = '\x1b[35m';
logger.logValColor('Open Source',FgMagenta);

```

 Save the message and show it in the console.
```js
logger.logThis('Simple string, no console coloration !');
```

 Save three value and show them in the console with different colors.
```js
logger.logTree('1','2','3');
```

## Example

```js

var logger = require('xlblogger');
logger.configLog('ija');
logger.startLog();

logger.logValColor('XLBlogger'); // Default Coloration

var FgMagenta = '\x1b[35m'; // Magenta font color Code
logger.logValColor('XLBlogger',FgMagenta);

logger.logThis('Simple string, no console coloration !');
logger.logTree('One','Two','Three');

logger.logBlank();
logger.logAttrVal('Name','Marou');

```

![enter image description here](http://s28.postimg.org/999vgy2u5/Example.png)



## Color code examples:


```js

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


```




## Screenshots

❤ Foreground and Background console colors:

![enter image description here](http://s21.postimg.org/4iqob3onr/Full_Example.png)

__&#991; Log every execution separately:__

![enter image description here](http://s23.postimg.org/9i3wuj7kr/Different_Log.png)

## License

(The MIT License)
