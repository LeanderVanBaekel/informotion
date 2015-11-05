
// Global variables

// Easy select DOM elements 
var byId 	 = function(id) { return document.getElementById( id ); },
	byQuery  = function(query) { return document.querySelector( query ); },
	byQueryA = function(queryA) { return document.querySelectorAll( queryA ); },

	wind  = byId("wind"),
	water = byId("water"),
	sun	  = byId("sun"),
	moneyIcon = "img/euro.png",
	energyIcon = "img/energy.png",


	svgArray = byQueryA(".layer"),
	projectSelect = byId("projectSelect"),

	checkboxList = byId("checkbox-list"),
	projectsList = checkboxList.getElementsByTagName("input"),

	moneyTotal = byId("money-total"),
	numberList = moneyTotal.getElementsByTagName("span"),

	checkedBox = "",
	projectName = "",

	project = {},

	goalBarFill = byId("goal-bar-fill"),
	standardValue = 11.2,
	oldValue = standardValue,
	newValue = standardValue,

	shareBar = byId("share-container-id"),

 	standardCost = 0,
	oldTotalCost = standardCost,
	newTotalCost = standardCost,
	numArray = [0,0,0,0,0,0,0,0,0,0,0]
;




// Load all the project data from the ID from the checkbox/mapicon
var loadProjectDataObject = function (checkedBox) {

	projectName = checkedBox.id;

	for (var i = 0; i < projectData.length; i++) {
		if (projectData[i].ID == projectName) {
			project = projectData[i];
			return project;
		}
	};
}


// Punt plaatsen tussen elke 3 getallen
// BRON: http://stackoverflow.com/questions/6784894/add-commas-or-spaces-to-group-every-three-digits
var commafy = function (num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1.');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

// create an icon for energy gain
var mkEnergy = function() {
	var energyImg = document.createElement("img");
		energyImg.setAttribute("src", energyIcon);
	return energyImg;
};

// create an icon for cost of a project
var mkMoney = function() {
	var moneyImg = document.createElement("img");
		moneyImg.setAttribute("src", moneyIcon);
	return moneyImg;
};

// create the list of projects form the data
var makeCheckbox = function () {

	for (var i = 0; i < projectData.length; i++) {
	
		var type = projectData[i].energyType;

		var label = document.createElement("label");

		var input = document.createElement("input");
			input.setAttribute("type", "checkbox");
			input.setAttribute("name", projectData[i].ID);

		var span = document.createElement("span");
			span.innerHTML = projectData[i].name;

		label.appendChild(input);
		label.appendChild(span);
		label.appendChild(mkMoney());

		if (projectData[i].cost.length == 10) {
			label.appendChild(mkMoney());
		} else if (projectData[i].cost.length > 10) {
			label.appendChild(mkMoney());
			label.appendChild(mkMoney());
		}

		label.appendChild(mkEnergy());

		if (projectData[i].energyGain.length == 7) {
			label.appendChild(mkEnergy());
		} else if (projectData[i].energyGain.length > 7) {
			label.appendChild(mkEnergy());
			label.appendChild(mkEnergy());
		}

		window[type].appendChild(label);

	};
};



// Inspired by:
// http://www.dyn-web.com/tutorials/forms/checkbox/group.php

// attaching checkbox to layers
var attachCheackboxHandlers = function () {

	for (var i = 0; i < projectsList.length; i++) {
		if (projectsList[i].type === "checkbox") {
			projectsList[i].onclick = toggleLayer;
		}
	};
};


// Listening to click on map icon
var attachMapHandlers = function () {

	var layerList = byQueryA(".layer");

	for (var i = 0; i < layerList.length; i++) {

		layerList[i].onclick = function () {

			checkedBox = window[this.id];
			addProjectInfo(checkedBox);

		};
	};
};


// toggle map layer of the clicked checkbox 
var toggleLayer = function () {

	checkedBox = window[this.name];

	if (this.checked) {
		checkedBox.classList.add("show");
		addGoalBar(checkedBox);
		addTotalCost(checkedBox);
		addProjectInfo(checkedBox);
	} else {
		checkedBox.classList.remove("show");
		substractGoalBar(checkedBox);
		substractTotalCost(checkedBox);
	}
	

};

// Make bar grow when project is clicked
var addGoalBar = function (checkedBox) {

	loadProjectDataObject(checkedBox);

	oldValue = newValue
	newValue = oldValue + (project.percent*2);
	newValue = Math.round( newValue * 10 ) / 10;

	goalBarFill.style["width"] = newValue + "%";
	goalBarFill.innerHTML = (newValue / 2) + "%";

	changeGoalBar(newValue);

};


// Make bar shrink when project is unclicked
var substractGoalBar = function (checkedBox) {

	loadProjectDataObject(checkedBox);

	oldValue = newValue
	newValue = oldValue - (project.percent*2);
	newValue = Math.round( newValue * 10 ) / 10;

	goalBarFill.style["width"] = newValue + "%";
	goalBarFill.innerHTML = (newValue / 2) + "%";

	changeGoalBar(newValue);

};


// 
var changeGoalBar = function (newValue) {
	if ((newValue /2) >= 14) {

		var flag = byQuery(".goal-flag");
		flag.classList.add("goal-flag-up");

		goalBarFill.style["background-color"] = "#44A954";
		shareBar.classList.add("share-container-show");
	} else {

		var flag = byQuery(".goal-flag");
		flag.classList.remove("goal-flag-up");
		goalBarFill.style["background-color"] = "#E04A2F";
	}
};


// calculate new total cost when project is clicked
var addTotalCost = function (checkedBox) {

	loadProjectDataObject(checkedBox);

	oldTotalCost = newTotalCost;
	newTotalCost = oldTotalCost + Number(project.cost);
	totalCostArray();

};

// calculate new total cost when project is unclicked
var substractTotalCost = function (checkedBox) {
	
	loadProjectDataObject(checkedBox);

	oldTotalCost = newTotalCost;
	newTotalCost = oldTotalCost - Number(project.cost);
	totalCostArray();

};

// insert new total cost in document
var totalCostArray = function () {

	numArray = newTotalCost.toString(10).split("").map(function(t){return parseInt(t)})

	while (numArray.length != 11) {
		numArray.unshift(0);
	}

	for (var i = 0; i < numberList.length; i++) {
		numberList[i].innerHTML = numArray[i];
	};

};


var addProjectInfo = function (checkedBox) {

	var projectTitle = byId("project-title"),
		infoIcon 	 = byId("info-icon"),
		infoIconImg  = byId("info-icon-img"),
		infoLocation = byId("project-location")
		infoText	 = byId("info-text-p"),
		infoLink	 = byId("info-link"),
		costDisplay  = byId("cost-display"),
		gainDisplay  = byId("gain-display"),
		timeDisplay  = byId("time-display"),
		betterCost   = commafy(project.cost);

	loadProjectDataObject(checkedBox);

	projectTitle.innerHTML = project.name;
	infoLocation.innerHTML = project.location;
	infoText.innerHTML	   = project.info;
	costDisplay.innerHTML  = betterCost;
	gainDisplay.innerHTML  = commafy(project.energyGain) + " mWu";
	timeDisplay.innerHTML  = project.timeFrame;

	infoLink.setAttribute("href", project.source);
	infoLink.innerHTML = "Meer informatie";

	var img = document.createElement("img");
	img.setAttribute("src", project.icon);
	img.setAttribute("alt", "project icoon");
	img.setAttribute("id", "info-icon-img");
	infoIcon.replaceChild(img, infoIconImg);

};



// JS is loaded, now start the event listeners!
makeCheckbox();
attachCheackboxHandlers();
attachMapHandlers();












