/*
 * jquery-ajax-inject
 * https://github.com/zzzhan/jquery-ajax-inject
 *
 * Copyright (c) 2016 zzzhan
 * Licensed under the MIT license.
 */

(function(factory){
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (window.jQuery) {
        factory(window.jQuery);
    }
}(function($){
	var defaultInject = function() {
		//console.log(data);
		var ret = true;
		console.warn('$.ajaxInject has not implemented.');
		return ret;
	};
    var jqAjax = $.ajax;
    $.ajax = function(settings){
	  var original = settings.success;
	  settings.success = (function(success) {
		return function(data, textStatus, xhr) {
		  var skipInject = this.skipInject||false,
		  ajaxInject = ($.ajaxInject||defaultInject).bind(this);
		  if(!!skipInject||(ajaxInject(data,textStatus,xhr)&&typeof success === "function")) {
		    success(data,textStatus,xhr);
		  }
		};
	  })(original);
	  jqAjax(settings);
    };
}));