var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=625144&APPID=8600d4007787e450d87782822e5885b3';
var container = document.getElementById('widget');
var placeDiv = document.getElementById('place');
var countryDiv = document.getElementById('country');
var timeDiv = document.getElementById('time');
var tempDiv = document.getElementById('temp-to-day');
var iconImg = document.getElementById('icon-to-day');
var descriptionDiv = document.getElementById('description-to-day');
var degreeDiv = document.getElementById('degree-to-day');
var windDiv = document.getElementById('wind-to-day');
var nextDiv = document.getElementById('next-day');

function getAjaxHtml(url) {

	return new Promise(function(resolve, reject) {

		var request = new XMLHttpRequest();
		request.onload = function() {
			var response = request.response;
			resolve(response);
		}
		request.onerror = function() {
			reject(request.status);
		}
		request.open("GET", url, true);
		request.responseType = "json";
		request.send();

	});
}

getAjaxHtml(weatherUrl).then(function(result) {

	var city = result.city.name;
	var country = result.city.country;
	var timeNow = result.list[0].dt_txt;
	var iconToDay = result.list[0].weather[0].icon;
	var tempToDay = result.list[0].main.temp;
	var descriptionToDay = result.list[0].weather[0].description;
	var degreeToDay = result.list[0].wind.deg;
	var windToDay = result.list[0].wind.speed;

	iconImg.setAttribute('src', 'icons/' + iconToDay + '.png');
	placeDiv.innerHTML = city + ', ' + country;
	timeDiv.innerHTML = timeNow.substr(11, 5);
	tempDiv.innerHTML = (tempToDay - 273.15).toFixed(0) + ' \u2103';
	descriptionDiv.innerHTML = descriptionToDay;
	degreeDiv.innerHTML = degree(degreeToDay);
	windDiv.innerHTML = windToDay.toFixed(0) + ' m/s';

	function getDataNextDays(objectData, where) {
		for (var i = 8; i < objectData.list.length; i += 8) {
			where.appendChild(genHtmlNextDay(objectData.list[i].dt_txt, objectData.list[i].weather[0].icon, objectData.list[i].main.temp));
		}
	}
	getDataNextDays(result, nextDiv);


}, function(error) {
	console.log(error);
})

function genHtmlNextDay(time, icon, temp) {
	var nextDays = document.createElement('div');
	nextDays.className = 'wrapper-next-day';
	var timeNextDiv = document.createElement('div');
	timeNextDiv.className = 'time-next-day';
	var iconNextDiv = document.createElement('img');
	iconNextDiv.className = 'icon-next-day';
	var tempNextDiv = document.createElement('div');
	tempNextDiv.className = 'temp-next-day';

	timeNextDiv.innerHTML = time;
	iconNextDiv.setAttribute('src', 'icons/' + icon + '.png');
	tempNextDiv.innerHTML = (temp - 273.15).toFixed(0) + ' \u2103';
	nextDays.appendChild(timeNextDiv);
	nextDays.appendChild(iconNextDiv);
	nextDays.appendChild(tempNextDiv);

	return nextDays;
}

function degree(deg) {
	var side = '';
	if (deg > 0 && deg < 45) {
		side = 'North';
	} else if (deg > 45 && deg < 90) {
		side = 'North-East';
	} else if (deg > 90 && deg < 135) {
		side = 'East';
	} else if (deg > 135 && deg < 180) {
		side = 'South-East';
	} else if (deg > 180 && deg < 225) {
		side = 'South';
	} else if (deg > 225 && deg < 270) {
		side = 'South-West';
	} else if (deg > 270 && deg < 315) {
		side = 'West';
	} else if (deg > 315 && deg < 360) {
		side = 'North-West';
	}
	return (side);
}