# 扩展的事件分发器

>事件分发／发布订阅

## API

```javascript
var ejs = require("../src/ejs.js");
ejs.bind("ajaxover", function(){
	console.log("ajaxover")
})
ejs.bind("ajaxover", function(){
	console.log("ajaxover1")
})
setTimeout(function(){
	ejs.unbind("ajaxover",1)
},1000)

setTimeout(function(){
	ejs.trigger("ajaxover")
},5000)

var a = {name: "imchenjian"};
ejs.mixto(a);
a.bind("async", function(){
	console.log("async")
})

setTimeout(function(){
	a.trigger("async")
},1000)

console.log(a)

var b = {name: "xxx"}
a.mixto(b);
console.log(b)

b.trigger("ajaxover")
```
