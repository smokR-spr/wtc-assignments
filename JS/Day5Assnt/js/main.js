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
var createdOn = "";
var editRowObj = null;

/*--------------general functions-----------------*/
function toDateStr(date) {
	//getting month in words
	var month = "";
	switch(date.getMonth()) {
		case 0:
			month = "Jan";
			break;
		case 1:
			month = "Feb";
			break;
		case 2:
			month = "Mar";
			break;
		case 3:
			month = "Apr";
			break;
		case 4:
			month = "May";
			break;
		case 5:
			month = "Jun";
			break;
		case 6:
			month = "Jul";
			break;
		case 7:
			month = "Aug";
			break;
		case 8:
			month = "Sep";
			break;
		case 9:
			month = "Oct";
			break;
		case 10:
			month = "Nov";
			break;
		case 11:
			month = "Dec";
			break;
	}
	return (date.getDay() + " " + month + " " + date.getFullYear());
}

function loadXMLDoc(url) {
    var xmlhttp;
    var txt, xx, students, i;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            students = xmlhttp.responseXML.documentElement.getElementsByTagName("student");
            console.log(students[0].nodeValue);
        }
    }
    xmlhttp.open("GET", "../xml/student-info.xml", true);
    xmlhttp.send();
}

//loadXMLDoc();


/*----------objects----------------*/
var table = {
	pushRow: function(table, name, email, qualification,createdDate) {
		var entry = document.createElement('tr');
        entry.appendChild(document.createElement('td'));
        
        for(var i = 1; i < arguments.length; i++) {
        	var data = document.createElement('td');
        	data.appendChild(document.createTextNode(arguments[i]));
        	entry.appendChild(data);
        }

        
        //console.log(toDateStr(new Date()));
        if(!createdDate) {
        	//date and action columns
        	var data = document.createElement('td');
        	if(!editFlag) {
		        data.appendChild(
		        	document.createTextNode(
		        		toDateStr(new Date())
		        	)
		        );
	    	} else {
	    		data.appendChild(
	    		 	document.createTextNode(createdOn)
		        );
	    	}
	    }
        entry.appendChild(data);

        data = document.createElement('td');
        data.className = 'action';
        for (var i = 0; i < 2; i++) {
        	var anchor = document.createElement('a');
        	anchor.href = 'javascript:void(0)';
        	anchor.className = (i == 0)? 'edit' : 'delete';
        	data.appendChild(anchor);
        }
        entry.appendChild(data);

        table.getElementsByTagName('tbody')[0].appendChild(entry);
	},
	popRow: function(ele) {
		//console.log('popRow');
		//console.log(ele.tagName);
		var rowToDelete = ele.parentNode.parentNode;
		rowToDelete.parentNode.removeChild(rowToDelete);
	},	
	editRow: function(ele) {
		
		var rowToEdit = ele.parentNode.parentNode;
		//console.log(rowToEdit.getElementsByTagName('td')[1].textContent);
		var table = rowToEdit.parentNode;

		//getting the row values
		var name = rowToEdit.getElementsByTagName('td')[1].textContent;
		var email = rowToEdit.getElementsByTagName('td')[2].textContent;
		var qualification = rowToEdit.getElementsByTagName('td')[3].textContent;
		createdOn = rowToEdit.getElementsByTagName('td')[4].textContent;

		//console.log(name);

		//putting the values into the input boxes
		var inputs = popup.getElementsByTagName('input');
		//console.log(inputs.length);
		for (var i = 0; i < inputs.length; i++) {
			inputs[i].value = rowToEdit.getElementsByTagName('td')[i + 1].textContent;	
		}
		var comboBox = document.getElementsByTagName('select')[0];
		for (var i = 0; i < comboBox.options.length; i++) {
	        if (comboBox.options[i].text == qualification) {
	            comboBox.options[i].selected = true;
	            break;
	        }
	    }
		
		editFlag = true;
		editRowObj = ele;
		obj.show(document.getElementById('popup'));
	}
};

var obj = {
	show: function(ele, displayType) {
		displayType = (displayType)? displayType : 'block';

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
	return (/^[a-zA-Z\s]{3,20}$/.test(str));
}
function is2Words(str) {
	return (/^\W*(\w+(\W+|$)){2}$/.test(str));
}
function validEmail(str) {
	//return (/^[w-.+]+@[a-zA-Z0-9.]+.[a-zA-Z0-9]{2,4}$/.test(str));
	return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
				.test(str));
}
function clearErrors() {
	var list = document.getElementById('err').getElementsByTagName('ol')[0];
	while(list.firstChild) {
	    list.removeChild(list.firstChild);
	}
}
function validate() {
	var name = document.getElementById('Name');
	var email = document.getElementById('E-mail');
	var isValid = true;
	var isValidName = true;
	var isValidEmail = true;
	var result = "";
	var errors = document.getElementById('err');
	var tooltips = document.getElementsByClassName('tooltip');
	var list = errors.getElementsByTagName('ol')[0];

	

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
	if(!isEmpty(email.value.trim())) {
		//checking if email is valid
		isValidEmail = (validEmail(email.value))
						? true
						: false;
	} else {
		isValidEmail = false;
	}

	//clearing all previous errors
	clearErrors();

	//forming new error list
	if(!isValidName || !isValidEmail) {
		//alert('invalid');
		
		//showing errors
		if(!isValidName) {
			var entry = document.createElement('li');
			entry.appendChild(
				document.createTextNode("Value entered in the " + 
						name.name + " is invalid"));
			list.appendChild(entry);

		}
		if(!isValidEmail) {
			var entry = document.createElement('li');
			entry.appendChild(
				document.createTextNode("Value entered in the " + 
						email.name + " is invalid"));
			list.appendChild(entry);
		}
		//errors.getElementsByTagName('ol')[0].nodeValue = result;
		changeClass(document.getElementById('popup'),
				'noerr',
				'err');

		//showing tooltips
		for(var i = 0; i < tooltips.length; i++) {
			obj.show(tooltips[i]);
		}

		return false;
	} else {
		//hiding all
		clearErrors();
		changeClass(document.getElementById('popup'),
				'err',
				'noerr');
		for(var i = 0; i < tooltips.length; i++) {
			obj.hide(tooltips[i]);
		}

		return true;
	}

} //validate

/*----------event handlers------------*/
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

	//hiding tooltips
	var tooltips = document.getElementsByClassName('tooltip');
	for(var i = 0; i < tooltips.length; i++) {
		obj.hide(tooltips[i]);
	}

	return false;
}

function submitForm(event) {
    if(validate()) {
    	//console.log('valid');
    	var inputs = document
			.getElementById('addStudent')
			.getElementsByTagName('input');
		var comboBox = document
			.getElementById('addStudent')
			.getElementsByTagName('select')[0];

		/* editRowObj is set in table.editRow() */
		if(editFlag) table.popRow(editRowObj);

    	table.pushRow(document.getElementsByTagName('table')[0], inputs[0].value.trim(), inputs[1].value.trim(), comboBox.value);
  		reset();
    } else {
    	console.log('invalid');
    }
    //resetting editFlag
    editFlag = false;
	//to stop default action of the form
	event.preventDefault();
}

function deleteRow() {
	var rowToDelete = this.parentNode.parentNode;
	console.log(rowToDelete);
	table.popRow(rowToDelete);
}


/*----------event listeners-----------*/
/* general click event listener */
function clicked(ele, eventHandler, useCapture) {
	//alert(ele);
	if (ele.addEventListener) {
	    ele.addEventListener("click", eventHandler, useCapture);
	} else if (ele.attachEvent) { //for IE
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
		submitForm,
		false);

/* to delete/edit a row */
var classEles = document.getElementsByClassName("action");

/*for(var i = 0; i < classEles.length; i++){
    clicked(
    	classEles[i].getElementsByTagName('a')[1],
    	deleteRow,
    	false
    	);
}*/
clicked(
	document,
	function(event) {
		var ele = event.target || event.srcElement;
		//console.log(ele);
		if(ele.tagName == 'a' &&
				ele.className == 'delete') {
			table.popRow(ele);
		} else if(ele.tagName == 'a' &&
				ele.className == 'edit') {
			table.editRow(ele);	
		}
	},
	false
	);

/* to edit a row */
for(var i = 0; i < classEles.length; i++){
    clicked(
    	classEles[i].getElementsByTagName('a')[0],
    	table.editRow,
    	false
    	);
}


/*-----------AJAX request for XML data retrive------*/
function ajaxRequest() {
    var activexmodes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"] //activeX versions to check for in IE
    if (window.ActiveXObject) { //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
        for (var i = 0; i < activexmodes.length; i++) {
            try {
                return new ActiveXObject(activexmodes[i]);
            } catch (e) {
                //suppress error
            }
        }
    } else if (window.XMLHttpRequest) // if Mozilla, Safari etc
        return new XMLHttpRequest();
    else
        return false;
}

var xmlGetRequest = new ajaxRequest();

if (xmlGetRequest.overrideMimeType)
    	xmlGetRequest.overrideMimeType('text/xml');

xmlGetRequest.onreadystatechange = function() {
    if (xmlGetRequest.readyState == 4) {
        if (xmlGetRequest.status == 200 || window.location.href.indexOf("http") == -1) {
            var xmldata = xmlGetRequest.responseXML; //retrieve result as an XML object
            var entries = xmldata.getElementsByTagName("student");
            var table1 = document.getElementById('studentInfo');

            console.log(entries);
            for(var i = 0; i < entries.length; i++) {
            	var name = entries[i].getElementsByTagName('name')[0].textContent;
            	var email = entries[i].getElementsByTagName('email')[0].textContent;
            	var qualification = entries[i].getElementsByTagName('qualification')[0].textContent;
            	var createdDate = entries[i].getElementsByTagName('createdOn')[0].textContent;
            	console.log(createdDate);

            	table.pushRow(table1,name,email,qualification,createdDate);
            }
        } else {
            alert("An error has occured making the request")
        }
    }
}


xmlGetRequest.open("GET", "student-info.xml", true);
xmlGetRequest.send(null);