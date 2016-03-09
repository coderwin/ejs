
"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory();
    } else {
        // 全局变量(root 即 window)
        root.EJS = factory();
    }
}(this, function () {

var EJS = function(){
	this.oevt = {};
};

EJS.prototype = {

	constructor: EJS,

	bind: function(evt, callback, data){

		this.oevt[evt] = this.oevt[evt]||[];

		if (this.oevt[evt].indexOf(callback)=="-1"&&typeof callback=="function") {
			/*把data也一并记录下来*/
			(typeof data!="undefined"&&data!=null)? this.oevt[evt].push({
				callback: callback, 
				data: data
			}): this.oevt[evt].push(callback)
		}
		/*链式调用*/
		return this;
	},

	trigger: function(evt){
		var that = this;
		/*获取事件队列&复制数组*/
		var events = this.oevt[evt].slice(0);
		/*获取trigger带过来的参数*/
		var args = [].slice.call(arguments,1)||[];
		/*取出事件处理函数*/
		var eventOrCallback;

		while(eventOrCallback = events.shift()){

			eventOrCallback.data? (function(){

				args.unshift(data);
	          	eventOrCallback.callback.apply(that, args);

			}()): eventOrCallback.apply(this, args);
		}
		return this;
	},

	unbind: function(evt, cbindex){

		(!evt&&!cbindex)&&(this.oevt = {});
		
		(evt&&!cbindex)&&(this.oevt[evt]=[]);
		if (evt&&cbindex) {

			if(cbindex>-1){
				this.oevt[evt].splice(cbindex,1);
			} 
		}
		return this;
	},

	mixto: function(){
		var args = [].slice.call(arguments,0);
		for (var i = 0; i < args.length; i++) {
			for(var k in this){
				if (!args[i][k]) {
					args[i][k] = this[k]
				}
			}
		}
		return this
	}
};

var event = new EJS;
event.on = event.bind;
event.fire = event.trigger;
event.off = event.unbind;

return event;
}))
