
function markAlertRead(self, alertId) {
	DWRAlertService.markAlertRead(null, alertId);
	var parent = self.parentNode;
	parent.style.display = "none";
	var unreadAlertSizeBox = document.getElementById('unreadAlertSize');
	var unreadAlertSize = parseInt(unreadAlertSizeBox.innerHTML);
	if (unreadAlertSize == 1) {
		// hide the entire alert outer div because they read the last alert
		parent = parent.parentNode.parentNode;
		parent.style.display = "none";
	}
	else {
		unreadAlertSize = unreadAlertSize - 1;
		unreadAlertSizeBox.innerHTML = unreadAlertSize;
	}
		
	return false;
}

function addClass(obj, c) {
	if (obj.className.indexOf(c) == -1)
		obj.className = c + " " + obj.className;
}

function removeClass(obj, newClassName) {
	var className = obj.className;
	if (className.indexOf(newClassName) != -1) {
		var index = obj.className.indexOf(" ");
		obj.className = className.substring(index + 1, className.length);
	}
}

function hasClass(obj, className) {
	var classes = obj.className.split(" ");
	for (var i = 0; i<classes.length; i++) {
		if (classes[i] == className)
			return true;
	}
	return false;
}

function manipulateClass(operation, obj, c1, c2) {
	switch (operation){
		case 'swap':
			obj.className=!manipulateClass('check',obj,c1)?obj.className.replace(c2,c1): obj.className.replace(c1,c2);
			break;
		case 'add':
			if(!manipulateClass('check',obj,c1)){obj.className+=obj.className?' '+c1:c1;}
			break;
		case 'remove':
			var rep=obj.className.match(' '+c1)?' '+c1:c1;
			obj.className=obj.className.replace(rep,'');
			break;
		case 'check':
			return new RegExp('\\b'+c1+'\\b').test(obj.className)
			break;
	}
}

function changeClassProperty(sClassName,sProperty,sValue) {
	sClassName="."+sClassName;
	var sheets = document.styleSheets;
	var rules;
	var styleObj;
	
	for (var i=sheets.length-1; i >= 0; i--) {
		rules=sheets[i].cssRules || sheets[1].rules;
		
		for (var j=0; j<rules.length; j++) {
			if (rules[j].selectorText &&
				rules[j].selectorText==sClassName) {
					styleObj=rules[j].style;
					break;
			}
		}
	}
	
	styleObj[sProperty]=sValue;
}

function toggleLayer(layerId) {
    var style = document.getElementById(layerId).style;
 	if (style.display == "none") {
        style.display = "";
    } else {
        style.display = "none";
    }
}

function showLayer(layerId) {
    var style = document.getElementById(layerId).style;
    style.display = "";
}

function hideLayer(layerId) {
    var style = document.getElementById(layerId).style;
    style.display = "none";
}

function refreshPage() {
	window.location.reload();
}

function addEvent(obj, eventType, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(eventType, fn, true);
		return true;
	} else if (obj.attachEvent) {
		var r = obj.attachEvent("on"+eventType, fn);
		return r;
	} else {
		return false;
	}
}

useLoadingMessage = function(message) {
	var loadingMessage;
	if (message) loadingMessage = message;
	else loadingMessage = "Loading";

	DWREngine.setPreHook(function() {
		var disabledZone = $('disabledZone');
		if (!disabledZone) {
			disabledZone = document.createElement('div');
			disabledZone.setAttribute('id', 'disabledZone');
			document.body.appendChild(disabledZone);
			var messageZone = document.createElement('div');
			messageZone.setAttribute('id', 'messageZone');
			disabledZone.appendChild(messageZone);
			var text = document.createTextNode(loadingMessage);
			messageZone.appendChild(text);
		}
		else {
			$('messageZone').innerHTML = loadingMessage;
			disabledZone.style.display = '';
		}
	});

	DWREngine.setPostHook(function() {
		$('disabledZone').style.display = 'none';
	});
}