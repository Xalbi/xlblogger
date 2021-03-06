
var xlblogger = require('../');

var logger = new xlblogger('test','C:/XLBlogger');
var out = new xlblogger('testOut','C:/XLBlogger');

// Test strings

out.logBlank() // empty line with logBlank = empty line with output
logger.logAttrVal('Start', "Test")
logger.logThis('logThis')
logger.logValColor('logValColor')
logger.logTree("1","1.1","1.1.1")
var text = "test text with output"
out.output(text)

// Test Objects

var data = {}
data.id = 21220244
data.value = "######"
data.name = 'Marou'
data.pwd = '*******'
data.email = 'test@xlblogger.npm'


out.output()
out.output(data)
logger.logTree(data,data,data)

logger.logAttrVal('DATA',data)
//logger.logValColor(data)
