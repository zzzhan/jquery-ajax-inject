# jquery-ajax-inject

> Inject to the success callback for all the jquery ajax call.

### Background
On a web applicaton, the response may custom to a data format, like this:
```js
{code:1, message:'This is success'}
{code:500, message:'This is failure.'}
```
The code `1` signify success and the others signify failure.
For this situation, it is not a good idea to handle the response for all ajax calls.
So 'jquery-ajax-inject use to inject to all the ajax calls,and listens to all the ajax success callbacks, then you can handle the response in one place, not need for all the ajax calls.

### How to use
Implement the global function `$.ajaxInject like this:
```js
$.ajaxInject = function(res) {
  var ret = false;
  if(res.code===1) {
    ret = true;
  } else {
    //handle all the failure in one place
	//or trigger the original error callback, like this:
	if(typeof this.error==='function') {
	  this.error(res);
	}
  }
  return ret;//return true or false to trigger the original success callback or not.
};
```
When you want to skip the inject, you may using the ajax like this:
```js
$.ajax({
...
skipAjaxInject:true,
...
});
```
