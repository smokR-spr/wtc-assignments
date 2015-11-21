/**
 * JS for Walking Tree - LMS assignment in JS module 
 */

/*var toggleDisplay = function() {
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

var addClass = function(cls) {
	ele.className = cls + " " + ele.className;
};

var removeClass = function(cls) {
	var regex = new RegExp('/(?:^|\s)' + cls + '(?!\S)/g');
	ele.className = ele.className.replace(
			regex, ''
		);
};

var replaceClass = function(newClass, oldClass) {
	// removing old class
	var regex = new RegExp('/(?:^|\s)' + oldClass + '(?!\S)/g');
	ele.className = ele.className.replace(
			regex, ''
		);
	// adding new class
	ele.className = newClass + ele.className;
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

/*-----------global variables------------------*/
var popup = document.getElementById('popup');
var editFlag = false;

/*--------------general functions-----------------*/
var changeClass = function(ele, oldClass, newClass) {
	// removing old class
	var regex = new RegExp('(?:^|\\s)' + oldClass + '(?!\\S)','g');
	//alert(regex);
	ele.className = ele.className.replace(regex, '');

	// adding new class
	ele.className = newClass + ' ' + ele.className;
};

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

function close(event) {
	//alert('close ' + event.target);
	event = event || 
			window.event; //for IE
	event.target = event.target || 
					event.srcElement; //for IE

	var element = event.target;
	//alert(element.nodeName);

	if(element) {
		if(element.nodeName == 'a' &&
				/closeme/.test(element.className)) {
			toggleDisplay(element.parentNode);
		}
	}
}

function reset() {
	var inputs = document
			.getElementById('addStudent')
			.getElementsByTagName('input');
	var comboBox = document
			.getElementById('addStudent')
			.getElementsByTagName('select')[0];

	//clearing inputs
	//alert(inputs.length);
	if(inputs) {
		for(var i = 0; i < inputs.length; i++) {
			inputs[i].value = "";
		}
	}

	//clearing select
	comboBox.value = "";

	//clearing errors
	changeClass(document.getElementById('popup'),
				'err',
				'noerr');

	return false;
}
//alert(new Date().format("dd mmm yyyy"));
var table = {
	pushRow: function(table, name, email, qualification) {
		table.innerHTML = "<tr>" +
				"<td></td>" +
				"<td>" + name + "</td>" +
				"<td>" + email + "</td>" +
				"<td>" + qualification + "</td>" +
				"<td>" + new Date.format('dd mmm yyyy') + "</td>" +
				"<td class='action'>" +
                    "<a href='javascript:table.editRow(this.parentNode.parentNode.parentNode, this.parentNode.parentNode)'></a>" +
                    "<a href='javascript:table.popRow(this.parentNode.parentNode.parentNode, this.parentNode.parentNode)'></a>" +
                "</td>" +
              "</tr>";
	},
	popRow: function(table, row) {

	},
	editRow: function(table, row) {
		//getting the row values
		var name = row.childNodes[1].innerHTML;
		var email = row.childNodes[2].innerHTML;
		var qualification = row.childNodes[3].innerHTML;

		editFlag = true;
		submitForm(true);

		//inserting new values
		row.childNodes[1].innerHTML = name;
		row.childNodes[2].innerHTML = email;
		row.childNodes[3].innerHTML = qualification;
	}
};
function submitForm(isEdit, event){
		    alert('submitted');
		    if(isEdit) alert('editing');
		    if(validate()) {

		    }
		    //resetting editFlag
		    editFlag = false;
   			//to stop default action of the form
   			event.preventDefault();
		}

var obj = {
	show: function(ele, displayType) {
		var disp = window.getComputedStyle(ele)
						.getPropertyValue('display');

		if(disp == 'none') {
			ele.style.display = displayType;
		}
	},
	hide: function(ele) {
		var disp = window.getComputedStyle(ele)
						.getPropertyValue('display');
		
		if(disp == '' || 
				disp == 'block' || 
				disp == 'inline-block') {
			ele.style.display = 'none';
		}		
	}
};

/*----------validations-------------*/
/*regex for name: /[A-Za-z]*/
function isEmpty(str) {
	return (str.length == 0);
}
function isAllAlphas(str) {
	return (/^[a-zA-Z ]{3,20}$/.test(str));
}
function is2Words(str) {
	return (/^\W*(\w+(\W+|$)){2}$/.test(str));
}
function validEmail(str) {
	return (/^[w-.+]+@[a-zA-Z0-9.]+.[a-zA-Z0-9]{2,4}$/.test(str));
}
function validate() {
	var name = document.getElementById('Name');
	var email = document.getElementById('E-mail');
	var isValid = true;
	var isValidName = true;
	var isValidEmail = true;
	var result = "";
	//checking for form completion
	//name
	if(!isEmpty(name.value)) {
		//checking if name is valid
		isValidName = (isAllAlphas(name.value) &&
					is2Words(name.value))
						? true
						: false;
	} else {
		isValidName = false;
	}

	//email
	if(!isEmpty(email.value)) {
		//checking if email is valid
		isValidEmail = (validEmail(email.value))
						? true
						: false;
	} else {
		isValidEmail = false;
	}

	var errors = document.getElementById('err');
		var tooltips = document.getElementsByClassName('tooltip');
	if(!isValidName || !isValidEmail) {
		//showing errors
		if(!isValidName) {
			result += "<li>Value entered in the " + 
						name.name + " is invlid";
		}
		if(!isValidEmail) {
			result += "<li>Value entered in the " + 
						email.name + " is invlid";
		}
		errors.getElementsByTagName('ol')[0]
				.innerHTML = result;
		obj.show(errors);

		//showing tooltips
		for(var i = 0; i < tooltips.length; i++) {
			obj.show(tooltips[i]);
		}

		return false;
	} else {
		//hiding all
		errors.getElementsByTagName('ol')[0]
				.innerHTML = "";		
		obj.hide(errors);
		for(var i = 0; i < tooltips.length; i++) {
			obj.hide(tooltips[i]);
		}

		return true;
	}

}



/*----------event listeners-----------*/
/* general click event listener */
function clicked(ele, eventHandler, useCapture) {
	//alert(ele);
	if (ele.addEventListener) {
		//alert('yes');
	    ele.addEventListener("click", eventHandler, useCapture);
	} else if (ele.attachEvent) {
	    ele.attachEvent("onclick", eventHandler);
	}
}

/* popup for add student info */
clicked(document.getElementById('add'),
		function() {
			toggleDisplay(document.getElementsByClassName('popup')[0])
			},
		false);

/* to close open div */
clicked(document, close, false);

/* to reset the popup form */
clicked(document.getElementById('buttons').getElementsByClassName('b-red')[0],
	reset,
	false);

/* to submit the form */
document.getElementById('addStudent').addEventListener(
		"submit", 
		function() {submitForm(editFlag);},
		false);