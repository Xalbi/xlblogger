# XLBlogger
Basic and simple node.js logger with #ConsoleColoration

## Why
I wrote xlblogger because i needed a simple way to follow the execution and debug my nodejs scripts.

## Installation

```console
npm install xlblogger
```

## Example

```js

var xlblogger = require('xlblogger');
var logger = new xlblogger('Alpha','C:/XLBlogger');

logger.logValColor('XLBlogger'); // Default Coloration

var FgMagenta = '\x1b[35m'; // Magenta font color Code
logger.logValColor('XLBlogger',FgMagenta);

logger.logThis('Simple string, no console coloration !');
logger.logTree('One','Two','Three');

logger.logBlank();
logger.logAttrVal('Name','Marou');

// output Objects
var data = {}
data.id = 21220244
data.value = 22772020
data.name = 'Marou'
data.pwd = '*******'
data.email = 'test@xlblogger.npm'

logger.output(data)

```

PS: All the proposed functions works with strings as well as  objects.


![enter image description here]( https://i.ibb.co/2FkpB1z/2907.png )


## Features

First thing's first:
```js
var xlblogger = require('xlblogger');

```

__&#10049; Easy and simple configuration:__

__&#8226; Specify the output directories:__

 The parent dir is optional :

 - You can specify it globally in 'logConfig.xml' , in this case every instance of xlblogger will have a subdirectory  in the specified parent dir.
 - You can keep the default value (C:/XLBlogger)

NOTE : (the xml file is generated after the first execution, in the same folder of your js file)

```js

/* var logger = new xlblogger( [outputDir] , <parentDir> ) */
var logger = new xlblogger('Alpha','C:/XLBlogger');
// or
var logger = new xlblogger('Alpha'); // Default parent dir

```



```
XLBlogger
│
└───Alpha
    │   Alpha.[04].Of.16h51.[03].log
    │   Alpha.[04].Of.16h59.[53].log
```




__&#8226; Start logging:__
Time for you to go.
```js
logger.startLog(); // The logger is active by default
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

This feature was added to offer a simple way to export Brut data to a file

```js

var xlblogger = require('xlblogger');

var out = new xlblogger('testOut','C:/XLBlogger');

out.output('Information');
```

![enter image description here](https://i.ibb.co/cysn5Nf/output.png)

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

![enter image description here](https://i.ibb.co/mHh267S/Full-Example.png)

__&#991; Log every execution separately:__

![enter image description here](https://i.ibb.co/ZS7QkT6/DiffLog.png)

## License
(The MIT License)
