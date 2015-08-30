/**
 * JS for Walking Tree - LMS assignment in JS module 
 */

/*var toggleDisplay = function() {
	if(typeof(this) == 'object') {
		var displayStatus = window
								.getComputedStyle(this)
								.getPropertyValue('display');
		if(displayStatus == 'block' ||
			displayStatus == 'inline-block') { //is visible
			this.style.display = 'none';
		} else {
			this.style.display = 'inline-block';
		}
	}
};

var addClass = function(cls) {
	this.className = cls + " " + this.className;
};

var removeClass = function(cls) {
	var regex = new RegExp('/(?:^|\s)' + cls + '(?!\S)/g');
	this.className = this.className.replace(
			regex, ''
		);
};

var replaceClass = function(newClass, oldClass) {
	// removing old class
	var regex = new RegExp('/(?:^|\s)' + oldClass + '(?!\S)/g');
	this.className = this.className.replace(
			regex, ''
		);
	// adding new class
	this.className = newClass + this.className;
};*/

/*
var toggleDisplay = function(ele) {
	if(typeof(ele) == 'object') {
		var displayStatus = window
								.getComputedStyle(ele)
								.getPropertyValue('display');
		if(displayStatus == 'block' ||
			displayStatus == 'inline-block') { //is visible
			ele.style.display = 'none';
		} else {
			ele.style.display = 'inline-block';
		}
	}
};

var addClass = function(ele, cls) {
	ele.className = cls + " " + ele.className;
};

var removeClass = function(ele, cls) {
	var regex = new RegExp('/(?:^|\s)' + cls + '(?!\S)/g');
	ele.className = ele.className.replace(
			regex, ''
		);
};
*/

var replaceClass = function(ele, oldClass, newClass) {
	alert('replaceClass\n' + ele.className);
	// removing old class
	var reg = new RegExp('/' + oldClass + '/');
	alert(oldClass + ' ' + reg + ' ' + reg.test(ele.className));
	/*var regex = new RegExp('/(?:^|\s)' + oldClass + '(?!\S)/g');
	alert(regex);
	alert(ele.className.search(regex));
	ele.className = ele.className.replace(
			regex, ''
		);
	alert(ele.className);
	// adding new class
	ele.className = newClass + ' ' + ele.className;*/
};

//alert(document.getElementById('popup'));

replaceClass(
	document.getElementById('popup'),
	'noerr',
	'err'
);